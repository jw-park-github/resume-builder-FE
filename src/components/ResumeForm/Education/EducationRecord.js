import React, { useState, useEffect } from "react";
import styled, {createGlobalStyle} from "styled-components";
import MenuListComposition from "../../ResumeCommon/MenuListComposition";
import UseRadioGroup from "../../ResumeCommon/UseRadioGroup";
import { call } from "../../../service/ApiService";

const GlobalStyle = createGlobalStyle`
  @media print {
      .remove-btn, .radio-group {
          display: none !important;
      }
      .selected-value {
          display: block !important;
      }
  }
`;

const Border = styled.div`
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    border-color: rgba(18, 73, 156, 50%);
    margin-bottom: 10px;
    padding-left: 20px;
    padding-bottom: 20px;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 17px;
    width: 150px;
`;

const EducationRecord = ({ index, education, onRemove, onUpdate, resumeId }) => {
    const [selectedRadio, setSelectedRadio] = useState(education.status);
    const [selectedEducationType, setSelectedEducationType] = useState(education.educationType || "");
    const menuItems1 = ["고등학교", "대학교 (2,3년)", "대학교 (4년)", "대학원 (석사)", "대학원 (박사)"];
    const [error, setError] = useState('');

    useEffect(() => {
        setSelectedRadio(education.status);
        setSelectedEducationType(education.educationType || "");
    }, [education.status, education.educationType]);

    useEffect(() => {
        handleInputChange('educationType', selectedEducationType);
    }, [selectedEducationType]);

    const radioOptions = [
        { value: '재학', label: '재학' },
        { value: '휴학', label: '휴학' },
        { value: '졸업', label: '졸업' }
    ];

    const handleRadioChange = (event) => {
        const value = event.target.value;
        setSelectedRadio(value);
        handleInputChange('status', value);
    };

    const handleInputChange = (field, value) => {
        onUpdate(index, field, value);
    };

    const validateDate = (date) => {
        return /^\d{4}\.\d{2}$/.test(date);
    };

    const handleStartDateChange = (value) => {
        handleInputChange('startDate', value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    const handleEndDateChange = (value) => {
        handleInputChange('endDate', value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    const handleRemove = async () => {
        try {
            await call(`/api/resumes/${resumeId}/educations/${education.id}`, "DELETE");
            onRemove();
        } catch (error) {
            console.error("Failed to delete education data", error);
        }
    };

    const handleMenuSelect = (selectedItem) => {
        setSelectedEducationType(selectedItem);
        handleInputChange('educationType', selectedItem);
    };

    return (
        <>
            <GlobalStyle />
            <Border>
                <div style={{ display: "flex", justifyContent: "flex-end", height: 20 }}>
                    <button
                        className="remove-btn"
                        style={{
                            cursor: "pointer",
                            borderRadius: "0px 8px 0px 3px",
                            width: 30,
                            height: 20,
                            backgroundColor: "rgba(18, 73, 156, 50%)",
                            color: "white",
                            border: "none"
                        }} onClick={handleRemove}>-
                    </button>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                    <MenuListComposition
                        menuTitle="학력 구분"
                        menuItems={menuItems1}
                        onSelect={handleMenuSelect}
                        selected={selectedEducationType}
                    />
                    <Input placeholder="학교명"
                           value={education.schoolName}
                           onChange={(e => handleInputChange('schoolName', e.target.value))}
                    />
                    {selectedEducationType !== '고등학교' && (
                        <Input placeholder="전공"
                               style={{width: 270}}
                               value={education.major}
                               onChange={(e => handleInputChange('major', e.target.value))}
                        />)}
                </div>
                <div style={{ display: "flex", gap: 7, alignItems: "center", marginTop: 5 }}>
                    <Input placeholder="입학 (YYYY.MM)"
                           value={education.startDate}
                           style={{width: 140}}
                           onChange={(e => handleStartDateChange(e.target.value))}
                    />
                    <span>-</span>
                    <Input placeholder={selectedRadio === '재학' ? 'N/A' : "졸업 (YYYY.MM)"}
                           value={selectedRadio === '재학' ? '' : education.endDate}
                           style={{width: 140}}
                           disabled={selectedRadio === '재학'}
                           onChange={(e => handleEndDateChange(e.target.value))}
                    />
                    <div style={{width: 5}}></div>
                    <div className="radio-group">
                        <UseRadioGroup options={radioOptions} value={selectedRadio} onChange={handleRadioChange} />
                    </div>
                    <div className="selected-value" style={{display:'none'}}>{selectedRadio}</div>
                </div>
                {error && <div style={{ fontSize: 13, color: 'rgba(202, 5, 5, 1)' }}>{error}</div>}
            </Border>
        </>
    );
};

export default EducationRecord;

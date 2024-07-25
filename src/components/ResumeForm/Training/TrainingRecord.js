import React, {useEffect, useState} from 'react';
import CheckboxLabels from "../../ResumeCommon/CheckboxLabels";
import styled, {createGlobalStyle} from "styled-components";
import {call} from "../../../service/ApiService";

const GlobalStyle = createGlobalStyle`
  @media print {
      .remove-btn {
          display: none !important;
      }
      .training-status {
          display: block !important;
      }
      .training-status-hidden {
          display: none !important;
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
`;

const TrainingRecord = ({index, training, onRemove, onUpdate, resumeId}) => {
    const checkboxOption = "진행중";
    const [isChecked, setIsChecked] = useState(training.isCurrent);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsChecked(training.isCurrent);
    }, [training.isCurrent]);


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

    // 삭제 핸들러
    const handleRemove = async () => {
        try {
            await call(`/api/resumes/${resumeId}/trainings/${training.id}`, "DELETE");
            onRemove();
        } catch (error) {
            console.error("Failed to delete training data", error);
        }
    };

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        onUpdate(index, 'isCurrent', checked);
        if (checked) {
            onUpdate(index, 'endDate', ''); // 현재 진행 중이라면 종료일 제거
        }
    };

    return (
        <>
            <GlobalStyle />
            <Border>
                <div style={{display: "flex", justifyContent: "flex-end", height: 20}}>
                    <button className="remove-btn"
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
                <div style={{display: "flex", alignItems: "center", marginTop: 5}}>
                    <div style={{display:"flex", height: error ? 55 : 35 , gap: 5}}>
                        <Input
                            style={{width: 150, height: 18}}
                            placeholder="교육명"
                            value={training.courseName}
                            onChange={(e) => handleInputChange('courseName', e.target.value)}
                        />
                        <Input
                            style={{width: 150, height: 18}}
                            placeholder="교육 기관"
                            value={training.institution}
                            onChange={(e) => handleInputChange('institution', e.target.value)}
                        />
                    </div>
                    <div>
                        <div style={{display: "flex", gap: 7, alignItems: "center", marginLeft: 5}}>
                            <Input style={{width: 80}} placeholder="YYYY.MM" value={training.startDate}
                                   onChange={(e) => handleStartDateChange(e.target.value)}/>
                            <span>-</span>
                            <Input
                                style={{width: 80}}
                                placeholder={isChecked ? "N/A" : "YYYY.MM"}
                                disabled={isChecked}
                                value={isChecked ? "진행 중" : training.endDate}
                                onChange={(e) => handleEndDateChange(e.target.value)}
                            />
                            <div className="checkbox-label">
                                <CheckboxLabels option={checkboxOption} checked={isChecked}
                                                onChange={handleCheckboxChange}></CheckboxLabels>
                            </div>
                            <div
                                className={isChecked ? "training-status" : "training-status-hidden"}
                                style={{display: 'none', marginLeft: 10}}
                            >
                                진행 중
                            </div>
                        </div>
                        {error && <div className="error" style={{fontSize: 13, color: 'rgba(202, 5, 5, 1)', marginLeft: 5, marginTop: 2}}>{error}</div>}
                    </div>
                </div>
            </Border>
        </>
    );
};

export default TrainingRecord;

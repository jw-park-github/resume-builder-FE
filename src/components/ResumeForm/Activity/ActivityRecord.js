import React, { useState, useEffect } from 'react';
import CheckboxLabels from "../../ResumeCommon/CheckboxLabels";
import styled, {createGlobalStyle} from "styled-components";
import { call } from "../../../service/ApiService";

const GlobalStyle = createGlobalStyle`
  @media print {
      .remove-btn {
          display: none !important;
      }
      .activity-status {
          display: block !important;
      }
      .activity-status-hidden {
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

const ActivityRecord = ({ index, activity, onRemove, onUpdate, resumeId }) => {
    const checkboxOption = "진행중";
    const [isChecked, setIsChecked] = useState(activity.isCurrent);
    const [error, setError] = useState('');

    // 입력값 변경 handler
    const handleInputChange = (field, value) => {
        onUpdate(index, field, value);
    };

    // 날짜 유효성 검사
    const validateDate = (date) => {
        return /^\d{4}\.\d{2}$/.test(date);
    };

    // 시작 날짜 변경 핸들러
    const handleStartDateChange = (value) => {
        handleInputChange('startDate', value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    // 종료 날짜 변경 핸들러
    const handleEndDateChange = (value) => {
        handleInputChange('endDate', value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    // 체크박스 변경 핸들러
    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        onUpdate(index, 'isCurrent', checked);
        if (checked) {
            onUpdate(index, 'endDate', ''); // 현재 진행 중이라면 종료일 제거
        }
    };

    // 삭제 핸들러
    const handleRemove = async () => {
        try {
            await call(`/api/resumes/${resumeId}/activities/${activity.id}`, "DELETE");
            onRemove();
        } catch (error) {
            console.error("Failed to delete activity data", error);
        }
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
                <div style={{display: "flex", alignItems: "center", marginTop: 5}}>
                    <div style={{display: "flex", height: error ? 55 : 35, gap: 5}}>
                        <Input
                            style={{width: 150, height: 18}}
                            placeholder="활동명"
                            value={activity.activityName}
                            onChange={(e) => handleInputChange('activityName', e.target.value)}
                        />
                        <Input
                            style={{width: 150, height: 18}}
                            placeholder="활동 기관"
                            value={activity.organizationName}
                            onChange={(e) => handleInputChange('organizationName', e.target.value)}
                        />
                    </div>
                    <div>
                        <div style={{display: "flex", gap: 5, alignItems: "center", marginLeft: 5}}>
                            <Input style={{width: 80}} placeholder="YYYY.MM" value={activity.startDate}
                                   onChange={(e) => handleStartDateChange(e.target.value)}/>
                            <span>-</span>
                            <Input
                                style={{width: 80}}
                                placeholder={isChecked ? "N/A" : "YYYY.MM"}
                                disabled={isChecked}
                                value={isChecked ? "N/A" : activity.endDate}
                                onChange={(e) => handleEndDateChange(e.target.value)}
                            />
                            <div className="checkbox-label">
                                <CheckboxLabels option={checkboxOption} checked={isChecked}
                                                onChange={handleCheckboxChange}></CheckboxLabels>
                            </div>
                            <div
                                className={isChecked ? "activity-status" : "activity-status-hidden"}
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

export default ActivityRecord;

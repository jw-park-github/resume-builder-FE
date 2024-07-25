import React, {useEffect, useState} from 'react';
import AddRecord from "../../ResumeCommon/AddRecord";
import SectionContainer from "../../ResumeCommon/SectionContainer";
import ActivityRecord from "../Activity/ActivityRecord";
import TrainingRecord from "./TrainingRecord";

const Training = ({ trainings, setTrainings, resumeId}) => {
    // 컴포넌트가 마운트될 때 local storage 에서 이전에 입력된 데이터들을 불러옴
    useEffect(() => {
        const savedTrainings = JSON.parse(localStorage.getItem('trainings'));
        if (savedTrainings) {
            setTrainings(savedTrainings);
        } else {
            setTrainings([{ id: null,  courseName: '', institution: '', startDate: '', endDate: '', isCurrent: false }]);
        }
    }, [setTrainings]);

    // 입력 데이터가 변경될 때마다 local storage 에 저장
    useEffect(() => {
        localStorage.setItem('training', JSON.stringify(trainings));
    }, [trainings]);

    // 추가 함수
    const addTraining = () => {
        setTrainings(prev => [
            ...prev,
            { id: prev.length, courseName: '', institution: '', startDate: '', endDate: '', isCurrent: false }
        ]);
    };

    // 삭제 함수
    const removeTraining = (index) => {
        setTrainings(prev => prev.filter((_, idx) => idx !== index));
    };

    // 업데이트 함수
    const updateTraining = (index, field, value) => {
        setTrainings(prev => prev.map((training, idx) => idx === index ? { ...training, [field]: value } : training));
    };

    return (
        <SectionContainer title="Training">
            {trainings.map((training, index) => (
                <TrainingRecord
                    key={index}
                    index={index}
                    training={training}
                    onRemove={() => removeTraining(index)}
                    onUpdate={updateTraining}
                    resumeId={resumeId}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="직업훈련 이력" onClick={addTraining}></AddRecord>
        </SectionContainer>
    );
};

export default Training;

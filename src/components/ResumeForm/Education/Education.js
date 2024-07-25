import React, { useEffect } from 'react';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import EducationRecord from "./EducationRecord";
import AddRecord from "../../ResumeCommon/AddRecord";

const Education = ({ educations, setEducations, resumeId }) => {
    useEffect(() => {
        const savedEducations = JSON.parse(localStorage.getItem('educations'));
        if (savedEducations) {
            setEducations(savedEducations);
        } else {
            setEducations([{ id: null, schoolName: '', major: '', startDate: '', endDate: '', status: 'first', educationType: '' }]);
        }
    }, [setEducations]);

    useEffect(() => {
        localStorage.setItem('educations', JSON.stringify(educations));
    }, [educations]);

    const addEducation = () => {
        setEducations(prev => [
            ...prev,
            { id: prev.length + 1, schoolName: '', major: '', startDate: '', endDate: '', status: 'first', educationType: '' }
        ]);
    };

    const removeEducation = (index) => {
        setEducations(prev => prev.filter((_, idx) => idx !== index));
    };

    const updateEducation = (index, field, value) => {
        setEducations(prev => prev.map((education, idx) => idx === index ? { ...education, [field]: value } : education));
    };

    return (
        <SectionContainer title="Education">
            {educations.map((education, index) => (
                <EducationRecord
                    key={index}
                    index={index}
                    education={education}
                    onRemove={() => removeEducation(index)}
                    onUpdate={updateEducation}
                    resumeId={resumeId}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="학력" onClick={addEducation} />
        </SectionContainer>
    );
};

export default Education;

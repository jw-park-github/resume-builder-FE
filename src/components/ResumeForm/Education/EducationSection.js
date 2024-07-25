import React, {useEffect} from "react";
import {call} from "../../../service/ApiService";
import Education from "./Education";


const EducationSection = ({ educations, setEducations, resumeId }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/educations`, 'GET', null);
                setEducations(response);
            } catch (error) {
                console.error("Failed to fetch careers", error);
            }
        };

        fetchData();
    }, [resumeId, setEducations]);

    return <Education educations={educations} setEducations={setEducations} resumeId={resumeId} />;
}

export default EducationSection;

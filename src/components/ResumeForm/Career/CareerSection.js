import React, { useEffect } from 'react';
import { call } from "../../../service/ApiService";
import Career from "./Career";

const CareerSection = ({ careers, setCareers, resumeId }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/careers`, 'GET', null);
                setCareers(response);
            } catch (error) {
                console.error("Failed to fetch careers", error);
            }
        };

        fetchData();
    }, [resumeId, setCareers]);

    return <Career careers={careers} setCareers={setCareers} resumeId={resumeId} />
}

export default CareerSection;

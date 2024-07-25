import React, { useEffect } from 'react';
import Language from "./Language";
import { call } from "../../../service/ApiService";

const LanguageSection = ({ languages, setLanguages, resumeId }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/languages`, 'GET', null);
                setLanguages(response);
            } catch (error) {
                console.error("Failed to fetch languages", error);
            }
        };

        fetchData();
    }, [resumeId, setLanguages]);

    return <Language languages={languages} setLanguages={setLanguages} resumeId={resumeId} />;
};

export default LanguageSection;
import React, { useEffect } from 'react';
import { call } from "../../../service/ApiService";
import Certificate from "./Certificate";

const CertificateSection = ({ certificates, setCertificates, resumeId }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/certificates`, 'GET', null);
                setCertificates(response);
            } catch (error) {
                console.error("Failed to fetch certificates", error);
            }
        };
        fetchData();
    }, [resumeId, setCertificates]);

    return <Certificate certificates={certificates} setCertificates={setCertificates} resumeId={resumeId} />;
};

export default CertificateSection;


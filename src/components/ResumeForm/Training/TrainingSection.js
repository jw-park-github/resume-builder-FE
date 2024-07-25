import React, {useEffect} from "react";
import {call} from "../../../service/ApiService";
import Training from "./Training";

const TrainingSection = ({ trainings, setTrainings, resumeId }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/trainings`, 'GET', null);
                setTrainings(response);
            } catch (error) {
                console.log("Failed to fetch activities", error);
            }
        };

        fetchData();
    }, [resumeId, setTrainings]);

    return <Training trainings={trainings} setTrainings={setTrainings} resumeId={resumeId} />;
};

export default TrainingSection;
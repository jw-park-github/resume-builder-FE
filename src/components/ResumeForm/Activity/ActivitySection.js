import React, {useEffect} from "react";
import Activity from "./Activity";
import {call} from "../../../service/ApiService";

// ActivitySection.js: Activity 데이터를 불러오고, Activity 컴포넌트를 렌더링

const ActivitySection = ({ activities, setActivities, resumeId}) => {
    useEffect(() => {
        // Activity 데이터를 서버에서 불러옴
        const fetchData = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/activities`, 'GET', null);
                setActivities(response);
            } catch (error) {
                console.log("Failed to fetch activities", error);
            }
        };
        fetchData();
    }, [resumeId, setActivities]);

    return <Activity activities={activities} setActivities={setActivities} resumeId={resumeId} />;
};

export default ActivitySection;
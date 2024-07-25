import { useEffect } from "react";
import { call } from "../../../service/ApiService";
import AboutMe from "./AboutMe";

// AboutMe.js: AboutMe 데이터를 불러오고, AboutMe 컴포넌트를 렌더링

const AboutMeSection = ({ aboutMe, setAboutMe, resumeId }) => {
    useEffect(() => {
        // AboutMe 데이터를 서버에서 불러옴
        const fetchAboutMe = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/aboutMes`, 'GET', null);
                setAboutMe(response);
            } catch (error) {
                console.error("Failed to fetch aboutMe", error);
            }
        };

        fetchAboutMe();
    }, [resumeId, setAboutMe]);

    return <AboutMe aboutMe={aboutMe} setAboutMe={setAboutMe} resumeId={resumeId} />;
};

export default AboutMeSection;
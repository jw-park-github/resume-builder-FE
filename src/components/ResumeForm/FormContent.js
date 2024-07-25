import React, {useEffect, useRef} from 'react';
import LanguageSection from './Language/LanguageSection';
import AwardSection from './Award/AwardSection';
import SkillSection from './Skill/SkillSection';
import CareerSection from './Career/CareerSection';
import ProjectSection from './Project/ProjectSection';
import CertificateSection from "./Certificate/CertificateSection";
import ActivitySection from "./Activity/ActivitySection";
import TrainingSection from "./Training/TrainingSection";
import AboutMeSection from "./AboutMe/AboutMeSection";
import EducationSection from "./Education/EducationSection";

const FormContent = ({ activeSections, languages, setLanguages, awards, setAwards, skills, setSkills, careers, setCareers,
                         projects, setProjects, activities, setActivities, trainings, setTrainings, aboutMe, setAboutMe,
                         educations, setEducations, certificates, setCertificates, resumeId, onRemoveBlankSection }) => {

    const sectionRefs = useRef([]);

    useEffect(() => {
        const handlePageBreaks = () => {
            let currentPageHeight = 0;
            const pageHeight = 1150; // A4 페이지 높이 (픽셀 단위)

            sectionRefs.current.forEach((section) => {
                if (section) { // null 체크
                    const sectionHeight = section.scrollHeight;

                    if (currentPageHeight + sectionHeight > pageHeight) {
                        section.classList.add('page-break-before');
                        currentPageHeight = sectionHeight;
                    } else {
                        section.classList.remove('page-break-before');
                        currentPageHeight += sectionHeight;
                    }
                }
            });
        };

        // 초기 및 리사이즈 시 실행
        handlePageBreaks();
        window.addEventListener('resize', handlePageBreaks);

        return () => {
            window.removeEventListener('resize', handlePageBreaks);
        };
    }, [activeSections]);

    return (
        <div className="section-content">
            {activeSections.map((section, index) => {
                return (
                    <div key={index} className={`section-item`} ref={(el) => sectionRefs.current[index] = el}>
                        {/* 섹션별로 컴포넌트 렌더링 */}
                        {section === 'Language' && <LanguageSection languages={languages} setLanguages={setLanguages} resumeId={resumeId} />}
                        {section === 'Award' && <AwardSection awards={awards} setAwards={setAwards} resumeId={resumeId} />}
                        {section === 'Skill' && <SkillSection skills={skills} setSkills={setSkills} resumeId={resumeId} />}
                        {section === 'Career' && <CareerSection careers={careers} setCareers={setCareers} resumeId={resumeId} />}
                        {section === 'Project' && <ProjectSection projects={projects} setProjects={setProjects} resumeId={resumeId} />}
                        {section === 'Certificate' && <CertificateSection certificates={certificates} setCertificates={setCertificates} resumeId={resumeId} />}
                        {section === 'Activity' && <ActivitySection activities={activities} setActivities={setActivities} resumeId={resumeId} />}
                        {section === 'Training' && <TrainingSection trainings={trainings} setTrainings={setTrainings} resumeId={resumeId} />}
                        {section === 'About Me' && <AboutMeSection aboutMe={aboutMe} setAboutMe={setAboutMe} resumeId={resumeId} />}
                        {section === 'Education' && <EducationSection educations={educations} setEducations={setEducations} resumeId={resumeId} />}
                    </div>
                );
            })}
        </div>
    );
};

export default FormContent;
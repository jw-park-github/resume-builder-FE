import React, { useState } from 'react';
import Modal from 'react-modal';
import SkillSelectorModal from "./SkillSelectorModal";
import { icons as skillsData } from '../../../assets/icons';
import styled, { createGlobalStyle } from "styled-components";

// SkillSearchComponent.js: 기술 선택 모달 관련


const GlobalStyle = createGlobalStyle`
    @media print {
        .search-btn {
            display: none;
        }
    }
`;


const Button = styled.div`
    min-width: 35px;
    min-height: 35px;
    max-height: 35px;
    max-width: 35px;
    padding: 5px;
    border: none;
    color: white;
    border-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    background-color: rgba(129, 172, 255, 1);
    cursor: pointer;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-right: 10px;
`;


const SkillsContainer = styled.div`
    border-style: dashed;
    border-color: rgba(239, 245, 255, 1);
    padding: 5px;
    display: flex;
    align-items: center;
    min-width: 50px;
    min-height: 40px;
    max-height: 40px;
    flex-wrap: wrap;
`;

// 모달의 루트 요소 설정
Modal.setAppElement('#root');


const SkillSearchComponent = ({ singleSelection = false, onSkillChange, selectedSkills = "" }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 열림 상태 관리

    // 모달 열기
    const openModal = () => setModalIsOpen(true);

    // 모달 닫기
    const closeModal = () => setModalIsOpen(false);

    // 스킬 선택 핸들러
    const handleSelectSkill = (skill) => {
        let updatedSkills;
        if (singleSelection) {
            updatedSkills = skill.icon;
        } else {
            const skillsArray = selectedSkills ? selectedSkills.split(', ') : [];
            if (!skillsArray.includes(skill.icon)) {
                skillsArray.push(skill.icon);
            }
            updatedSkills = skillsArray.join(', ');
        }
        onSkillChange(updatedSkills); // 스킬 변경 콜백 호출
        closeModal(); // 모달 닫기
    };

    // 스킬 제거 핸들러
    const handleRemoveSkill = (skillIcon) => {
        const skillsArray = selectedSkills.split(', ').filter(icon => icon !== skillIcon);
        onSkillChange(skillsArray.join(', ')); // 스킬 변경 콜백 호출
    };

    return (
        <>
            <GlobalStyle/>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Button className="search-btn" onClick={openModal}>검색</Button>
                {selectedSkills && (
                    <SkillsContainer>
                        {selectedSkills.split(', ').map((skillIcon, index) => (
                            <div key={index} onClick={() => handleRemoveSkill(skillIcon)} style={{ cursor: 'pointer', width: 40, height: 40, position: 'relative' }}>
                                <img src={skillIcon} alt={`skill-${index}`} style={{ width: '100%', height: '100%' }} />
                            </div>
                        ))}
                    </SkillsContainer>
                )}
                <SkillSelectorModal
                    isOpen={modalIsOpen}
                    closeModal={closeModal}
                    selectSkill={handleSelectSkill}
                    skillsData={skillsData}
                />
            </div>
        </>
    );
};

export default SkillSearchComponent;

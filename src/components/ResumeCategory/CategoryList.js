import React, { useState, useEffect } from 'react';

// CategoryList.js: 이력서 작성 섹션 관리

// 이력서 섹션 목록
const sections = [
    { name: 'About Me', detail: '인적 사항' },
    { name: 'Skill', detail: '기술 스택' },
    { name: 'Education', detail: '학력' },
    { name: 'Career', detail: '경력' },
    { name: 'Project', detail: '프로젝트' },
    { name: 'Training', detail: '교육 이수' },
    { name: 'Activity', detail: '대외 활동' },
    { name: 'Award', detail: '수상 이력' },
    { name: 'Certificate', detail: '자격증' },
    { name: 'Language', detail: '어학' }
];

const CategoryList = ({ onSectionChange, activeSections }) => {
    // 섹션 상태 관리
    const [sectionStates, setSectionStates] = useState([]);

    useEffect(() => {
        // 초기 로드 시 activeSections를 sectionStates로 설정
        setSectionStates(activeSections);
    }, [activeSections]);

    // 섹션 추가/제거 처리
    const toggleSection = (section) => {
        let newSections;
        if (sectionStates.includes(section)) {
            newSections = sectionStates.filter(item => item !== section);
        } else {
            if (section === 'About Me' && sectionStates.includes('About Me')) {
                alert('About Me 항목은 1개만 추가 가능.');
                return;
            }
            newSections = [...sectionStates, section];
        }
        setSectionStates(newSections);
        onSectionChange(newSections);
    };

    return (
        <div className="category-list">
            {sections.map((section) => (
                <div key={section.name} className="category-list-item">
                    <span style={{ width: 100, fontWeight: 'bold', fontSize: '20px' }}>{section.name}</span>
                    <span style={{ width: 80, textAlign: 'left', fontSize: '18px' }}>{section.detail}</span>
                    <button
                        className={sectionStates.includes(section.name) ? 'button-minus' : 'button-plus'}
                        onClick={() => toggleSection(section.name)}
                    >
                        {sectionStates.includes(section.name) ? '-' : '+'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// ResumeNav.js: 이력서 작성 페이지의 네비게이션 바

const Container = styled.div`
    height: 45px;
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: space-between;
    width: 1470px;
`;

const LogoLabel = styled.div`
    height: 40px;
    width: 120px;
    font-size: 24px;
    font-weight: bold;
    color: white;
    padding-left: 15px;
    padding-top: 5px;
    border-radius: 5px 5px 0 0;
    background-color: rgba(0, 30, 89, 1);
`;

const NavButton = styled.button`
    height: 45px;
    width: 100px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    padding: 10px;
    // border-radius: 5px;
    background-color: rgba(0, 30, 89, 1);
    color: rgb(255, 255, 255);
    border-color: rgba(0, 30, 89, 1);
    margin-left: 5px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:first-child {
        margin-left: 0;
    }

    &:hover {
        transform: translateY(-2px);
    }
`;

const ResumeNav = ({ defaultActive, handleSave, handlePrint }) => {
    const [activeButton, setActiveButton] = useState(defaultActive);
    const navigate = useNavigate();

    const handleButtonClick = (button) => {
        setActiveButton(button);
        if (button === '목록') {
            navigate("/resumes");
        } else if (button === '로그아웃') {
            localStorage.removeItem("ACCESS_TOKEN"); // 토큰 삭제
            navigate("/login");
        } else if (button === '전체 저장') {
            handleSave();
        } else if (button === 'PDF 인쇄') {
            handlePrint();
        }
    };

    return (
        <Container>
            <LogoLabel>DevDoc</LogoLabel>
            <div>
                <NavButton onClick={() => handleButtonClick('로그아웃')} active={activeButton === '로그아웃'}>로그아웃</NavButton>
                <NavButton onClick={() => handleButtonClick('목록')} active={activeButton === '목록'}>목록</NavButton>
                <NavButton onClick={() => handleButtonClick('전체 저장')} active={activeButton === '전체 저장'}>저장</NavButton>
                <NavButton onClick={() => handleButtonClick('PDF 인쇄')} active={activeButton === 'PDF 인쇄'}>인쇄</NavButton>
            </div>
        </Container>
    );
};

export default ResumeNav;

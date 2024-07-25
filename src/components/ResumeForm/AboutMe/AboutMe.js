import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import blogIcon from '../../../assets/blog-icon.png';
import githubIcon from '../../../assets/github-icon.png';
import emailIcon from '../../../assets/email-icon.png';
import phoneIcon from '../../../assets/phone-icon.png';
import birthdayIcon from '../../../assets/birthday-icon.png';
import FieldWithToggleButton from "./FieldWithToggleButton";
import { call } from "../../../service/ApiService";

// // AboutMe 섹션을 관리

const GlobalStyle = createGlobalStyle`
    @media print {
      .toggle-button, .image-input-btn {
          display: none;
      }  
      .image-preview {
          display: block !important; 
       }
        .hidden-print, .image-container-no-image {
            display: none !important;
        }
        .print-center {
            justify-content: center;
        }
    }

    .hidden {
        display: none !important;
    }
`;

const Input = styled.input`
    padding: 8px;
    margin-right: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 17px;
    resize: none;
    overflow: hidden;
    height: auto;
    width: 220px;
`;

const Button = styled.button`
    width: 25px;
    height: 25px;
    background-color: ${props => props.active ? 'rgba(175, 175, 175, 1)' : 'rgba(129, 172, 255, 1)'};
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px;
    margin-top: 7px;
`;

const ImagePreview = styled.img`
    width: 131px;
    height: 176px;
    object-fit: cover;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-style: dashed;
    border-color: rgba(239, 245, 255, 1);
    
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const FileInputLabel = styled.label`
    padding: 8px 12px;
    background-color: #81acff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    display: inline-block;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-right: 40px;

    @media print {
        &.print-center {
            justify-content: center;
        }
    }
`;

// 입력값 유효성 검사 hook
const useInputValidation = (initialValue, pattern) => {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState(true);

    const onChange = (e) => {
        const newValue = e.target.value;
        const valid = pattern.test(newValue);
        setIsValid(valid);
        setValue(newValue);
    };

    const reset = () => {
        setValue('');
        setIsValid(true);
    };

    return { value, setValue, onChange, isValid, setIsValid, reset };
};


const AboutMe = ({ aboutMe, setAboutMe, resumeId }) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    // AboutMe 데이터 로드
    useEffect(() => {
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

    // 입력값 변경 handler
    const handleInputChange = (field, value) => {
        setAboutMe(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // 이미지 변경 handler
    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        }

        reader.readAsDataURL(file);
    };

    const [isActive, setIsActive] = useState({
        phone: true,
        email: true,
        githubAddress: true,
        blogAddress: false,
        selfIntroduction: true,
        birthday: false
    });

    // 활성 상태 토글 handler
    const toggleActive = (field, input) => {
        setIsActive(prev => {
            const newState = { ...prev, [field]: !prev[field] };

            if (!newState[field]) {
                input.reset();
                handleInputChange(field, "");
            }
            return newState;
        });
    };

    // 입력값 유효성 검사 설정
    const phoneInput = useInputValidation(aboutMe?.phoneNumber || '', /^\d{3}-\d{4}-\d{4}$/);
    const emailInput = useInputValidation(aboutMe?.email || '', /^[a-zA-Z0-9.]+@[a-z]+\.[a-z]+$/);
    const birthdayInput = useInputValidation(aboutMe?.birthday || '', /^\d{4}\.\d{2}\.\d{2}$/);
    const githubInput = useInputValidation(aboutMe?.github || '', /^[\s\S]*$/);
    const blogInput = useInputValidation(aboutMe?.blog || '', /^[\s\S]*$/);
    const introInput = useInputValidation(aboutMe?.introduction || '', /^[\s\S]*$/);

    // 자기소개 변경 handler
    const handleIntroductionChange = (e) => {
        const value = e.target.value;
        const lineCount = (value.match(/\n/g) || []).length + 1;

        if (lineCount <= 3) {
            introInput.onChange(e);
            handleInputChange('introduction', value);
        }
    };

    return (
        <>
            <GlobalStyle />
            <SectionContainer title="About Me">
                <div style={{ display: "flex", paddingTop: 10, justifyContent: 'space-between', marginRight: 40 }}>
                    <InputContainer className="print-center">
                        <Input
                            placeholder="이름"
                            style={{ marginLeft: 39 }}
                            value={aboutMe?.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />

                        <div className="hidden">
                            <FieldWithToggleButton
                                icon={birthdayIcon}
                                placeholder="생년월일 (YYYY.MM.DD)"
                                isActive={isActive.birthday}
                                inputProps={birthdayInput}
                                toggleActive={toggleActive}
                                fieldType="birthday"
                                errorMessage="날짜 형식을 확인해 주세요."
                                value={birthdayInput.value}
                                onChange={(e) => {
                                    birthdayInput.onChange(e);
                                    handleInputChange('birthday', e.target.value);
                                }}
                            />
                        </div>

                        <div className={!isActive.phone ? 'hidden-print' : ''}>
                            <FieldWithToggleButton
                                icon={phoneIcon}
                                placeholder="전화번호 ('-' 포함)"
                                isActive={isActive.phone}
                                inputProps={phoneInput}
                                toggleActive={toggleActive}
                                fieldType="phone"
                                errorMessage="전화번호 형식을 확인해 주세요."
                                value={phoneInput.value}
                                onChange={(e) => {
                                    phoneInput.onChange(e);
                                    handleInputChange('phoneNumber', e.target.value);
                                }}
                            />
                        </div>

                        <div className={!isActive.email ? 'hidden-print' : ''}>
                            <FieldWithToggleButton
                                icon={emailIcon}
                                placeholder="이메일"
                                isActive={isActive.email}
                                inputProps={emailInput}
                                toggleActive={toggleActive}
                                fieldType="email"
                                errorMessage="이메일 형식을 확인해 주세요."
                                value={emailInput.value}
                                onChange={(e) => {
                                    emailInput.onChange(e);
                                    handleInputChange('email', e.target.value);
                                }}
                            />
                        </div>

                        <div className={!isActive.githubAddress ? 'hidden-print' : ''}>
                            <FieldWithToggleButton
                                icon={githubIcon}
                                placeholder="깃허브 주소"
                                isActive={isActive.githubAddress}
                                inputProps={githubInput}
                                toggleActive={toggleActive}
                                fieldType="githubAddress"
                                errorMessage="깃허브 주소를 확인해 주세요."
                                value={githubInput.value}
                                onChange={(e) => {
                                    githubInput.onChange(e);
                                    handleInputChange('github', e.target.value);
                                }}
                            />
                        </div>
                    </InputContainer>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <input className="image-input-btn" type="file" style={{ display: 'none' }} />
                        {!imagePreviewUrl && (
                            <FileInputLabel htmlFor="imageUpload">사진 첨부</FileInputLabel>
                        )}
                        <HiddenFileInput id="imageUpload" type="file" onChange={handleImageChange} accept="image/*" />
                        {imagePreviewUrl && (
                            <ImageContainer className="image-container">
                                <ImagePreview className="image-preview" src={imagePreviewUrl} alt="Profile Image" />
                            </ImageContainer>
                        )}
                        <div className="hidden">
                            <FieldWithToggleButton
                                icon={blogIcon}
                                placeholder="블로그 주소"
                                isActive={isActive.blogAddress}
                                inputProps={blogInput}
                                toggleActive={toggleActive}
                                fieldType="blogAddress"
                                errorMessage="블로그 주소를 확인해 주세요."
                                value={blogInput.value}
                                onChange={(e) => {
                                    blogInput.onChange(e);
                                    handleInputChange('blog', e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", marginLeft: 39 }}>
                    <div className={!isActive.selfIntroduction ? 'hidden-print' : ''}>
                        <Input
                            style={{ width: 600, height: 75, fontFamily: "inherit", lineHeight: 1.5 }}
                            as="textarea"
                            rows={4}
                            placeholder="자기소개를 입력하세요."
                            disabled={!isActive.selfIntroduction}
                            {...introInput}
                            value={aboutMe?.introduction || ''}
                            isValid={introInput.isValid}
                            onChange={handleIntroductionChange}
                        />
                        {(isActive.selfIntroduction && !introInput.isValid) && (
                            <p style={{ color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13 }}>
                                입력을 확인해 주세요.
                            </p>
                        )}
                    </div>
                    <Button className="toggle-button" onClick={() => toggleActive('selfIntroduction', introInput)} active={isActive.selfIntroduction}>
                        {isActive.selfIntroduction ? '-' : '+'}
                    </Button>
                </div>
            </SectionContainer>
        </>
    );
};

export default AboutMe;

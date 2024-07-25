import React, { useMemo, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import CheckboxLabels from "../../ResumeCommon/CheckboxLabels";
import SkillSearchComponent from "../SearchSkills/SkillSearchComponent";
import { call } from "../../../service/ApiService";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const GlobalStyle = createGlobalStyle`
    @media print {
        .add-quill-btn, .remove-btn, .error,
        .ql-toolbar, .checkbox-label {
            display: none !important;
        }
        .ql-container.ql-snow {
            border: none !important;
            height: auto !important;
            overflow: hidden !important;
        }
        .ql-editor {
            height: auto !important;
            overflow: hidden !important;
        }
        .print-border {
            height: auto !important;
            min-height: auto !important;
        }
        .border-no-quill-1 {
            height: 55px !important;
        }
        .border-with-quill-1 {
            height: 160px !important;
        }
        .border-with-techStack-1 {
            height: 150px !important;
        }
        .border-with-quill-techStack-1 {
            height: 220px !important;
        }
        .employment-status {
            display: block !important;
        }
        .employment-status-hidden {
            display: none !important;
        }
    }
`;


const Border = styled.div`
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    border-color: rgba(18, 73, 156, 50%);
    margin-bottom: 10px;
    padding-left: 20px;
    padding-bottom: 20px;
    height: ${(props) => (props.quill ? '305px' : '150px')};
`;


const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 17px;
    width: 150px;
    height: 20px;
`;


const Button = styled.div`
    min-width: 625px;
    min-height: 25px;
    max-height: 25px;
    max-width: 625px;
    padding: 5px;
    border: none;
    color: white;
    border-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    background-color: ${(props) => (props.quill ? 'rgba(175, 175, 175, 1)' : 'rgba(129, 172, 255, 1)')};
    cursor: pointer;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
`;

// Quill 에디터 포맷 설정
const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
    'color',
    'background',
    'size',
    'h1',
];


const CareerRecord = ({ body, setBody, index, career, onRemove, onUpdate, resumeId }) => {
    const checkboxOption = "재직";
    const [isChecked, setIsChecked] = useState(career.isCurrent);
    const [error, setError] = useState('');
    const [quill, setQuill] = useState(true);
    const quillRef = useRef(null);

    // 인풋 변경 핸들러
    const handleInputChange = (field, value) => {
        onUpdate(index, field, value);
    };

    // 날짜 유효성 검사
    const validateDate = (date) => {
        return /^\d{4}\.\d{2}$/.test(date);
    };

    // 시작 날짜 변경 핸들러
    const handleStartDateChange = (value) => {
        handleInputChange('startDate', value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    // 종료 날짜 변경 핸들러
    const handleEndDateChange = (value) => {
        handleInputChange('endDate', value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    // 체크박스 변경 핸들러
    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        onUpdate(index, 'isCurrent', checked);
        if (checked) {
            onUpdate(index, 'endDate', ''); // 현재 재직 중이라면 종료일 제거
        }
    };

    // 삭제 핸들러
    const handleRemove = async () => {
        try {
            await call(`/api/resumes/${resumeId}/careers/${career.id}`, "DELETE");
            onRemove();
        } catch (error) {
            console.error("Failed to delete career data", error);
        }
    };

    // Quill 모듈 설정
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ size: ['small', false ] }],
                    [{ align: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [
                        {
                            color: [],
                        },
                        { background: [] },
                    ],
                ],
            },
        };
    }, []);

    // Quill 토글 핸들러
    const handleQuill = () => {
        setQuill(prevQuill => !prevQuill);
    }

    const techStackEmpty = !career.techStack || career.techStack.length === 0;

    // 경계 스타일 클래스 결정
    const getBorderClass = () => {
        if (quill && !techStackEmpty) return 'border-with-quill-techStack-1';
        if (quill) return 'border-with-quill-1';
        if (!techStackEmpty) return 'border-with-techStack-1';
        return 'border-no-quill-1';
    };

    // Quill 내용 변경 핸들러
    const handleQuillChange = (content, delta, source, editor) => {
        const lines = editor.getContents().ops.reduce((acc, op) => {
            const text = op.insert;
            if (typeof text === 'string') {
                return acc + text.split('\n').length - 1;
            }
            return acc;
        }, 0);

        if (lines <= 4) {
            onUpdate(index, 'description', content);
        } else {
            const newContent = editor.getText().split('\n').slice(0, 4).join('\n');
            quillRef.current.getEditor().setContents([{ insert: newContent }]);
        }
    }

    return (
        <>
            <GlobalStyle />
            <Border quill={quill} className={getBorderClass()}>
                <div style={{ display: "flex", justifyContent: "flex-end", height: 20 }}>
                    <button
                        className="remove-btn"
                        style={{
                            cursor: "pointer",
                            borderRadius: "0px 8px 0px 3px",
                            width: 30,
                            height: 20,
                            backgroundColor: "rgba(18, 73, 156, 50%)",
                            color: "white",
                            border: "none"
                        }} onClick={handleRemove}>-
                    </button>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                    <Input placeholder="회사명" value={career.company}
                           onChange={(e) => onUpdate(index, 'company', e.target.value)} />
                    <Input placeholder="부서명/직책" value={career.department}
                           onChange={(e) => onUpdate(index, 'department', e.target.value)} />

                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <Input style={{ width: 80 }} placeholder="YYYY.MM" value={career.startDate}
                                   onChange={(e) => handleStartDateChange(e.target.value)} />
                            <span>-</span>
                            <Input
                                style={{ width: 80 }}
                                placeholder={isChecked ? "N/A" : "YYYY.MM"}
                                disabled={isChecked}
                                value={isChecked ? "재직 중" : career.endDate}
                                onChange={(e) => handleEndDateChange(e.target.value)}
                            />
                            <div className="checkbox-label">
                                <CheckboxLabels option={checkboxOption} checked={isChecked}
                                                onChange={handleCheckboxChange}></CheckboxLabels>
                            </div>
                            <div
                                className={isChecked ? "employment-status" : "employment-status-hidden"}
                                style={{ display: 'none', marginLeft: 10 }}
                            >
                                재직중
                            </div>
                        </div>
                        {error && <div className="error" style={{ fontSize: 13, color: 'rgba(202, 5, 5, 1)', marginLeft: 2, marginTop: 2 }}>{error}</div>}
                    </div>

                </div>
                <div style={{ height: 5 }}></div>
                <SkillSearchComponent
                    singleSelection={true}
                    selectedSkills={career.techStack || ""}
                    onSkillChange={(careers) => handleInputChange('techStack', careers)}
                />

                <div style={{
                    marginLeft: -40,
                    marginTop: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Button className="add-quill-btn" onClick={handleQuill}
                            quill={quill}>{quill ? "상세 설명 제거" : "상세 설명 추가"}</Button>
                    {quill && <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        style={{ width: 630, height: 100, marginTop: 3 }}
                        onChange={handleQuillChange}
                        value={career.description}
                        ref={quillRef}
                    />}
                </div>
            </Border>
        </>
    );
}

export default CareerRecord;

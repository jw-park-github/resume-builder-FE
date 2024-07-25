import React, {useMemo, useRef, useState} from "react";
import styled, {createGlobalStyle} from "styled-components";
import CheckboxLabels from "../../ResumeCommon/CheckboxLabels";
import SkillSearchComponent from "../SearchSkills/SkillSearchComponent";
import { call } from "../../../service/ApiService";
import ReactQuill from "react-quill";

const GlobalStyle = createGlobalStyle`
  @media print {
      .add-quill-btn, .remove-btn
      .ql-toolbar {
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
      .border-no-quill {
          height: 100px !important; 
      }
      .border-with-quill {
          height: 200px !important;
      }
      .border-with-techStack {
          height: 160px !important;
      }
      .border-with-quill-techStack {
          height: 280px !important;
      }
      .project-status {
          display: block !important;
      }
      .project-status-hidden {
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
    height: ${(props) => (props.quill ? '350px' : '195px')};
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 17px;
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

const ProjectRecord = ({ index, project, onRemove, onUpdate, resumeId }) => {
    const checkboxOption = "진행중";
    const [isChecked, setIsChecked] = useState(project.isCurrent);

    const [error, setError] = useState('');
    const [quill, setQuill] = useState(false);
    const quillRef = useRef(null);


    const handleInputChange = (field, value) => {
        onUpdate(index, field, value);
    };

    const validateDate = (date) => {
        return /^\d{4}\.\d{2}$/.test(date);
    };

    const handleStartDateChange = (value) => {
        handleInputChange('startDate', value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    const handleEndDateChange = (value) => {
        handleInputChange('endDate', value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        onUpdate(index, 'isCurrent', checked);
        if (checked) {
            onUpdate(index, 'endDate', ''); // 현재 진행 중이라면 종료일 제거
        }
    };

    const handleRemove = async () => {
        try {
            await call(`/api/resumes/${resumeId}/projects/${project.id}`, "DELETE");
            onRemove();
        } catch (error) {
            console.error("Failed to delete project data", error);
        }
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ size: ['small', false, 'large', 'huge'] }], // 텍스트 크기 옵션 추가
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


    const handleQuill = () => {
        setQuill(prevQuill => !prevQuill);
    }

    const techStackEmpty = !project.techStack || project.techStack.length === 0;

    const getBorderClass = () => {
        if (quill && !techStackEmpty) return 'border-with-quill-techStack';
        if (quill) return 'border-with-quill';
        if (!techStackEmpty) return 'border-with-techStack';
        return 'border-no-quill';
    };

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
                    <button className="remove-btn"
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
                <div style={{display: "flex", height: error ? 55 : 35, gap: 5}}>
                    <Input style={{width: 150, height:18}} placeholder="프로젝트명" value={project.title}
                           onChange={(e) => onUpdate(index, 'title', e.target.value)}/>
                    <div>
                        <div style={{ display: "flex", alignItems:"center", gap: 5, height: 35}}>
                            <Input style={{width: 80}} placeholder="YYYY.MM" value={project.startDate}
                                   onChange={(e) => handleStartDateChange(e.target.value)}/>
                            <span>-</span>
                            <Input
                                style={{width: 80}}
                                placeholder={isChecked ? "N/A" : "YYYY.MM"}
                                disabled={isChecked}
                                value={isChecked ? "진행중" : project.endDate}
                                onChange={(e) => handleEndDateChange(e.target.value)}
                            />
                            <div className="checkbox-label">
                                <CheckboxLabels option={checkboxOption} checked={isChecked}
                                                onChange={handleCheckboxChange}></CheckboxLabels>
                            </div>
                            <div
                                className={isChecked ? "project-status" : "project-status-hidden"}
                                style={{display: 'none', marginLeft: 10}}
                            >
                                진행중
                            </div>
                        </div>
                        {error && <div className="error" style={{fontSize: 13, color: 'rgba(202, 5, 5, 1)', marginLeft: 2, marginTop: 2}}>{error}</div>}
                    </div>
                </div>
                <Input style={{width: 620, marginTop: 5}} placeholder="프로젝트 소개" value={project.intro}
                       onChange={(e) => onUpdate(index, 'intro', e.target.value)} />
                <div style={{ height: 5 }}></div>
                <SkillSearchComponent
                    singleSelection={true}
                    selectedSkills={project.techStack || ""}
                    onSkillChange={(projects) => handleInputChange('techStack', projects)}
                />
                {/*<Input as="textarea"*/}
                {/*    style={{ marginTop: 5, width: 620, height: 60, fontFamily: "inherit" }}*/}
                {/*    placeholder="부연 설명을 입력하세요."*/}
                {/*    value={project.description}*/}
                {/*    onChange={(e) => onUpdate(index, 'description', e.target.value)}*/}
                {/*/>*/}
                <div style={{ marginLeft: -40, marginTop: 5, justifyContent:'center', alignItems:'center', display:'flex', flexDirection:'column'}}>
                    <Button className="add-quill-btn" onClick={handleQuill} quill={quill}>{ quill ? "상세 설명 제거" : "상세 설명 추가"}</Button>
                    {quill && <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        style={{width: 630, height:100, marginTop:3}}
                        onChange={handleQuillChange}
                        value={project.description}
                        ref={quillRef}
                    />}
                </div>
            </Border>
        </>
    );
}

export default ProjectRecord;

import React, {useMemo} from 'react';
import styled, {createGlobalStyle} from "styled-components";
import SkillSearchComponent from "../SearchSkills/SkillSearchComponent";
import { call } from "../../../service/ApiService";

const GlobalStyle = createGlobalStyle`
  @media print {
      .remove-btn {
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
    height: 130px;
`;

const Input = styled.textarea`
    padding: 8px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 17px;
    width: 100%;
    height: 60px;
    font-family: inherit;
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

const SkillRecord = ({ index, skill, onRemove, onUpdate, resumeId }) => {

    const handleInputChange = (field, value) => {
        onUpdate(index, field, value);
    };

    const handleRemove = async () => {
        try {
            await call(`/api/resumes/${resumeId}/skills/${skill.id}`, "DELETE");
            onRemove();
        } catch (error) {
            console.error("Failed to delete skill data", error);
        }
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ size: ['small', false, 'large', 'huge'] }],
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

    return (
        <>
            <GlobalStyle />
            <Border>
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
                <div style={{ height: 5 }}></div>
                <div style={{ display: "flex", alignItems: 'center', gap: 15, paddingLeft: 0, paddingRight: 15, marginBottom: 5 }}>
                    <SkillSearchComponent
                        singleSelection={true}
                        selectedSkills={skill.techStack || ""}
                        onSkillChange={(skills) => handleInputChange('techStack', skills)}
                    />
                    <Input
                        placeholder="부연 설명을 입력하세요."
                        value={skill.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                </div>
            </Border>
        </>
    );
};

export default SkillRecord;

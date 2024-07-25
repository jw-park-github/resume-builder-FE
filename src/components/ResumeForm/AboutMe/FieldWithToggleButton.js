import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @media print {
    .toggle-button {
      display: none;
    }
  }
`;

const Input = styled.input`
    padding: 8px;
    margin-right: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: block;
    font-size: 18px;
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
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FieldWithToggleButton = ({ icon, placeholder, isActive, inputProps, toggleActive, fieldType, errorMessage, value, onChange }) => {
    return (
        <>
            <GlobalStyle />
            <div style={{display: "flex"}}>
                <img src={icon} alt={fieldType} style={{padding: 7, width: 25, height: 25}}/>
                <div>
                    <Input
                        placeholder={placeholder}
                        disabled={!isActive}
                        value={value}
                        onChange={onChange}
                    />
                    {isActive && !inputProps.isValid && (
                        <p style={{color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13}}>
                            {errorMessage}
                        </p>
                    )}
                </div>
                <Button
                    className="toggle-button"
                    onClick={() => toggleActive(fieldType, inputProps)}
                    active={isActive}
                    title="입력란이 활성화된 상태에서만 출력창에 해당 입력란이 표시됩니다"
                >
                    {isActive ? '-' : '+'}
                </Button>
            </div>
        </>
    );
};

export default FieldWithToggleButton;

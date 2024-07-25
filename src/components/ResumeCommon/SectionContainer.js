import React from 'react';
import styled from "styled-components";


const Container = styled.div`
    border: 2px solid #486da4;
    padding: 20px;
    margin-bottom: 40px;
    border-radius: 5px;
    width: 700px;

    @media print {
        margin-bottom: 30px;
        page-break-inside: avoid;
    }
`;

const SectionTitle = styled.div`
    color: black;
    background-color: rgba(239, 245, 255, 1);  
    border-radius: 5px 5px 0 0;
    width: 160px;
    height: 50px;
    margin-left: 35px;
    font-size: 21px;
    display: flex;
    align-items: center;
    padding-left: 25px;
    font-weight: 500;
    @media print {
        margin-left: 40px;
        page-break-after: avoid;
    }
`;

const SectionContainer = ({ title, children }) => (
    <div>
        <SectionTitle>{title}</SectionTitle>
        <Container className="container">
            {children}
        </Container>
    </div>
);

export default SectionContainer;

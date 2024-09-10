import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    justify-content: space-between; /* Adiciona espaço entre os elementos */
    align-items: center;
    min-height: 100vh;
    padding: 0px 160px;
    background-color: #3164E5;
    background-size: cover;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 40px 20px;
    }
`;

export const Content = styled.section`
    max-width: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
        align-items: center;
    }
`;

export const LeftSide = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    @media (max-width: 768px) {
        align-items: center;
        text-align: center;
    }
`;

export const RightSide = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    @media (max-width: 768px) {
        width: 100%;
    }
`;


export const Title = styled.h1`
    font-weight: 400;
    font-size: 50px;
    margin-bottom: 25px;
    line-height: 56px;
    color: #fff;

    @media (max-width: 768px) {
        font-size: 38px;
    }
`;

export const Subtitle = styled.p`
    line-height: 25px;
    color: #fff;
`;

export const Form = styled.form`
    width: 150%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 35px;
    border-radius: 8px;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;
`;


export const FormTitle = styled.h2`
    color: #3164E5;
    text-align: center;
    margin-bottom: 20px;
`;

export const ErrorMessage = styled.span`
    color: hsl(0, 100%, 74%);
    font-size: 10px;
`;

export const LabelSignup = styled.p`
    font-size: 10px;
    color: hsl(246, 25%, 77%);
    text-align: center;
    margin: auto;
`;

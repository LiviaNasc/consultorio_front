import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 0px 160px;
    background-color: #1b987b /*#3164E5*/;
    background-size: cover;
    overflow: auto;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 40px 20px;
    }
`;

export const Form = styled.form`
    width: 60%;
    max-width: 500px;
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

export const StrongText = styled.span`
    color: #3164E5;
    cursor: pointer;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`;

export const LabelSignup = styled.p`
    font-size: 14px;
    color: #757575;
    text-align: center;
    margin-top: 25px;
`;

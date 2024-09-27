import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    justify-content: space-between; /* Adiciona espaço entre os elementos */
    align-items: center;
    min-height: 100vh;
    padding: 0px 160px;
    background-color: #fefefe;
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
        width: 60%;
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
    color: blue;

    @media (max-width: 768px) {
        font-size: 38px;
    }
`;

export const Subtitle = styled.p`
    line-height: 25px;
    color: blue;
    margin-bottom: 5px;
`;



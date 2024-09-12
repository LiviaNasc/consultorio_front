import styled from "styled-components";

export const Button = styled.button`
    padding: 17px 25px;
    border-radius: 15px;
    border: 1px solid #efefef;
    background-color: #3164E5;;
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
        transform: scale(1.05);
    }
`;
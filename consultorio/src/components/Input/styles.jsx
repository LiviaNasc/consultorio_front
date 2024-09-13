import styled from "styled-components";

export const Input = styled.input`
    padding: 17px 25px;
    border-radius: 8px;
    border: 1px solid #efefef;
    background-color: #F5F5F5;
    font-weight: 600;
`;

export const Select = styled.select`
    padding: 17px 25px;
    border-radius: 8px;
    border: 1px solid #efefef;
    background-color: #F5F5F5;
    color: ${({ value }) => (value === '' ? '#757575' : '#757575')}; /* Mantém a cor sempre #757575 */
    font-weight: 600;
    appearance: none; /* Remove o estilo padrão do select */
    -webkit-appearance: none; /* Remove o estilo padrão do select no Safari */
    -moz-appearance: none; /* Remove o estilo padrão do select no Firefox */
    cursor: pointer; /* Mostra um cursor de ponteiro ao passar o mouse sobre o select */

       option {
        color: #757575;
        font-weight: 600;
        background-color: #F5F5F5;
        border: none;
    }
`;
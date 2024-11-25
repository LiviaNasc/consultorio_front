import styled from 'styled-components';

export const Container = styled.div`
  height: 90px;
  display: flex;
  background-color: #3164E5;

  > svg {
    position: fixed;
    color: white;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
  }

  h2 {
    color: white;  // Torna o texto branco
    margin-left: auto;  // Empurra o h2 para a extremidade direita
    margin-right: 32px;  // Adiciona margem à direita para espaçamento
    margin-top: 32px;
  }
`;
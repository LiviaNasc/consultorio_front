// styles.js
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); // Fundo escurecido
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;  // Centraliza todo o conteúdo

  h2 {
    margin-bottom: 20px;
  }

  button {
    background: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    display: block;  // Faz o botão ocupar a largura
    margin-left: auto;
    margin-right: auto;  // Centraliza o botão
  }

  p {
    margin: 10px 0;
  }
`;

export const InfoBox = styled.div`
  border: 1px solid black;  // Bordas pretas finas
  border-radius: 8px;       // Bordas arredondadas
  padding: 15px;
  margin-bottom: 20px;      // Espaço entre a caixa e o botão/elementos
`;

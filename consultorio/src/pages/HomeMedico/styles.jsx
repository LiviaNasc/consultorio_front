import styled from "styled-components";

// Container principal
export const Container = styled.main`
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
  padding: 0 40px; /* Menos padding lateral */
  background-color: #ffffff; /* Cor de fundo original */
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

export const LeftSide = styled.div`
  flex: 1;
  max-width: 500px; /* Largura do container à esquerda */
  padding: 40px;
  background: rgba(255, 255, 255, 0.9); /* Fundo mais opaco */
  border-radius: 8px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2); /* Sombras mais intensas */
  border: 1px solid #e0e0e0; /* Borda sutil */

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 20px;
    text-align: center;
  }
`;

export const RightSide = styled.div`
  flex: 1;
  max-width: 400px; /* Largura do lado direito */
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centralizar conteúdo */
  justify-content: center; /* Centralizar verticalmente */
`;

export const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  padding: 30px; /* Aumentar padding */
  width: 100%; /* Largura total */
  max-width: 350px; /* Largura máxima para o retângulo */
  text-align: center; /* Centralizar texto */
`;

export const CardTitle = styled.h2`
  font-size: 24px;
  color: #003366;
  margin-bottom: 10px;
`;

export const CardDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px; /* Espaço entre descrição e botão */
`;

export const ListContainer = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  margin-top: 10px;
  width: 100%;
`;

export const ConsultaItem = styled.div`
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: #e3eefc;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease; /* Adicionando transformação ao hover */
  font-size: 16px;

  &:hover {
    background-color: #d1e2f3;
    transform: translateY(-2px); /* Levantar ao passar o mouse */
  }
`;

export const Title = styled.h1`
  font-weight: 600; /* Levemente mais pesado */
  font-size: 40px; /* Diminuído para menos espaço vazio */
  color: #003366;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const Subtitle = styled.p`
  font-size: 18px; /* Diminuído */
  color: #003366;
  margin-bottom: 20px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7); /* Escurecer o overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  width: 80%;
  max-width: 600px; /* Diminuído */
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.3); /* Sombras mais intensas */
  position: relative;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  
  h3 {
    font-size: 26px; /* Diminuído */
    color: #003366;
  }

  button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
  }
`;

export const ModalBody = styled.div`
  p {
    margin: 12px 0;
    font-size: 16px; /* Diminuído */
    color: #333;
  }
`;


export const ProntuarioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export const ProntuarioItem = styled.div`
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  &:hover {
    background-color: #e6e6e6;
  }
`;
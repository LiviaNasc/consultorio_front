import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* Ajuste para aumentar a largura do container */
`;

export const Box = styled.div`
  width: 90%; /* Aumenta a largura do Box */
  max-width: 600px; /* Limita a largura máxima */
  background-color: #eaeae5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px;
  border-radius: 8px;
  margin: 50px 80px;

  h3 {
    margin-top: 20px;
    font-size: 24px;
    color: gray;
  }

  select {
    margin-top: 20px;
    padding: 10px;
    border-radius: 4px;
    font-size: 16px;
    width: 200px;
  }
`;

export const IconContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px; /* Espaço entre os botões */
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    opacity: 0.9;
  }

  &.confirmar {
    background-color: #4CAF50;
    color: #fff;
  }

  &.trocar {
    background-color: #FF5722;
    color: #fff;
  }
`;

export const Form = styled.div`
  width: 90%;
  max-width: 600px; /* Limita a largura máxima do formulário */
  background-color: #f5f5f5;
  padding: 35px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 50px 80px;

  h3 {
    margin-bottom: 20px;
    font-size: 24px;
    color: gray;
  }

  label {
    margin-top: 15px;
    font-size: 16px;
  }

  input, textarea {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  textarea {
    resize: none;
    height: 100px;
  }
`;

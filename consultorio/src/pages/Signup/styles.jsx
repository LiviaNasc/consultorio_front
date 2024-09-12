import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #3164E5; 
`;

export const Content = styled.section`
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 600px;

  @media (max-width: 768px) {
    width: 80%;
    padding: 30px;
  }
`;

export const FormTitle = styled.h2`
  font-size: 24px;
  color: #3164E5;
  font-weight: 600;
  margin-bottom: 24px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%; /* Ajusta a largura da coluna do botão e ícone */

  svg {
    margin-bottom: 20px; /* Espaço entre o ícone e o botão */
    color: #3164E5;
  }
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


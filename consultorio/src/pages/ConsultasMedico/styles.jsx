import styled from 'styled-components';

export const ConsultasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 20px; 
  margin: 20px;
`;

export const ConsultaItem = styled.div`
  padding: 15px;
  border: 1px solid #ccc;
  margin: 10px;
  cursor: pointer; /* Muda o cursor para indicar que é clicável */
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0; /* Altera a cor de fundo ao passar o mouse */
  }
`;


export const ErrorMessage = styled.p`
  color: red;
`;


export const Title = styled.h2`
  font-size: 30px; 
  font-weight: bold;
  color: #333; 
  margin: 20px; 
  
`;


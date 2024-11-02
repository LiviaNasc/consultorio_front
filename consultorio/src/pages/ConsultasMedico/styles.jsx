import styled from 'styled-components';

export const ConsultasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 20px; 
  margin: 20px;
`;

export const ConsultaItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  margin: 10px;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: #f9f9f9;
    transform: scale(1.02); /* Leve aumento ao passar o mouse */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Intensifica a sombra */
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

export const Title = styled.h2`
  font-size: 30px; 
  font-weight: bold;
  color: #333; 
  margin: 20px;
  text-align: center;
`;

export const SearchBarContainer = styled.div`
  margin: 20px auto; /* Centraliza a barra de pesquisa */
  width: 80%; /* Limita a largura */
  max-width: 500px;

  input {
    width: 100%;
    padding: 12px 16px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 24px; /* Bordas arredondadas */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: #3164e5;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Sombra ao focar */
    }
  }
`;

export const NoResultsMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 40px;
`;


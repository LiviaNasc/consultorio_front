import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 30px; 
  font-weight: bold;
  color: #333; 
  margin: 20px;
  text-align: center;
`;

export const ProntuarioList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 20px;
  margin: 20px;
`;

export const ProntuarioItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  border-left: 4px solid #3164e5;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: #f9f9f9;
    transform: scale(1.02); 
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); 
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

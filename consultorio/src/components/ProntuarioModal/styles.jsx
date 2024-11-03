// styles.jsx
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  width: 500px;
  max-height: 80vh;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
  overflow-y: auto;
  max-height: 60vh;
  padding-right: 10px;

  label {
    font-weight: bold;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const FieldHalf = styled.div`
  flex: 1;

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 40px; /* Define a altura fixa para todos os campos */
    box-sizing: border-box; /* Garante que padding e bordas não aumentem a altura */
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

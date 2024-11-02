import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

export const Box = styled.div`
  width: 90%;
  max-width: 600px;
  background-color: #eaeae5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-radius: 8px;
  margin: 30px 0;

  h3 {
    margin-top: 20px;
    font-size: 24px;
    color: #4A4A4A;
  }

  select {
    margin-top: 15px;
    padding: 10px;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
  }
`;

export const IconContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #0066cc;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #004999;
  }

  svg {
    margin-right: 8px;
  }
`;

export const Form = styled.div`
  width: 90%;
  max-width: 600px;
  background-color: #f5f5f5;
  padding: 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 30px 0;

  h3 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }

  label {
    margin-top: 15px;
    font-size: 16px;
  }

  input, textarea, select {
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

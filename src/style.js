import styled from "styled-components";

export const ContainerLogin = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormLogin = styled.form`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px;
  background-color: #0f1b2b;
  padding: 1rem;
  gap: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #1070ca;
  outline: none;
  background-color: #fff;
`;

export const ButtonLogin = styled.button`
  width: 100%;
  border-radius: 8px;
  font-size: 1rem;
  padding: 0.5rem;
  border: 2px solid #1070ca;
  outline: none;
  background-color: #1070ca;
  color: #fff;
  font-weight: bold;
`;

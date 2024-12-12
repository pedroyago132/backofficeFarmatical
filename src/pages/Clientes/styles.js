import styled from "styled-components";
import { colorButton, backgroundColor, backgroundMenu } from '../../Globals/globals';
import Box from '@mui/material/Box';

// Container principal cobrindo toda a página
export const PageContainer = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  height: 100vh;
  background-color:${backgroundColor};
width:100%;
flex-direction:column;
gap:10px;
`;

export const ContainerEditAccordion = styled(Box)`
width: 100%;
display:flex;
align-items:flex-end;
justify-content:flex-end;
`
export const ContainerEdit = styled(Box)`
min-width: 100%;
display:flex;
flex-direction:row;
min-height:120px;
align-items:center;
justify-content:flex-start;
gap:25px;
border-bottom:1px solid black;

`

export const ContainerEditIn = styled(Box)`
width: 150px;
display:flex;
flex-direction:column;
height:65px;
gap:7px;

`



// Estilizando o formulário
export const FormContainer = styled.div`
  background-color: #dfdfdf; /* Fundo claro */
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 95%;
  display: flex;
  flex-direction: column;
  height: 65%; /* Altura fixa */
  gap: 15px;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto; /* Habilita o scroll vertical */
  
  /* Adicione um estilo para o scrollbar, se necessário */
  ::-webkit-scrollbar {
    width: 80px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #aaa;
  }
`;


export const Title = styled.a`
color:white;
font-size:24px;
font-weight:bold;
`

export const TitleForm = styled.a`
color:black;
font-size:16px;
font-weight:600;
`

export const SubTitle = styled.a`
color:grey;
font-size:17px;
font-weight:500;
`
// Estilizando os campos de entrada
export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

// Estilizando o botão
export const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
import styled from 'styled-components';
import { colorButton,backgroundColor,backgroundMenu } from '../../Globals/globals';
import AppBar from '@mui/material/AppBar';

export const Body = styled.div`
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  display:flex;
  padding:18px;
  align-items:flex-start;
  justify-content:flex-start;
  background-color:${backgroundColor};
  gap:15px;
`;


export const TextModel = styled.a`
color:grey;
font-size:25px;
font-weight:bold;
`

export const Text = styled.a`
color:grey;
font-size:16px;
font-weight:;
`

export const AppTopBar = styled(AppBar)`

`


import React from 'react';

import styled from 'styled-components';
import { colorButton,colorTitleButton,backgroundColor } from '../../Globals/globals';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  display:flex;
  align-items:center;
  justify-content:center;
  background-color:${backgroundColor};
`;

export const ContainerButton = styled.div`
  width: 70vw;
  height: 40%;
  flex-direction: column;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:15px;
`;

export const Button = styled.button`
 width:280px;
 height:60px;
 display:flex;
 align-items:center;
 justify-content:center;
 border-radius:20px;
 background-color:${colorButton};
 cursor:pointer;
`

export const TitleButton = styled.h1`
color:${colorTitleButton};
font-size:18px;
font-weight:bold;
`
export const Title = styled.a`
color:grey;
font-size:35px;
font-weight:bold;
`

export const SubTitle = styled.a`
color: white;
font-size: 14px;
font-weight: 400;
`
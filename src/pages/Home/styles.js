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
  gap:50px;
`;

export const ContainerButton = styled.div`
  width: 70vw;
  height: 40%;
  flex-direction: column;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:45px;
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
color:black;
font-size:35px;
font-weight:bold;
`

export const SubTitle = styled.a`
color: #d9ded8;
font-size: 14px;
font-weight: 400;
`

export const Input = styled.input`
color: #d9ded8;
font-size: 14px;
font-weight: 400;
width:280px;
height:47px;
border-color:#d9ded8;
border-radius:17px;
padding:7px;
background-color:${backgroundColor};
font-weight:bold;
border: 2px solid #d9ded8;
&::placeholder {
    font-weight: bold;
    color:#d9ded8; /* ajuste a cor conforme necessário */
  }
`
export const Logo = styled.img`
width:100px;
height:100px;
border-radius:17px;
padding:7px;
border: 2px solid #d9ded8;
`


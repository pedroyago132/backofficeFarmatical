import styled from 'styled-components';
import { backgroundMenu, textMenu } from '../../Globals/globals';

export const ContainerMenu = styled.div`
  width: 100vw;
  height: 7vh;
  flex-direction: row;
  display:flex;
  align-items:center;
  justify-content:flex-start;
  background-color:${backgroundMenu};
  gap:10px;
  padding:8px;
`;


export const TextMenu = styled.a`
color:${textMenu};
font-size:22px;
font-weight:500;
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${textMenu}; 
  }
`


import React from 'react';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';

import { Prompt } from './Prompt';
 
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: [site-left] 1fr [content-left] 2fr [content-right] 1fr [site-right];
  grid-template-rows: [site-top] .7fr [content-top] 2fr [content-bottom] 1fr [site-bottom];
`;

const Content = styled.div`
  justify-self: center;
  text-align:center;
  grid-column: content-left / content-right;
  grid-row: content-top / content-bottom; 
`;

const Link = styled.p`
  cursor: default
  text-align: left;
  &:hover {
    font-weight: bold;
  }
`;

const ExplainWrapper = styled.div`
  font-size: large;
  text-align: left;
  padding: 1em;
  font-weight: bold;
`;

export const Landing = () => {
  const { history } = useReactRouter();

  const Linker = (props) => {
    return <li><Link onClick={()=> {history.push(`/${props.username}`)}}>{props.text} [@{props.username}]</Link></li>
  };

  return <Container>
    <Content>
      <ExplainWrapper>study your opening routine. or study someone else's 😈</ExplainWrapper>
      <br></br>
      <Prompt/>
      <br></br>
      <br></br>
      <ul>
        <Linker text='Magnus Carlsen (GM, goat)' username='drnykterstein'/>
        <Linker text='Andrew Tang (GM, bullet champ)' username='penguingim1'/>
        <Linker text='Eric Hansen (GM, chess youtuber)' username='chessbrahs'/>
        <Linker text='Agadmator (IM, chess youtuber)' username='agadmator'/>
      </ul>
    </Content>
  </Container>
}
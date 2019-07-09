import React from 'react';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';

import { Prompt } from './Prompt';

const Content = styled.div`
  justify-self: center;
  text-align: center;
  margin: auto;
`;

const Link = styled.p`
  font-size: ${props => props.theme.wordSize};
  cursor: default
  text-align: left;
  &:hover {
    font-weight: bold;
  }
`;

const ExplainWrapper = styled.div`
  font-size: ${props => props.theme.wordSize};
  text-align: left;
  padding: 1em;
  font-weight: bold;
`;

export const Landing = () => {
  const { history } = useReactRouter();

  const Linker = (props) => {
    return <li><Link onClick={()=> {history.push(`/${props.username}`)}}>@{props.username} => {props.text} </Link></li>
  };

  return <Content>
      <ExplainWrapper>Study your opening routine. Or study someone else's <span role="img" aria-label="eyes">👀</span></ExplainWrapper>
      <br></br>
      <Prompt/>
      <br></br>
      <br></br>
      <ul>
        <Linker text='Magnus Carlsen (GM, goat)' username='drnykterstein'/>
        <Linker text='Andrew Tang (GM, bullet champ)' username='penguingim1'/>
        <Linker text='Eric Hansen (GM, chess youtuber)' username='chessbrahs'/>
        <li><Link onClick={()=>window.open('https://lichess.org/player')}>Find more</Link></li>
      </ul>
    </Content>
 
}
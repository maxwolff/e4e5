import React from 'react';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';

import { Prompt } from './Prompt';

const NavbarWrapper = styled.div`
	padding: 1em;
	grid-row: top / navbar-bottom;
	display: grid;
	grid-template-columns: [left] 1fr [left-box] 8fr [right-box] 1fr [right];
`;

const PromptWrapper = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  grid-column: left-box / right-box;
`;

export const TitleWrapper = styled.p`
  cursor: pointer;
  font-weight: bold;
  font-style: italic;
  margin: auto;
  font-size: ${props => props.theme.headerSize};
  grid-column: left / left-box;
  &:hover {
    font-weight: bold;
  }
`;

export const Navbar = (props) => {
  const { history } = useReactRouter();
  return <NavbarWrapper>
  <TitleWrapper onClick={()=>{history.push('/')}}>e4e5.dev</TitleWrapper>
    {
      history.location.pathname !== '/' 
      ? <PromptWrapper><Prompt/></PromptWrapper> 
      : null
    }
  </NavbarWrapper>
 }
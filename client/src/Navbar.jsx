import React from 'react';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';

import { Prompt } from './Prompt';
import { Title } from './Title';

const NavbarWrapper = styled.div`
	padding: 1em;
	grid-column: left / right;
	grid-row: navbar-top / navbar-bottom;
	display: grid;
	grid-template-columns: [left] 1fr [left-box] 8fr [right-box] 1fr [right];
`;

const PromptWrapper = styled.div`
  text-align: center;
  grid-column: left-box / right-box;
`;

export const Navbar = (props) => {
  const { history } = useReactRouter();
  return <NavbarWrapper>
    <Title onClick={()=>{history.push('/')}}/>
    {
      history.location.pathname !== '/' 
      ? <PromptWrapper><Prompt/></PromptWrapper> 
      : null
    }
  </NavbarWrapper>
 }
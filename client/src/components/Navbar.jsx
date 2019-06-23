import styled from 'styled-components';
import React from 'react';

const Wrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  border-bottom: 0.5px solid;
  background: white;
`;

export const Navbar = () => {
  return <Wrapper />
}
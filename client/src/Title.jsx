import React from 'react';
import styled from 'styled-components';

export const TitleWrapper = styled.div`
  color: #2C4251;
	font-weight: bold;
	font-style: italic;
	align-self:center;
	text-align: left;
	grid-column: left / left-box;
`;

export const Title = (props) => {
  return <TitleWrapper>e4e5.dev</TitleWrapper>
 }
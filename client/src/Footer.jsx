import React from 'react';
import styled from 'styled-components';

const Link = styled.p`
	font-weight: bold;
	font-style: italic;
	font-size: ${props => props.theme.headerSize};
	cursor: default
	text-align: left;
	&:hover {
	font-weight: bold;
	}
	margin-right: 3em;
    margin-top: auto;
    text-align: right;
    margin-bottom: auto;
`;

export const Footer = (props) => {
  return <Link onClick={()=>window.open('https://github.com/maxwolff/e4e5')}>github</Link>;
}
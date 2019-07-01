import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	text-align:center;
	height: 100vh;
	width: 100vw;
	display: grid;
	grid-template-columns: [left] 1fr [middle] 1fr [right];
	grid-template-rows: [top] 8fr [bottom] 1fr [footer];
`;

const OpeningButton = styled.div`
	cursor: help;
	background:white;
	margin: 1em;
	outline: double;
	text-align:left;
	&:hover {
		font-weight: bold;
	}
`;

const BlackOpeningList = styled.div`
	grid-column: middle / right;
	grid-row: top / bottom;
	padding: 4em;
`;

const WhiteOpeningList = styled.div`
	grid-column: left / middle;
	grid-row: top / bottom;
	padding: 4em;
`;

const UsernameText = styled.div`
	grid-row: top / bottom;
	grid-column: left / right;
`;

const numGames = 50;

const OpeningList = (props) => {
	return (
	props.openings.map(item => (
		<OpeningButton key={item.opening} onClick={()=>window.open(`https://en.wikipedia.org/wiki/${item.opening}`)}>
			 {100 * item.count/(numGames)}%     {item.opening}
		</OpeningButton>
	)));
}

export const ListOpenings = (props) => {
	const [openings, setOpenings] = useState({black: [], white: []});
	useEffect(()=> {
		const fetchOpenings = async () => {
			const result = await fetch(`/api/${props.match.params.username}/${numGames}`);
			const json = await result.json();
			setOpenings(json);
		};
		fetchOpenings();
	},[props.match.params.username]);

	console.log('openings', openings)

	return (
	<Container>
		<UsernameText><br></br>@{props.match.params.username} 's last {numGames} openings</UsernameText>
		<WhiteOpeningList>
			As White:
				<OpeningList openings={openings.white}/>
		</WhiteOpeningList>
		<BlackOpeningList>
			As Black:
				<OpeningList openings={openings.black}/>
		</BlackOpeningList>
	</Container>
	);
}
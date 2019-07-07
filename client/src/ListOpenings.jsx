import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Spinner } from "./Spinner"

const Container = styled.div`
	text-align:center;
	display: grid;
	grid-template-columns: [left] 1fr [middle] 1fr [right];
	grid-template-rows: [top] .7fr [title] 8fr [bottom];
`;

const OpeningButton = styled.div`
	padding: .5em;
	cursor: help;
	background:white;
	margin-top: 1em;
	margin-bottom: 1em;
	outline: double;
	text-align:left;
	font-size: 1.5em;
	&:hover {
		font-weight: bold;
	}
`;

const BlackOpeningList = styled.div`
	grid-column: middle / right;
	grid-row: title / bottom;
	padding: 2.5em;
`;

const WhiteOpeningList = styled.div`
	grid-column: left / middle;
	grid-row: title / bottom;
	padding: 2.5em;
`;

const UsernameText = styled.div`
	display: block;
	margin: auto;
	font-size: 1.5em;
	grid-row: top / title;
	grid-column: left / right;
`;

const ColorTitle = styled.div`
	padding-bottom: .5em;
	font-size: 1.5em;
`;

const SpinnerWrapper = styled.div`
	grid-row: title / bottom;
	grid-column: left / right;
	margin: auto;
`

const numGames = 20;

const OpeningList = (props) => {
	return	props.openings.map(item => (
		<OpeningButton key={item.opening} onClick={()=>window.open(`https://en.wikipedia.org/wiki/${item.opening}`)}>
			{(100 * item.count/(props.count)).toFixed(0)}%        {item.opening}
		</OpeningButton>
	));
}

export const ListOpenings = (props) => {
	const [openings, setOpenings] = useState({white:[], black: []});
	const [isLoading, setIsLoading] = useState(false);
	useEffect(()=> {
		const fetchOpenings = async (username, queryGames) => {
			setIsLoading(true);
			try {
				const result = await fetch(`/api/${props.match.params.username}/${queryGames}`);
				const json = await result.json();
				setOpenings(json);
			} catch(error) {
				console.log(error)
				return <div>Something went wrong ... try a different username</div>;
			}
			setIsLoading(false);
		};
		fetchOpenings(props.match.params.username, numGames);
	},[props.match.params.username]);

	const shouldRender = !openings.error && isLoading === false;
	// console.log(shouldRender)
	return (
	<Container>
		<UsernameText>@{props.match.params.username} 's last {numGames} openings</UsernameText>
		{isLoading && <SpinnerWrapper><Spinner/></SpinnerWrapper>}
		{openings.error && <div>Something went wrong ... try a different username</div>}

		<WhiteOpeningList>
			<ColorTitle>As White:</ColorTitle>
			{shouldRender && <OpeningList openings={openings.white} count={openings.whiteCount}/>}
		</WhiteOpeningList>

		<BlackOpeningList>
			<ColorTitle>As Black:</ColorTitle>
			{shouldRender && <OpeningList openings={openings.black} count={openings.blackCount}/>}
		</BlackOpeningList>

	</Container>
	);
}
import React from 'react';
import './App.css';
import './lichess';

import styled from 'styled-components';
import { getGameData, parseOpenings } from './lichess';
const _ = require('lodash');

const Container = styled.div`
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: 10% 90%;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  background: rgb(245, 245, 245);
  overflow:scroll;
`;

const Navbar = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  border-bottom: 0.5px solid;
  background: white;
`;

const Prompt = styled.div`
  align-self: center;
  justify-self: center;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
`;

const Box = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
`;

const Title = styled.div`
  align-self: center;
  justify-self: center;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
`;

function Openings(props) {
  const shouldDisplay = !_.isUndefined(props.openings);
  let result = [];
  if (shouldDisplay) {
    result.push(
      props.openings.map(opening => (
        <p key={opening.eco}>
          {_.round((100 * opening.count) / props.openings.length, 0)}%{'  '}
          {opening.eco}
        </p>
      ))
    );
  }
  return <Box>{result}</Box>;
}

const gameNumber = 100;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      username: undefined,
      openings: undefined
    };
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.username);
    const gameData = await getGameData(this.state.username, gameNumber);
    const openingData = parseOpenings(gameData);
    console.log(openingData);
    this.setState({ openings: openingData });
    console.log('state', this.state);
  }

  render() {
    return (
      <Container>
        <Navbar />
        <Title>Opening Analyzer</Title>
        <Prompt>
          <form onSubmit={this.handleSubmit}>
            <label>
              Lichess Username:
              <input
                placeholder="drNykterstein"
                type="text"
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Prompt>
        <Openings openings={this.state.openings} />
      </Container>
    );
  }
}

export default App;

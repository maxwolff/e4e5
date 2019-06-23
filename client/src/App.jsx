import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { Navbar } from './components/Navbar';

const Container = styled.div`
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: [site-left] 1fr [left-box] 3fr [right-box] 1fr [site-right];
  grid-template-rows: [navbar-top] 1fr [navbar-bottom] 8fr [content-end] 1fr [footer];
  background: rgb(245, 245, 245);
  overflow: scroll;
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

const Tile = styled.div`
  align-self: center;
  justify-self: center;
  background: white;
  margin: 1em;
  box-shadow: 1px 1px 1px grey;
`;

function Openings(props) {
  const shouldDisplay = !_.isUndefined(props.openings);
  let result = [];
  if (shouldDisplay) {
    result.push(
      props.openings.map(opening => (
        <Tile key={opening.eco}>
          {_.round((100 * opening.count) / props.openings.length, 0)}%{'  '}
          {opening.eco}
        </Tile>
      ))
    );
  }
  return <Box>{result}</Box>;
}

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
    let json;
    try {
      const data = await fetch('/games/'+this.state.username+"black");
      json = await data.json();
      console.log(json);
    } catch (e) {
      console.error('failed to get games', e);
    }
    this.setState({ openings: json });
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

import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import styled from 'styled-components';

import { Navbar } from "./Navbar";
import { ListOpenings } from "./ListOpenings";
import { Landing } from "./Landing";

const Site = styled.div`
  font-family: "Courier New", Courier, monospace;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  background: #F5F5F5;
`;

const App = () => {
    return (
    <Site>
      <Router>
        <Navbar/>
        <Route exact path="/" component= {Landing} />
        <Route path="/:username" component = {ListOpenings} />
      </Router>
    </Site>
   );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import styled from 'styled-components';

import { Footer } from "./Footer"
import { Landing } from "./Landing";
import { ListOpenings } from "./ListOpenings";
import { Navbar } from "./Navbar";

const Site = styled.div`
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: [top] 1fr [navbar-bottom] 8fr [bottom] 1fr [footer]
`;

document.title = 'e4e5.dev'

const App = () => {
    return (

      <Site>
        <Router>
          <Navbar/>
          <Route exact path="/" component= {Landing} />
          <Route path="/:username" component = {ListOpenings} />
          <Footer />
        </Router>
      </Site>

   );
}

export default App;

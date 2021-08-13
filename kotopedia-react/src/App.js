import React, { Component } from 'react';
import './App.css';
import Kotodummies from './models/Kotodummy.js';
import Words from './models/Words.js';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

import { BrowserRouter as Router, Link, Route } from "react-router-dom";

class App extends Component {
  renderNavBar = () => {
    return (
      <Router>
          <Navbar color = "light" light expand = "md">
            <NavbarBrand href = "/">Kotopedia</NavbarBrand>
            <Nav className = "mr-auto" navbar>
              <NavItem>
                <Link to = "/kotodummies">Kotodummies</Link>
              </NavItem>
              <NavItem>
                <Link to = "/words">Words</Link>
              </NavItem>
            </Nav>
          </Navbar>
          <main>
            <Route path = "/kotodummies" component = {Kotodummies}/>
            <Route path = "/words" component = {Words} />
          </main>
      </Router>
    );
  };

  render() {
    return (
      <main>
        {this.renderNavBar()}
      </main>
    );
  }
}

export default App;

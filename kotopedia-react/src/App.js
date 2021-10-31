import React, { Component } from 'react';
import './App.css';
import Kotodummies from './components/Kotodummy.js';
import Words from './components/Words.js';
import Landing, { About } from './components/Landing.js';
import {
  Navbar,
  Nav,
  NavItem,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

export default class App extends Component {

  render() {
    return (
      <main>
        <TopBar/>
      </main>
    );
  }
}

const TopBar = () => {
  return (
    <Router>
        <Navbar className = "sticky-top" color = "light" expand = "sm">
          <div class = "nav-logo-link">
            <Link to = "/">
              <img href = "/" class = "nav-logo" src = "img/doughie_logo.svg" alt = "Kotopedia"/>
            </Link>
          </div>
          <Nav className = "mr-auto" navbar>
            <NavItem>
              <Link to = "/kotodummies">Kotodummies</Link>
            </NavItem>
            <NavItem>
              <Link to = "/words">Words</Link>
            </NavItem>
            <NavItem>
              <Link to = "/about">About</Link>
            </NavItem>
          </Nav>
        </Navbar>
        <main>
          <Switch>
            <Route path = "/" exact component = {Landing}/>
            <Route path = "/kotodummies" component = {Kotodummies}/>
            <Route path = "/words" component = {Words} />
            <Route path = "/about" component = {About} />
          </Switch>
        </main>
    </Router>
  );
};

export const Search = (props) => {
  return (
    <div class = "search-field">
      <InputGroup>
        <InputGroupAddon addonType = "prepend">
          <InputGroupText><i class = "bi bi-search"></i></InputGroupText>
        </InputGroupAddon>
        <Input placeholder = {props.placeholder} class = "search-field" name = "query" type = "text" value = {props.value} onChange = {props.onChange}/>
      </InputGroup>
    </div>
  )
}

export function renderPersonalities(personality) {
  const path = "img/" + personality + ".png";
  return <img class = "personality" src = {path} alt = {personality}/>
}
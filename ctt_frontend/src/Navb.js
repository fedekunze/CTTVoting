import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Home from './Home';
import {Link, Route, BrowserRouter as Router, withRouter} from 'react-router-dom';
import RouterNavItem from './NavItemWithoutRouter';
import './App.css';

class Navb extends React.Component {

  render() {
    return (
        <Router>
          <Navbar inverse collapseOnSelect className="navbar">
            <Navbar.Header className="nav">
                <Navbar.Brand className="nav">
                  <a href="/">CTT</a>
                </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse className="nav">
              <Nav className="nav">
                <LinkContainer to='/vote'>
                  <NavItem eventKey={1} href='/vote' >Vote</NavItem>
                </LinkContainer>
                <LinkContainer to='/results'>
                  <NavItem eventKey={2} href='/results'>Results</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Router>
    );
  }
}

export default Navb;

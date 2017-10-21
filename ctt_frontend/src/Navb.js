import React, { Component } from 'react';
import Form from './Form';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Image, FormGroup, FormControl, Button} from 'react-bootstrap';
import './App.css';

class Navb extends React.Component {

  render() {
    return (
      <Navbar inverse collapseOnSelect className="navbar">
        <Navbar.Header className="nav">
          <Navbar.Brand className="nav">
            <a href="#">Logo</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse className="nav">
          <Nav className="nav">
            <NavItem eventKey={1} href="#">Link</NavItem>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
              </FormGroup>
              {' '}
              <Button type="submit">Submit</Button>
            </Navbar.Form>
          </Nav>
          <Nav pullRight className="nav">
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Upload Unit</MenuItem>
              <MenuItem eventKey={3.2}>Check Offers</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>My Address</MenuItem>
            </NavDropdown>
            <NavItem eventKey={2} href="#">Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navb;

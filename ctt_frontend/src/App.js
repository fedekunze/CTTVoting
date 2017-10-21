import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import Navb from './Navb';
import Footer from './Footer';
import { Router, Route, Switch } from 'react-router'
import {Button, Jumbotron } from 'react-bootstrap';
import {Grid, Row, Col, Image, Thumbnail, Modal, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navb/>
        <Jumbotron className="banner">
          <Grid>
            <h1>CTT voting</h1>
            <p>Redefining corporate Governance</p>
          </Grid>
        </Jumbotron>
        <Footer/>
      </div>
    );
  }
}

export default App;

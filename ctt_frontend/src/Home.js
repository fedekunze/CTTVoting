import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';
import {Button, Jumbotron } from 'react-bootstrap';
import {Grid, Row, Col, Image, Thumbnail, Modal, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class Home extends React.Component {

  render() {
    return (
      <div>
        <Jumbotron className="banner">
          <Grid>
            <h1>CTT voting</h1>
            <p>Redefining corporate Governance</p>
          </Grid>
        </Jumbotron>
      </div>
    );
  }

}
export default Home;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Table, thead, tbody, Jumbotron} from 'react-bootstrap';
import './App.css';

class Results extends React.Component {
  // Photo by Edwin Andrade on Unsplash
  render() {
    return (
      <div>
        <Jumbotron className="banner-results">
        </Jumbotron>
        <Grid>
          <h2>This is a Results page!</h2>
        </Grid>
      </div>
    );
  }

}
export default Results;

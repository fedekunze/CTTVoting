import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Table, Form, FormControl, Button, thead, tbody, Jumbotron} from 'react-bootstrap';
import './App.css';

class Results extends React.Component {
  // Photo by Edwin Andrade on Unsplash

  constructor(props) {
    super(props);
    this.state = {
      totalShares :0
    }
  }

  submitSecret() {
    this.setState({secret: this.state.newSecret})
  }


  render() {
    return (
      <div>
        <Jumbotron className="banner-results">
        </Jumbotron>
        <Grid>
          <Row>
            <Col xs={12} md={12}>
              <h2>Results</h2>
              <br/>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Total Shares</th>
                  <th>Percent</th>
                  <th>Final Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.options[0]['name']}</td>
                  <td>{this.state.options[0]['shares']}</td>
                  <td>{this.state.options[0]['shares']*100/this.state.totalShares} %</td>
                  <td>{this.state.options[0]['shares'] > this.state.options[1]['shares'] ? 'Selected' : 'Unselected'} %</td>
                </tr>
                <tr>
                  <td>{this.state.options[1]['name']}</td>
                  <td>{this.state.options[1]['shares']}</td>
                  <td>{this.state.options[1]['shares']*100/this.state.totalShares} %</td>
                  <td>{this.state.options[0]['shares'] < this.state.options[1]['shares'] ? 'Selected' : 'Unselected'} %</td>
                </tr>
                <tr>
                  <td colspan="3" className="total-shares">{this.state.totalShares}</td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Grid>

      </div>
    );
  }

}
export default Results;

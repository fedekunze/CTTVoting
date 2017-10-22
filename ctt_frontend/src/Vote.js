import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CountdownClock from './CountdownClock';
import {Grid, Row, Col, Modal, Form, FormGroup, Button, FormControl,
  ControlLabel, Table, thead, tbody, Checkbox, Jumbotron} from 'react-bootstrap';
import './App.css';

class Vote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      totalShares: 0,
      deadline: undefined,
      newDeadline: undefined,
      options: [
        {
          'name': 'Opt 1',
          'shares': 0
        },
        {
          'name': 'Opt 2 ',
          'shares': 0
        }]
    }
  }

  changeOption(index, newValue) {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.options = stateCopy.options.slice();
    stateCopy.options[index] = Object.assign({}, stateCopy.options[index]);
    stateCopy.options[index].shares = newValue;
    this.setState(stateCopy);
    this.setState({totalShares: this.state.totalShares + newValue});
  }

  changeDeadline() {
    const present = new Date();
    if (Date.parse(this.state.newDeadline) > Date.parse(present)) {
      this.setState({deadline: this.state.newDeadline});
    }
    // Update frontend
  }

  onToggle() {
  // check if checkbox is checked
    var secretInput = document.getElementById('secret-input');
    if (document.getElementsByClassName('checkbox').checked) {
      secretInput.type = 'text';
    } else {
      secretInput.type = 'password';
    }
  }

  showModal = () => {
  this.setState({
    show: true,
  })
}
// Photo by Arnaud Jaegers on Unsplash
  render() {

    let close = () => this.setState({ show: false });
    var count = 0;

    const opts = Object.keys(this.state.options).map((name, i) => (
      <Col xs={12} md={6} className="voting-options" controlId={"option-"+ i.toString()}>
          <h4>{this.state.options[i]['name']}</h4>
          <ControlLabel>Amount: </ControlLabel>
          <FormGroup controlId={"formOptions-"+ i.toString()}>
            <FormControl
              type="number"
              placeholder=" "
              // onChange={this.changeOption(i, document.getElementById("formOptions-"+ i.toString()).value)}
            />
            <FormControl.Feedback />
          </FormGroup>
      </Col>
    ))

    return (
      <div>
        <Jumbotron className="banner-vote">
        </Jumbotron>
        <Grid>
          <Grid>
            <Row className="row">
              <Col xs={12} md={12}>
                <h1>Vote</h1>
                <p>You have until {this.state.deadline} to vote</p>
              </Col>
            </Row>
            <Row className="row">
              <CountdownClock
                deadline={this.state.deadline}
              />
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <Form inline>
                  <FormControl
                    className="deadline-input"
                    placeholder="New Date"
                    type= 'datetime-local'
                    onChange={event => this.setState({newDeadline: event.target.value})}
                  >
                  </FormControl>
                  <Button onClick={() => this.changeDeadline()}>Submit</Button>
                </Form>
              </Col>
            </Row>
          </Grid>
          <hr/>
          <Grid>


            <Row className="row">
                {opts}
            </Row>
          </Grid>
          <hr/>
          <Grid>
            <Row>
              <Col xs={12} md={12}>
                <h3>Shares staked</h3>
              </Col>
            </Row>
            <Row>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>Shares</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.options[0]['name']}</td>
                    <td>{this.state.options[0]['shares']}</td>
                  </tr>
                  <tr>
                    <td>{this.state.options[1]['name']}</td>
                    <td>{this.state.options[1]['shares']}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="total-shares">{this.state.totalShares}</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Grid>
          <hr/>
          <Grid>
            <Row className="row">
              <Col xs={1} md={4}></Col>
              <Col xs={4} md={4}>
                <Button bsStyle="primary"
                      bsSize="large"
                      onClick={() => this.setState({ show: true})}
                      type="submit" block>
                  Submit
                </Button>
              </Col>
              <Col xs={1} md={4}></Col>
            </Row>
          </Grid>
        </Grid>
        <Modal
            show={this.state.show}
            onHide={close}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Summary of your vote</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
              <p>Shares: X </p>
              <p>Shares bet: X </p>
              <p>Total Shares Left: </p>
              <br/>
              <FormGroup controlId="secret-input">
                <ControlLabel>Secret Key</ControlLabel>
                <FormControl
                  type="password"
                  label="Secret key"
                  data-toggle="password"
                  placeholder="Enter your secret"
                />
                <FormControl.Feedback />
              </FormGroup>
              <Checkbox className="modal-checkbox" onClick={this.onToggle}>
                  Show secret
              </Checkbox>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} bsStyle="danger">Cancel</Button>
                <Button type="submit" bsStyle="success">
                  Vote
                </Button>
            </Modal.Footer>
          </Modal>
      </div>
    );
  }

}
export default Vote;

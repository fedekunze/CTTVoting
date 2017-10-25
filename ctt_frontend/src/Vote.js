import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CountdownClock from './CountdownClock';
import {Grid, Row, Col, Modal, Alert, Form, FormGroup, Button, FormControl,
  ControlLabel, Table, thead, tbody, Checkbox, Jumbotron, Collapse, Well} from 'react-bootstrap';
  import {votingMechContract, accounts, web3} from './EthereumSetup';
import './App.css';

class Vote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openCollapse: false,
      show: false,
      showPassword: false,
      totalShares: 0,
      secret: '',
      inputSecret: '',
      totalOptions: 2,
      options: [
        {
          'name': 'Opt 1',
          'shares': 0
        },
        {
          'name': 'Opt 2 ',
          'shares': 0
        }],
      expensesOptions: [0, 0]
    }
    this.onToggle = this.onToggle.bind(this);
    this.changeSecret = this.changeSecret.bind(this);
    this.handleSubmitVote = this.handleSubmitVote.bind(this);
  }

  onToggle() {
  // check if checkbox is checked
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleSubmitVote() {
    let opt_array = this.state.options.slice();
    var total_sum = 0;
    for (var i = 0; i < this.state.totalOptions; i++) {
      opt_array[i]['shares'] = this.state.expensesOptions[i];
      total_sum += parseInt(this.state.options[i]['shares'])
    }
    this.setState({
      options: opt_array,
      totalShares: total_sum,
      show: true
    });
  }

  getTotalShares(){
    var sum = 0;
    for (var i = 0; i < this.state.totalOptions; i++) {
      sum = (sum + parseInt(this.state.options[i]['shares']));
    }
    return sum;
  }

  changeSecret(event) {
    this.setState({inputSecret: event.target.value});
  }

  handleVote() {

    if (this.state.inputSecret !== '') {
      this.setState({secret: this.state.inputSecret});
    }

    var input = votingMechContract.sha3Helper(this.state.secret, [1,2] , {from: accounts[1], gas: 4000000}, function(error, result) {
      if (error) {
        console.log('Error: ' + error);
      } else {
        console.log('Result: ' + result);
      }
    });
    console.log(input);
    votingMechContract.vote(input, {from: accounts[0], gas: 4000000}, function(error, result) {
      if (error) {
        console.log('Error: ' + error);
      } else {
        console.log('Result: ' + result);
      }
    })
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
      <Col xs={12} md={6} className="voting-options" ref={"option"+ i.toString()}>
          <h4>{this.state.options[i]['name']}</h4>
          <ControlLabel>Amount: </ControlLabel>
          <FormGroup ref={"formOptions"+ i.toString()}>
            <FormControl
              type="number"
              placeholder=""
              onChange={(event) => {
                let expensesOptionsArray = this.state.expensesOptions.slice();
                expensesOptionsArray[i] = event.target.value;
                this.setState({
                  expensesOptions: expensesOptionsArray,
                });
              }
            }
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
              </Col>
            </Row>
            <Row className="row">
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
          </Grid>
          <hr/>
          <Grid>
            <Row className="row">
              <Col xs={1} md={4}></Col>
              <Col xs={4} md={4}>
                <Button bsStyle="primary"
                      bsSize="large"
                      onClick={this.handleSubmitVote}
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
                  <tr className="total-shares">
                    <td><b>Total Shares</b></td>
                    <td>{this.state.totalShares}</td>
                  </tr>
                </tbody>
              </Table>
              <FormGroup>
                <ControlLabel>Secret Key</ControlLabel>
                <FormControl
                  type={!this.state.showPassword ? "password" : "text"}
                  label="Secret key"
                  data-toggle="password"
                  ref="secretInput"
                  placeholder="Enter your secret"
                  onChange={this.changeSecret}
                />
                <FormControl.Feedback />
              </FormGroup>
              <Checkbox ref="modalCheckbox" onClick={this.onToggle}>
                  Show secret
              </Checkbox>
              <Alert bsStyle="warning" onDismiss={this.handleAlertDismiss}>
                <p>Save your secret securely. You will need it to reveal your vote afterwards.</p>
              </Alert>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} bsStyle="danger">Cancel</Button>
                <Button type="submit" bsStyle="success" onClick={this.handleVote}>
                  Vote
                </Button>
            </Modal.Footer>
          </Modal>
      </div>
    );
  }

}
export default Vote;

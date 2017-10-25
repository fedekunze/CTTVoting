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
    this.onToggle = this.onToggle.bind(this);
    this.changeOption = this.changeOption.bind(this);
    this.pushOption = this.pushOption.bind(this);
    this.handleSubmitVote = this.handleSubmitVote.bind(this);
  }

  changeOption(index, newValue) {
      if (newValue > 0) {
        console.log(newValue);
        const options = this.state.options.slice();
        options[index]['shares'] = newValue;
        this.setState({
          options: options,
          totalShares: this.state.totalShares + newValue
        });
      }
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

    var secretInput = ReactDOM.findDOMNode(this.refs.secretInput);
    alert(secretInput.value);
    if (ReactDOM.findDOMNode(this.refs.modalCheckbox.checked)) {
      secretInput.type = 'text';
    } else {
      secretInput.type = 'password';
    }
  }

  handleSubmitVote() {
    this.setState({show: true});
    this.changeOption(0, ReactDOM.findDOMNode(this.refs.formOptions0.value));
    this.changeOption(1, ReactDOM.findDOMNode(this.refs.formOptions1.value));

  }

  handleVote() {
    // var Voted;
    // Voted = votingMechContract.Voted({from: accounts[0]});
    // Voted.watch(function(err, result) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(result);
    //   }
    // })
    var input = votingMechContract.sha3Helper("0x0001", [1,2] , {from: accounts[1], gas: 4000000}, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });

    console.log(input);

    votingMechContract.vote(input, {from: accounts[0], gas: 4000000}, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    })
  }

  pushOption(reference) {
    console.log('push new option');
    let newOpt = this.state.options.slice(); //copy the array
    newOpt.push({'name': reference.text, 'shares': 0}); //execute the manipulations
    this.setState({options: newOpt}); //set the new state
    alert(this.state.options.length);
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
              placeholder=" "
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

              <p>Shares: 100 </p>
              <p>Shares bet: {this.state.totalShares} </p>
              <p>Total Shares Left: {100-this.state.totalShares} </p>
              <Button onClick={ ()=> this.setState({ openCollapse: !this.state.openCollapse })}>
                See Details
              </Button>
              <Collapse in={this.state.openCollapse}>
                <div>
                  <Well>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                    Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                  </Well>
                </div>
              </Collapse>
              <br/>
              <FormGroup >
                <ControlLabel>Secret Key</ControlLabel>
                <FormControl
                  type="password"
                  label="Secret key"
                  data-toggle="password"
                  ref="secretInput"
                  placeholder="Enter your secret"
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

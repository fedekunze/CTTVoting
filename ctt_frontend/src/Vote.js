import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CountdownClock from './CountdownClock';
import {Grid, Row, Col, Modal, FormGroup, Button, FormControl,
  ControlLabel, Table, thead, tbody, Checkbox, Jumbotron} from 'react-bootstrap';
import './App.css';

class Vote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      deadline: 'Tomorrow'
    }
  }

  showModal = () => {
  this.setState({
    show: true
    // unit_id: this._reactInternalInstance._currentElement._owner.getAttribute("id")
  })
}
// Photo by Arnaud Jaegers on Unsplash
  render() {

    let close = () => this.setState({ show: false });
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
              <CountdownClock/>
            </Row>
          </Grid>
          <hr/>
          <Grid>
            <Row className="row">
                <Col xs={12} md={6} className="voting-options">
                    <h4>Option 1</h4>
                    <ControlLabel>Amount: </ControlLabel>
                    <FormGroup controlId="formBasicText">
                      <FormControl
                        type="number"
                        placeholder=" "
                        onChange={this.handleChange}
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                </Col>
                <Col xs={12} md={6} className="voting-options">
                  <h4>Option 2</h4>
                  <ControlLabel>Amount: </ControlLabel>
                  <FormGroup controlId="formBasicText">
                    <FormControl
                      type="number"
                      placeholder=" "
                      onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </Col>
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
                    <td>Option 1</td>
                    <td>32</td>
                  </tr>
                  <tr>
                    <td>Option 2</td>
                    <td>21</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="total-shares">53</td>
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
              <FormGroup controlId="formBasicText">
                <ControlLabel>Secret Key</ControlLabel>
                <FormControl
                  type="password"
                  label="Secret key"
                  data-toggle="password"
                  placeholder="Enter your secret"
                />
                <FormControl.Feedback />
              </FormGroup>
              <Checkbox inputRef={ref => { this.input = ref; }}>
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

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Form, FormGroup, Button, FormControl,
  ControlLabel, Checkbox, Fade, Well} from 'react-bootstrap';

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  addOptions() {
    var newOption = document.createElement('div');
    newOption.classList.add('form-group');
    var formLabel = document.createElement('label');
    formLabel.classList.add('col-sm-2');
    formLabel.classList.add('control-label');
    formLabel.innerText = 'Option';
    var divInput = document.createElement('div');
    divInput.classList.add('col-sm-10');
    var inputForm = document.createElement('input');
    inputForm.type = 'text';
    inputForm.placeholder = 'Enter the new option name';
    inputForm.style.cssText = "width: 100%; padding: 6px 12px; height: 34px; border-radius: 4px; boder: 1px solid #ccc; box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);";
    divInput.appendChild(inputForm);
    newOption.appendChild(formLabel);
    newOption.appendChild(divInput);
    document.getElementById('newForm').appendChild(newOption);
  }

  render() {
    return (
      <Grid>
        <br/><br/><br/>
        <Button onClick={()=> this.setState({ open: !this.state.open })}>
          Create Poll
        </Button>
        <Fade in={this.state.open}>
          <div>
            <Well>
            <Form horizontal>
              <div id="newForm" controlId="newForm">
                <FormGroup controlId="formHorizontalQuestion">
                  <Col componentClass={ControlLabel} sm={2}>
                    Question
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Enter a question" />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalStartDateVote">
                  <Col componentClass={ControlLabel} sm={2}>
                    Start DateTime Vote
                  </Col>
                  <Col sm={10}>
                    <FormControl type="datetime-local" />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEndDateVote">
                  <Col componentClass={ControlLabel} sm={2}>
                    End DateTime Vote
                  </Col>
                  <Col sm={10}>
                    <FormControl type="datetime-local" />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalStartDateReveal">
                  <Col componentClass={ControlLabel} sm={2}>
                    Start DateTime Reveal
                  </Col>
                  <Col sm={10}>
                    <FormControl type="datetime-local" />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEndDateReveal">
                  <Col componentClass={ControlLabel} sm={2}>
                    End DateTime Reveal
                  </Col>
                  <Col sm={10}>
                    <FormControl type="datetime-local" />
                  </Col>
                </FormGroup>
              </div>
              <FormGroup>
                <Col sm={12}>
                  <Button type="button" onClick={this.addOptions}>
                    Add Option
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={12}>
                  <Button type="submit">
                    Create
                  </Button>
                </Col>
              </FormGroup>
            </Form>
            </Well>
          </div>
        </Fade>
      </Grid>
    );
  }

}
export default Admin;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Form, FormGroup, Button, FormControl,
  ControlLabel, Checkbox, Fade, Well} from 'react-bootstrap';
import ReactFileReader from 'react-file-reader';

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      totalOptions : 2,
      open: false,
      question: "",
      newQuestion: "",
      start_votation: undefined,
      new_start_votation: undefined,
      end_votation: undefined,
      new_end_votation: undefined,
      start_reveal: undefined,
      new_start_reveal: undefined,
      end_votation: undefined,
      new_end_reveal: undefined,
      options: [
      {
        'name': '',
        'shares': 0
      },
      {
        'name': '',
        'shares': 0
      }],
      newOptions: ['', '']
    }
    this.addOptions = this.addOptions.bind(this);
    this.pushOption = this.pushOption.bind(this);
  }

  pushOption(reference) {
    let newOpt = this.state.options.slice(); //copy the array
    newOpt.push({'name': reference.text, 'shares': 0}); //execute the manipulations
    this.setState({options: newOpt}); //set the new state
  }

  handlePollCreation() {
    const present = new Date();
    if ((Date.parse(this.state.start_votation) >= Date.parse(present)) &&
    (Date.parse(this.state.end_votation) > Date.parse(this.state.start_votation)) &&
    (Date.parse(this.state.start_reveal) > Date.parse(this.state.end_votation)) &&
    (Date.parse(this.state.end_reveal) > Date.parse(this.state.start_reveal))
   ) {
      this.setState({
        question: this.state.newQuestion,
        start_votation: this.state.new_start_votation,
        start_reveal: this.state.new_start_reveal,
        end_votation: this.state.new_end_votation,
        end_reveal: this.state.new_end_reveal,
      });
      this.renderPoll();
      Object.keys(this.refs).forEach(index => this.pushOption(this.refs[index]))

      // push all options to the array: initialize with option.share = 0 & name
    }
    else {
      alert('NO POLL');
    }

  }

  handleFiles = files => {
    var reader = new window.FileReader();
    reader.onload = function(e) {
    // Use reader.result
    alert(reader.result)
    }
    reader.readAsText(files[0]);
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
    inputForm.setAttribute("id", "inputOption"+this.state.totalOptions.toString());
    inputForm.setAttribute("ref", "Option"+this.state.totalOptions.toString());
    inputForm.placeholder = 'Enter the new option name';
    inputForm.style.cssText = "width: 100%; padding: 6px 12px; height: 34px; border-radius: 4px; boder: 1px solid #ccc; box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);";

    let newOptionsArray = this.state.newOptions.slice();
    newOptionsArray.push(''); //execute the manipulations
    this.setState({
      newOptions: newOptionsArray,
      totalOptions: this.state.totalOptions + 1
    }); //set the new state

    inputForm.addEventListener('onchange', function(e){
      let newOptionsArray = this.state.newOptions.slice();
      newOptionsArray[this.state.totalOptions] = e.target.value;
      this.setState({newOptions: newOptionsArray});
    }, false);
    divInput.appendChild(inputForm);
    newOption.appendChild(formLabel);
    newOption.appendChild(divInput);
    document.getElementById('newForm').appendChild(newOption);
  }

  renderPoll() {
    var newPoll = document.createElement('div');
    var subtitle = document.createElement('h2');
    subtitle.innerText = "Current Polls";
    var question = document.createElement('p');
    var start_votation = document.createElement('p');
    start_votation.innerText = this.state.start_votation;
    var end_votation = document.createElement('p');
    end_votation.innerText = this.state.end_votation;
    var start_reveal = document.createElement('p');
    start_reveal.innerText = this.state.start_reveal;
    var end_reveal = document.createElement('p');
    end_votation.innerText = this.state.end_votation;
    newPoll.appendChild(subtitle);
    newPoll.appendChild(question);
    newPoll.appendChild(start_votation);
    newPoll.appendChild(end_votation);
    newPoll.appendChild(start_reveal);
    newPoll.appendChild(end_reveal);
    document.getElementById('renderPoll').appendChild(newPoll);
  }

  render() {
    return (
    <Grid>
      <Grid>
        <br/><br/><br/>
            <Form horizontal>
              <div id="newForm" controlId="newForm">
                <FormGroup controlId="formHorizontalQuestion">
                  <Col componentClass={ControlLabel} sm={2}>
                    Question
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      type="text"
                      placeholder="Enter a question"
                      onChange={event => this.setState({newQuestion: event.target.value})}/>
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalStartDateVote">
                  <Col componentClass={ControlLabel} sm={2}>
                    Start DateTime Vote
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      type="datetime-local"
                      onChange={event => this.setState({new_start_votation: event.target.value})} />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEndDateVote">
                  <Col componentClass={ControlLabel} sm={2}>
                    End DateTime Vote
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      type="datetime-local"
                      onChange={event => this.setState({new_end_votation: event.target.value})} />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalStartDateReveal">
                  <Col componentClass={ControlLabel} sm={2}>
                    Start DateTime Reveal
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      type="datetime-local"
                      onChange={event => this.setState({new_start_reveal: event.target.value})}/>
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEndDateReveal">
                  <Col componentClass={ControlLabel} sm={2}>
                    End DateTime Reveal
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      type="datetime-local"
                      onChange={event => this.setState({new_end_reveal: event.target.value})} />
                  </Col>
                </FormGroup>
                <FormGroup controlId="Option0">
                  <Col componentClass={ControlLabel} sm={2}>
                    Option
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      type="text"
                      placeholder="Enter the new option name"
                      // onChange={event => this.setState({newOptions[0]: event.target.value})}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="Option1">
                  <Col componentClass={ControlLabel} sm={2}>
                    Option
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      type="text"
                      placeholder="Enter the new option name"
                      // onChange={event => this.setState({newOptions[1]: event.target.value})}
                      />
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
                  <Button type="submit" onClick={this.handlePollCreation}>
                    Create
                  </Button>
                </Col>
              </FormGroup>
            </Form>
            <br/>
            <h3>Upload csv for shareholder ratio</h3>
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
              <Button className='button'>Upload csv</Button>
            </ReactFileReader>
      </Grid>
      <Grid>
        <Row>
          <div controlId="renderPoll">
          </div>
        </Row>
      </Grid>
    </Grid>
    );
  }

}
export default Admin;

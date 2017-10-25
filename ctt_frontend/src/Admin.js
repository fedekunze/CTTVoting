import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Form, FormGroup, Button, FormControl,
  ControlLabel, Checkbox, Fade, Well} from 'react-bootstrap';
import ReactFileReader from 'react-file-reader';
import {superVotingContract, tokenContract, votingMechContract, accounts, web3} from './EthereumSetup';


class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      totalOptions : 2,
      open: false,
      pollInit: false,
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
      options: [{
        'name': '',
        'shares': 0
      },
      {
        'name': '',
        'shares': 0
      }
      ],
      newOptions: [
        '',
        ''
      ]
    }
    this.addOptions = this.addOptions.bind(this);
    this.handlePollCreation = this.handlePollCreation.bind(this);
    this.renderPoll = this.renderPoll.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeOpt0 = this.onChangeOpt0.bind(this);
    this.onChangeOpt1 = this.onChangeOpt1.bind(this);
  }



  handleQuestion() {
    votingMechContract.newVotingSession("Question 1. dfsa  2.fdalsj", 2, 4, {from: accounts[0], gas: 4000000}, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    })
    var returnedQ = votingMechContract.getQuestion({from: accounts[0], gas: 4000000}, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    })
    console.log(returnedQ)
  }

  handlePollCreation() {
    console.log('handle poll creation');
    const present = new Date();
    console.log(this.state.new_start_votation.toString());
    console.log(this.state.new_end_votation.toString());
    console.log(this.state.new_start_reveal.toString());
    console.log(this.state.new_end_reveal.toString());
    if ((Date.parse(this.state.new_start_votation) >= Date.parse(present)) &&
    (Date.parse(this.state.new_end_votation) > Date.parse(this.state.new_start_votation)) &&
    (Date.parse(this.state.new_start_reveal) > Date.parse(this.state.new_end_votation)) &&
    (Date.parse(this.state.new_end_reveal) > Date.parse(this.state.new_start_reveal))
   ) {
      console.log('Setting up new state');
      this.setState({
        question: this.state.newQuestion,
        start_votation: this.state.new_start_votation,
        start_reveal: this.state.new_start_reveal,
        end_votation: this.state.new_end_votation,
        end_reveal: this.state.new_end_reveal,
        pollInit: true,
      });
      console.log('Call to render Poll');
      // this.renderPoll();
      console.log('iteration to refs');
      Object.keys(this.refs).forEach(index => this.pushOption(this.refs[index]))
      console.log('Poll Created !');
      // push all options to the array: initialize with option.share = 0 & name
    }
    else {
      alert('NO POLL');
    }
  }

  onChangeQuestion(event) {
    console.log('onChangeQuestion');
    this.setState({newQuestion: event.target.value});
  }

  onChangeOpt0(event) {
    console.log('onChangeOpt0');
    let newOptionsArray = this.state.newOptions.slice();
    newOptionsArray[0] = event.target.value;
    this.setState({newOptions: newOptionsArray});
  }

  onChangeOpt1(event) {
    console.log('OnChangeOpt1');
    let newOptionsArray = this.state.newOptions.slice();
    newOptionsArray[1] = event.target.value;
    this.setState({newOptions: newOptionsArray});
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
    console.log('Prev # of options:'+this.state.totalOptions.toString());
    this.setState({totalOptions: this.state.totalOptions + 1})
    console.log('New option added');
    var newOption = document.createElement('div');
    newOption.classList.add('form-group');
    var formLabel = document.createElement('label');
    formLabel.classList.add('col-sm-2');
    formLabel.classList.add('control-label');
    formLabel.innerText = 'Option ' + this.state.totalOptions.toString();
    var divInput = document.createElement('div');
    divInput.classList.add('col-sm-10');
    var inputForm = document.createElement('input');
    inputForm.type = 'text';
    inputForm.setAttribute("id", "inputOption"+this.state.totalOptions.toString());
    inputForm.setAttribute("ref", "Option"+this.state.totalOptions.toString());
    inputForm.placeholder = 'Enter the new option name';
    inputForm.style.cssText = "width: 100%; padding: 6px 12px; height: 34px; border-radius: 4px; boder: 1px solid #ccc; box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);";
    console.log('Copying new_opt state');
    let newOptionsArray = this.state.newOptions.slice();
    newOptionsArray.push(''); //execute the manipulations
    this.setState({
      newOptions: newOptionsArray,
    }); //set the new state
    console.log('Adding Listener');
    inputForm.addEventListener('onchange', function(event){
      let newOptionsArray = this.state.newOptions.slice();
      newOptionsArray[this.state.totalOptions] = event.target.value;
      this.setState({newOptions: newOptionsArray});
    }, false);
    divInput.appendChild(inputForm);
    newOption.appendChild(formLabel);
    newOption.appendChild(divInput);
    document.getElementById('newForm').appendChild(newOption);
    console.log('All childs appended new option');
  }

  renderPoll() {
    console.log('Rendering new Poll');
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
    console.log('Appending Childs in render');
    newPoll.appendChild(subtitle);
    newPoll.appendChild(question);
    newPoll.appendChild(start_votation);
    newPoll.appendChild(end_votation);
    newPoll.appendChild(start_reveal);
    newPoll.appendChild(end_reveal);
    console.log('Appended all childs render');
    document.getElementById('renderPoll').appendChild(newPoll);
    console.log('Appended new poll elements');
  }

  render() {

    return (
      <div>
        <Grid>
          <br/><br/><br/>
          <div>
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
                    onChange={this.onChangeQuestion}/>
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalStartDateVote">
                  <Col componentClass={ControlLabel} sm={2}>
                    Start DateTime Vote
                  </Col>
                  <Col sm={10}>
                    <FormControl
                    type="datetime-local"
                    onChange={event => this.setState({new_start_votation: event.target.value})}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEndDateVote">
                  <Col componentClass={ControlLabel} sm={2}>
                    End DateTime Vote
                  </Col>
                  <Col sm={10}>
                    <FormControl
                    type="datetime-local"
                    onChange={event => this.setState({new_end_votation: event.target.value})}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalStartDateReveal">
                  <Col componentClass={ControlLabel} sm={2}>
                    Start DateTime Reveal
                  </Col>
                  <Col sm={10}>
                    <FormControl
                    type="datetime-local"
                    onChange={event => this.setState({new_start_reveal: event.target.value})}
                     />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEndDateReveal">
                  <Col componentClass={ControlLabel} sm={2}>
                    End DateTime Reveal
                  </Col>
                  <Col sm={10}>
                    <FormControl
                    type="datetime-local"
                    onChange={event => this.setState({new_end_reveal: event.target.value})}
                     />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formOption0">
                  <Col componentClass={ControlLabel} sm={2}>
                    Option 1
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text"
                    placeholder="Enter the new option name"
                    onChange={this.onChangeOpt0}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formOption1">
                  <Col componentClass={ControlLabel} sm={2}>
                    Option 2
                  </Col>
                  <Col sm={10}>
                    <FormControl
                    type="text"
                    placeholder="Enter the new option name"
                    onChange={this.onChangeOpt1}
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
          </div>
        </Grid>
        <Grid>
          <Row>
            <div id="renderPoll" controlId="renderPoll">
            {this.state.pollInit? (
              <Col xs={12} md={12}>
                <h2>{this.state.question}</h2>
                <p>{this.state.start_votation}</p>
                <p>{this.state.end_votation}</p>
                <p>{this.state.start_reveal}</p>
                <p>{this.state.end_reveal}</p>
              </Col>) : (
                <Col xs={12} md={12}>
                  <h2>No current Polls</h2>
                </Col>
              )
            }
            </div>
          </Row>
        </Grid>
    </div>
    );
  }

}
export default Admin;

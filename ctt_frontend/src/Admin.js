import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Form, FormGroup, Button, FormControl,
  ControlLabel} from 'react-bootstrap';
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
      phase: undefined,
      newPhase: undefined,
      // start_votation: undefined,
      // new_start_votation: undefined,
      // end_votation: undefined,
      // new_end_votation: undefined,
      // start_reveal: undefined,
      // new_start_reveal: undefined,
      // end_votation: undefined,
      // new_end_reveal: undefined,
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
    this.pushOption = this.pushOption.bind(this);
    this.renderPoll = this.renderPoll.bind(this);
    this.onChangePhase = this.onChangePhase.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeOpt0 = this.onChangeOpt0.bind(this);
    this.onChangeOpt1 = this.onChangeOpt1.bind(this);
  }



  handleQuestion() {
    console.log('Account:'+ accounts[0]);
    console.log('newVotingSession');
    votingMechContract.newVotingSession(this.state.question, this.state.totalOptions, 4, {from: accounts[0], gas: 4000000}, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    })
    console.log('getQuestion');
    var returnedQ = votingMechContract.getQuestion({from: accounts[0], gas: 4000000}, function(error, result) {
      if (error) {
        console.log('whoops: ' + error);
      } else {
        returnedQ = result;
        console.log(result);
      }
    })
    console.log('Done handleQuestion');
    console.log('retuned Q:' + returnedQ)
  }

  pushOption(reference_value) {
    console.log('push new option');
    let newOpt = this.state.options.slice(); //copy the array
    newOpt.push({'name': reference_value, 'shares': 0}); //execute the manipulations
    this.setState({options: newOpt}); //set the new state
    console.log('--> Pushing Done');
  }

  handlePollCreation() {
    console.log('handle poll creation');
    // const present = new Date();
    console.log(this.state.newQuestion);
    console.log(this.state.newPhase.toString());
    console.log(this.state.newOptions[0]);
    console.log(this.state.newOptions[1]);
    if ((typeof this.state.newQuestion !== undefined) && (typeof this.state.newPhase !== undefined) &&
      (this.state.newOptions[0] !== '') && (this.state.newOptions[1] !== '')) {
  //   if ((Date.parse(this.state.new_start_votation) >= Date.parse(present)) &&
  //   (Date.parse(this.state.new_end_votation) > Date.parse(this.state.new_start_votation)) &&
  //   (Date.parse(this.state.new_start_reveal) > Date.parse(this.state.new_end_votation)) &&
  //   (Date.parse(this.state.new_end_reveal) > Date.parse(this.state.new_start_reveal))
  //  ) {
      console.log('Setting up new state');
      this.setState({
        question: this.state.newQuestion,
        phase: this.state.newPhase,
        pollInit: true,
        // start_votation: this.state.new_start_votation,
        // start_reveal: this.state.new_start_reveal,
        // end_votation: this.state.new_end_votation,
        // end_reveal: this.state.new_end_reveal,
      });
      console.log('Call to render Poll');
      // this.renderPoll();
      const values = {}
      console.log('iteration to refs');
      Object.keys(this.refs)
          .filter(key => key.substr(0,this.state.totalOptions) === 'name')
          .forEach(key => {
              this.pushOption(ReactDOM.findDOMNode(this.refs[key]).value || null);
          });
      this.handleQuestion()
      console.log('Poll Created !');
      alert('Poll Created !');
    }
    else {
      alert('Please fill provide all information to create the poll.');
    }
  }

  onChangeQuestion(event) {
    this.setState({newQuestion: event.target.value});
  }

  onChangePhase(event) {
    this.setState({newPhase: event.target.value});
  }

  onChangeOpt0(event) {
    let newOptionsArray = this.state.newOptions.slice();
    newOptionsArray[0] = event.target.value;
    this.setState({newOptions: newOptionsArray});
  }

  onChangeOpt1(event) {
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
    formLabel.innerText = 'Option ' + (this.state.totalOptions+1).toString();
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
                <FormGroup controlId="formHandlePhase">
                  <Col componentClass={ControlLabel} sm={2}>
                    Phase
                  </Col>
                  <Col sm={10}>
                    <FormControl
                    type="number"
                    onChange={this.onChangePhase}/>
                  </Col>
                </FormGroup>
                <FormGroup controlId="formOption0">
                  <Col componentClass={ControlLabel} sm={2}>
                    Option 1
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text"
                    placeholder="Enter the new option name"
                    ref="formOption0"
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
                    ref="formOption1"
                    onChange={this.onChangeOpt1}
                     />
                  </Col>
                </FormGroup>
              </div>
              <FormGroup>
                <Col sm={12}>
                  <Button type="button" bsStyle="success" onClick={this.addOptions}>
                    <i class="icon icon_plus_alt2"></i> Add Option
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={12}>
                  <Button type="submit" bsStyle="primary" onClick={this.handlePollCreation}>
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
    </div>
    );
  }

}
export default Admin;

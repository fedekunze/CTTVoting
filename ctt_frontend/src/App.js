import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navb from './Navb';
import Footer from './Footer';
import Main from './Main';
import Home from './Home';
import {Link, Route, BrowserRouter as Router, Handler, withRouter} from 'react-router-dom';
import './App.css';

import getWeb3 from "./utils/getWeb3"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: null,
      votingMechContract: null,
      superVotingContract: null,
      tokenContract: null
    }
  }
  componentWillMount() {
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })
      this.initContract();
    })
  }
  initContract() {
    var superVotingABI = [
      {
        "constant": false,
        "inputs": [
          {
            "name": "_tokenAddr",
            "type": "address"
          }
        ],
        "name": "setTokenAddress",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_votingMechContract",
            "type": "address"
          }
        ],
        "name": "setVotingMech",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "getAdmin",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "_admin",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "constructor"
      }
    ]
    var superVotingAddress = "0x626606165fc7ff0dc0c6d3be90629f91411774ce";

    const superVotingContract = this.state.web3.eth.contract(superVotingABI).at(superVotingAddress);

    var tokenABI = [
      {
        "constant": false,
        "inputs": [
          {
            "name": "_spender",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "account",
            "type": "address"
          },
          {
            "name": "newBalance",
            "type": "uint256"
          }
        ],
        "name": "unlockAccount",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_from",
            "type": "address"
          },
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "account",
            "type": "address"
          }
        ],
        "name": "lockAccount",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "balance",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "account",
            "type": "address"
          },
          {
            "name": "newBalance",
            "type": "uint256"
          }
        ],
        "name": "forceUpdate",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_votingMechContract",
            "type": "address"
          }
        ],
        "name": "newVotingMechanism",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "getVotingMech",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "account",
            "type": "address"
          },
          {
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "debugAddTokens",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "account",
            "type": "address"
          }
        ],
        "name": "lockedStatus",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          },
          {
            "name": "_spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "name": "remaining",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "_superVotingContract",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_owner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_spender",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      }
    ]
    var tokenAddress = "0x453d472dde9252cf7782e781da396c9df4ea3dd8";

    const tokenContract = this.state.web3.eth.contract(tokenABI).at(tokenAddress);

    var votingMechABI = [
      {
        "constant": false,
        "inputs": [
          {
            "name": "secret",
            "type": "string"
          },
          {
            "name": "values",
            "type": "uint256[]"
          }
        ],
        "name": "reveal",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "secret",
            "type": "string"
          },
          {
            "name": "values",
            "type": "uint256[]"
          }
        ],
        "name": "sha3Helper",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "account",
            "type": "address"
          }
        ],
        "name": "computeCharge",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "account",
            "type": "address"
          }
        ],
        "name": "getVote",
        "outputs": [
          {
            "name": "",
            "type": "bytes32"
          },
          {
            "name": "",
            "type": "uint256[]"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "moveToFinish",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_vote",
            "type": "bytes32"
          }
        ],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "unlock",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "values",
            "type": "uint256[]"
          }
        ],
        "name": "argmax",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_question",
            "type": "string"
          },
          {
            "name": "_numOptions",
            "type": "uint256"
          },
          {
            "name": "_phaseLength",
            "type": "uint256"
          }
        ],
        "name": "newVotingSession",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getQuestion",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "moveToReveal",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "_admin",
            "type": "address"
          },
          {
            "name": "_tokenaddr",
            "type": "address"
          }
        ],
        "payable": false,
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "VoteStarted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "Voted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "RevealStarted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "Revealed",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "Unlocked",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "VoteFinished",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "msg",
            "type": "bytes32"
          }
        ],
        "name": "Debug",
        "type": "event"
      }
    ]
    var votingMechAddress = "0x14b6e9129c0e1ba14a59c3c09ac732f2d7345516";

    const votingMechContract = this.state.web3.eth.contract(votingMechABI).at(votingMechAddress);


  }
  render() {

    return (
      <div className="App">
        <div> {this.state.web3.getAccounts()} </div>
        <Navb/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;

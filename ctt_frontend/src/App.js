import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navb from './Navb';
import Footer from './Footer';
import Main from './Main';
import Home from './Home';
import {Link, Route, BrowserRouter as Router, Handler, withRouter} from 'react-router-dom';
import './App.css';

import {superVotingContract, tokenContract, votingMechContract, accounts, web3} from './EthereumSetup';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: web3,
      votingMechContract: votingMechContract,
      superVotingContract: superVotingContract,
      tokenContract: tokenContract,
      accounts: accounts
    }
  }
  componentWillMount() {

  }

  render() {

    return (
      <div className="App">
        <div> {this.state.accounts[0]} </div>
        <Navb/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;

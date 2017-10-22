import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navb from './Navb';
import Footer from './Footer';
import Main from './Main';
import Home from './Home';
// import {browserHistory, IndexRoute} from 'react-router';
import {Link, Route, BrowserRouter as Router, Handler, withRouter} from 'react-router-dom';
import './App.css';


class App extends Component {
  render() {

    return (
      <div className="App">
        <Navb/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;

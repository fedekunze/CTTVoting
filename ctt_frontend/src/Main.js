import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';
import Home from './Home';
import Vote from './Vote';
import Results from './Results';
import Admin from './Admin';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

class Main extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path='/' component={Home}/>
          <Route exact path='/vote' component={Vote}/>
          <Route exact path='/results' component={Results}/>
          <Route exact path='/admin' component={Admin}/>
        </Switch>
      </Router>
    );
  }
}

// Main = withRouter(Main);
export default Main;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';
import {Button, Jumbotron } from 'react-bootstrap';
import {Grid, Row, Col, Image, Thumbnail, Modal, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import './App.css';

class Home extends React.Component {

  render() {
    return (
      <div>
        <Jumbotron className="banner">
          <Grid>
            <i class="icon pe-7s-global"></i> <i class="icon pe-7s-glasses"></i> <i class="icon pe-7s-date"></i>
            <h1 className="text-white">Athena</h1>
            <p className="lead text-white">Redefining corporate Governance</p>
          </Grid>
        </Jumbotron>
        <Grid>
          <Row className="inspiration">
            <Col xs={12} md={12}>
              <h3 className="subtitlee">Inspiration</h3>
              <p className="lead">We realized that there was a disconnect between shareholders and executive boards in corporations.
              How do shareholders ensure that they have a voice that is proportional to their share in the company in decisions?
              Traditional democratic voting can&apos;t come close to achieving this.</p>
            </Col>
          </Row>
        </Grid>
        <Grid className="background-gray">
          <Row className="what-it-does">
              <Col xs={12} md={12}>
                <h3 className="subtitle">What it does</h3>
                <p className="lead">Enter the Athena protocol. It&apos;s a honest utility voting scheme based on <a href="http://walkerd.people.cofc.edu/317/TidemanTullock1976.pdf">CTT</a> voting that ensures that players vote honestly according to their preferences for each option. Each voter is assigned a certain number of AthenaCoins proportional to their share of the company. Then, the administrative board can use the Athena platform to ask a question and present a certain number of options. Each voter stakes a certain number of their coins on each option (0 to 100%). Afterwards, the staked coins are aggregated and a winning option is chosen. Then, each voter is subjected to what is called a &quot;Clarke Tax&quot;. The tax is computed as follows: for each voter, an alternative election is held in which that voter did not vote. If the alternate winner is different from the original one, then the margin by which the alternate winner won is charged to the voter. This way, each voter is charged for having a more influential vote. In order to incentivize members to vote, voters all receive a little bit of interest at the end of the phase. To keep the game theory mechanisms secure, all the staked tokens are burned.</p>
              </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="whats-next">
              <Col xs={12} md={12}>
                <h3 className="subtitle">What&apos;s next for Athena</h3>
                <p className="lead">We want to integrate an identity management platform like uPort in order to prevent Sybil attacks. We also want to be able to adopt the protocol to DAOs and other blockchain platforms, not just enterprises.</p>
              </Col>
          </Row>
        </Grid>
      </div>
    );
  }

}
export default Home;

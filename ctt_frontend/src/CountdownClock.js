import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
class CountdownClock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       days: 0,
       hours: 0,
       minutes: 0,
       seconds: 0
    }
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <div className="Clock-Days">{this.state.days}</div>
            <div className="Clock-Hours">{this.state.hours}</div>
            <div className="Clock-Minutes">{this.state.minutes}</div>
            <div className="Clock-Seconds">{this.state.seconds}</div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default CountdownClock;

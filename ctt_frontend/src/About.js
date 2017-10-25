import React from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';

class About extends React.Component {
  render() {
    return (
      <div className='about'>
        <br/><br/><br/>
        <Grid>
          <Row>
            <Col xs={12} md={12}>
              <h1>About Us</h1>
            </Col>
          </Row>
            <Col xs={6} md={4}>
              <Image src={require('./img/team.jpg')} responsive />
            </Col>
            <Col xs={6} md={8} className="left">
              <p className="lead"><a href="https://www.pnkedin.com/in/jeremiah-andrews-779989122/">Jeremiah Andrews</a></p>
              <p className="lead"><a href="https://www.pnkedin.com/in/saroj-chintakrindi-03206641/">Saroj Chintakrindi</a></p>
              <p className="lead"><a href="https://www.pnkedin.com/in/kchang87/">Kevin Chang</a></p>
              <p className="lead"><a href="https://www.pnkedin.com/in/fekunze/">Federico Kunze</a></p>
              <p className="lead"><a href="https://www.pnkedin.com/in/avneet-saini-38a210109/">Avneet Saini</a></p>
              <p className="lead"><a href="https://www.pnkedin.com/in/tammyvu/">Tammy Vu</a></p>
            </Col>
          <Row>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default About;

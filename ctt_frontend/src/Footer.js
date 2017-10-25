import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
class Footer extends React.Component {
  render() {
    return (
      <div className='footer'>
        <Grid>
          <Row>
            <Col xs={12} md={12}>
              <p>
                <br/><br/><br/>
                Athena is powered by <a href="https://blockchain.berkeley.edu">Blockchain at Berkeley</a><br/>
                Email: <a href="mailto:fekunze@berkeley.edu" target="_top"> fekunze@berkeley.edu</a> <br/>
                &copy; All rights reserved

              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default Footer;

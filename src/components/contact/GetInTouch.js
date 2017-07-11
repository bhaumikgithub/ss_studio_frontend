import React, { Component } from 'react';
import {
  PageHeader,
  Button,
  FormControl,
  Grid,
  Col,
  Row
} from 'react-bootstrap';
import '../../assets/css/contact/get-in-touch.css';

export default class GetInTouch extends Component {
  render() {
    return (
      <div className="get-in-touch-wrap page-wrap">
        <Grid className="page-inner-wrap">
          <Row>
            <PageHeader className="page-title page-main-title text-center">
              <label>
                <span className="text-white">Get in</span> Touch
              </label>
            </PageHeader>
            <Col sm={7}>
              <img
                src={require('../../assets/images/logo.png')}
                alt="Logo"
                className="img-responsive contact-logo"
              />
              <Col xs={12} className="contact-details-block">
                <Col md={1} xs={2} className="p-none">
                  <img
                    src={require('../../assets/images/home-icon.png')}
                    alt="Home"
                    className="icon-img"
                  />
                </Col>
                <Col md={11} xs={10} className="p-none text-white">
                  2nd floor, Tulsi complex, Nr Azad Society, <br />
                  Behind Sahjanand Collage, Ambavadi, <br />
                  Ahemedabad-380 015, Gujarat, India.
                </Col>
              </Col>

              <Col xs={12} className="contact-details-block">
                <Col xs={2} md={1} className="p-none">
                  <img
                    src={require('../../assets/images/call-icon.png')}
                    alt="Mail"
                    className="icon-img"
                  />
                </Col>
                <Col xs={10} md={11} className="p-none text-white">
                  johndoe@gmail.com
                </Col>
              </Col>

              <Col xs={12} className="contact-details-block">
                <Col xs={2} md={1} className="p-none">
                  <img
                    src={require('../../assets/images/message-icon.png')}
                    alt="Call"
                    className="icon-img"
                  />
                </Col>
                <Col
                  xs={10}
                  md={11}
                  className="col-xs-10 col-md-11 p-none text-white"
                >
                  +91-0123456789
                </Col>
              </Col>
            </Col>

            <Col sm={5}>
              <form className="contact-form">
                <FormControl
                  className="contact-control"
                  type="text"
                  label="name"
                  placeholder="Name"
                />
                <FormControl
                  className="contact-control"
                  type="email"
                  label="email"
                  placeholder="Email"
                />
                <FormControl
                  className="contact-control"
                  type="number"
                  label="phone"
                  placeholder="Phone"
                />
                <FormControl
                  className="contact-control"
                  componentClass="textarea"
                  placeholder="Message"
                />
                <Col xs={12} className="text-center">
                  <Button
                    type="submit"
                    className="btn-orange contact-submit-btn text-center"
                  >
                    SEND MESSAGE
                  </Button>
                </Col>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

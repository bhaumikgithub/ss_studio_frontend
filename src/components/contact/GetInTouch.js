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
import { createContactMessage } from '../../services/Contact';
import SweetAlert from 'sweetalert-react';

export default class GetInTouch extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      contactForm: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      alert: {
        show: false,
        title: '',
        text: '',
        type: ''
      },
      errors: ''
    };

    return initialState;
  }

  resetState() {
    this.setState(this.getInitialState());
  }

  handleChange(e) {
    const contactForm = this.state.contactForm;
    var key = e.target.name;
    contactForm[key] = e.target.value;
    this.setState({
      contactForm
    });
  }

  handleClick(event) {
    var self = this;

    createContactMessage(self.state.contactForm)
      .then(function(response) {
        console.log(response);
        self.handelResponse(response);
      })
      .catch(function(error) {
        console.log(error.response.data.errors);
        self.setState({ errors: error.response.data.errors });
      });
  }

  handelResponse(response) {
    if (response.status === 201 && response.data.success) {
      this.resetState();
      this.setState({
        alert: {
          show: true,
          title: 'Success',
          text: response.data.message,
          type: 'success'
        }
      });
    }
  }

  render() {
    const contactForm = this.state.contactForm;
    const alert = this.state.alert;
    return (
      <div className="get-in-touch-wrap page-wrap">
        <SweetAlert
          show={alert.show || false}
          title={alert.title || ''}
          text={alert.text || ''}
          type={alert.type || 'success'}
          onConfirm={() => this.setState({ alert: { show: false } })}
        />
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
                  name="name"
                  value={contactForm.name}
                  onChange={this.handleChange.bind(this)}
                />
                <FormControl
                  className="contact-control"
                  type="email"
                  label="email"
                  placeholder="Email"
                  name="email"
                  value={contactForm.email}
                  onChange={this.handleChange.bind(this)}
                />
                <FormControl
                  className="contact-control"
                  type="number"
                  label="phone"
                  placeholder="Phone"
                  name="phone"
                  value={contactForm.phone}
                  onChange={this.handleChange.bind(this)}
                />
                <FormControl
                  className="contact-control"
                  componentClass="textarea"
                  placeholder="Message"
                  name="message"
                  value={contactForm.message}
                  onChange={this.handleChange.bind(this)}
                />
                <Col xs={12} className="text-center">
                  <Button
                    className="btn-orange contact-submit-btn text-center"
                    onClick={event => this.handleClick(event)}
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

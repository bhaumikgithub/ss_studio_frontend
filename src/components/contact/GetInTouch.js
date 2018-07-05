import React, { Component } from 'react';
import {
  PageHeader,
  Button,
  FormControl,
  Grid,
  Col,
  Row
} from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';

// Import css
import '../../assets/css/contact/get-in-touch.css';

// Import services
import {
  ContactMessageService,
  ContactDetailService
} from '../../services/Index';

// Import components
import validationHandler from '../common/ValidationHandler';

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
      errors: {},
      contactDetails: {}
    };

    return initialState;
  }

  resetState() {
    var initialState = this.getInitialState();
    this.setState({ contactForm: initialState.contactForm, errors: '' });
  }

  componentDidMount() {
    var self = this;
    var user = self.props.match.params.user;
    ContactDetailService.getContactDetail({user: user}).then(function(response) {
      if (response.status === 200) {
        self.setState({ contactDetails: response.data.data.contact_detail });
      }
    });
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
    var user = self.props.match.params.user;
    ContactMessageService.createContactMessage(self.state.contactForm, user)
      .then(function(response) {
        console.log(response);
        self.handelResponse(response);
      })
      .catch(function(error) {
        const errors = error.response.data.errors;
        if (errors.length > 0) {
          self.setState({ errors: validationHandler(errors) });
        } else {
          console.log(error.response);
        }
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
    const { contactForm, contactDetails, alert, errors } = this.state;
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
                <span className="text-white">Contact</span>
              </label>
            </PageHeader>
            {contactDetails &&
            <Col sm={7}>
              <div className="contact-detail-wrap">
                {/* <img
                  src={require('../../assets/images/logo.png')}
                  alt="Logo"
                  className="img-responsive contact-logo"
                /> */}
                <Col xs={12} className="contact-details-block">
                  <Col md={1} xs={2} className="p-none">
                    <img
                      src={require('../../assets/images/home-icon.png')}
                      alt="Home"
                      className="icon-img"
                    />
                  </Col>
                  <Col md={11} xs={10} className="p-none text-white p-wrap">
                    {contactDetails.address}
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
                  <Col xs={10} md={11} className="p-none text-white">
                    {contactDetails.email}
                  </Col>
                </Col>
              
                  <Col xs={12} className="contact-details-block">
                    <Col xs={2} md={1} className="p-none">
                      <img
                        src={require('../../assets/images/call-icon.png')}
                        alt="Call"
                        className="icon-img"
                      />
                    </Col>
                    <Col
                      xs={10}
                      md={11}
                      className="col-xs-10 col-md-11 p-none text-white"
                    >
                      {contactDetails.phone}
                    </Col>
                  </Col>
               
              </div>
            </Col>
            }
            {contactDetails &&
            <Col sm={5}>
              <div className="contact-form-wrap">
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
                  {errors['name'] && (
                    <span className="input-error text-yellow">
                      {errors['name']}
                    </span>
                  )}
                  <FormControl
                    className="contact-control"
                    type="email"
                    label="email"
                    placeholder="Email"
                    name="email"
                    value={contactForm.email}
                    onChange={this.handleChange.bind(this)}
                  />
                  {errors['email'] && (
                    <span className="input-error text-yellow">
                      {errors['email']}
                    </span>
                  )}
                  <FormControl
                    className="contact-control"
                    type="number"
                    label="phone"
                    placeholder="Phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={this.handleChange.bind(this)}
                  />
                  {errors['phone'] && (
                    <span className="input-error text-yellow">
                      {errors['phone']}
                    </span>
                  )}
                  <FormControl
                    className="contact-control"
                    componentClass="textarea"
                    placeholder="Message"
                    name="message"
                    value={contactForm.message}
                    onChange={this.handleChange.bind(this)}
                  />
                  {errors['message'] && (
                    <span className="input-error text-yellow">
                      {errors['message']}
                    </span>
                  )}
                  <Col xs={12} className="text-center">
                    <Button
                      className="btn-orange contact-submit-btn text-center"
                      onClick={event => this.handleClick(event)}
                    >
                      SEND MESSAGE
                    </Button>
                  </Col>
                </form>
              </div>
            </Col>
            }
          </Row>
        </Grid>
      </div>
    );
  }
}

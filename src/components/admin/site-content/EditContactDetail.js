import React, { Component } from 'react';
import {
  Col,
  Button,
  Modal,
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import EditTitle from '../../../assets/images/admin/site-content/about-site-content-icon.png';

// Import components
import validationHandler from '../../common/ValidationHandler';

// Import services
import { updateContactDetail } from '../../../services/admin/SiteContent';

// Import helper
import { str2bool, isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/site-content/edit-about-content.css';

export default class EditContactDetail extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      EditContactForm: {
        email: '',
        phone: '',
        address: ''
      },
      errors: {}
    };

    return initialState;
  }

  resetContactDetailForm() {
    this.setState({ EditContactForm: this.getInitialState().EditContactForm });
  }

  componentWillMount() {
    var self = this;
    if (!isObjectEmpty(self.props.editObject)) {
      self.editContactDetail(self.props.editObject);
    }
  }

  editContactDetail(contactDetail) {
    var self = this;
    const { email, phone, address } = contactDetail;

    self.setState({
      EditContactForm: {
        email: email,
        phone: phone,
        address: address
      }
    });
  }

  handleChange(e) {
    const EditContactForm = this.state.EditContactForm;
    var key = e.target.name;
    EditContactForm[key] = str2bool(e.target.value);
    this.setState({
      EditContactForm
    });
  }

  handleSubmit(e) {
    var self = this;
    var callContactDetailApi = () => {};
    var editParams = {
      id: self.props.editObject.id,
      EditContactForm: { contact_detail: self.state.EditContactForm }
    };
    callContactDetailApi = updateContactDetail(editParams);

    callContactDetailApi
      .then(function(response) {
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
    var responseData = response.data;
    if (response.status === 201) {
      this.resetContactDetailForm();
      this.props.renderContactDetail(responseData.data.contact_detail);
      this.props.EditContactClose();
    } else {
      console.log(responseData.errors);
    }
  }

  // updateState(element) {
  // 	this.setState({value: element});
  // }

  render() {
    const { EditContactForm, errors } = this.state;

    return (
      <Modal
        show={this.props.EditContactShow}
        bsSize="large"
        className="edit-about-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="edit-about-body p-none">
          <span
            className="close-modal-icon"
            onClick={this.props.EditContactClose}
          >
            <img
              src={require('../../../assets/images/admin/site-content/close-icon.png')}
              alt=""
              className="hidden-xs"
            />
            <img
              src={require('../../../assets/images/admin/site-content/close-icon-white.png')}
              alt=""
              className="visible-xs"
            />
          </span>

          <Col className="edit-about-title-wrap p-none" sm={4}>
            <Col xs={12} className="p-none edit-about-title-details">
              <img
                src={EditTitle}
                alt=""
                className="edit-about-icon img-responsive"
              />
              <h4 className="edit-about-text text-white">Contact Us Details</h4>
            </Col>
          </Col>
          <Col className="edit-about-content-wrap" sm={8}>
            <form className="admin-side edit-about-form custom-form">
              <FormGroup className="custom-form-group required">
                <FormGroup className="custom-form-group required">
                  <ControlLabel className="custom-form-control-label">
                    Email
                  </ControlLabel>
                  <FormControl
                    className="custom-form-control"
                    type="text"
                    placeholder="johndoe@gmail.com"
                    name="email"
                    value={EditContactForm.email}
                    onChange={this.handleChange.bind(this)}
                  />
                  {errors['email'] && (
                    <span className="input-error text-red">
                      {errors['email']}
                    </span>
                  )}
                </FormGroup>
                <ControlLabel className="custom-form-control-label">
                  Phone
                </ControlLabel>
                <FormControl
                  className="custom-form-control num-input"
                  type="text"
                  placeholder="+91-9876543210"
                  name="phone"
                  value={EditContactForm.phone}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['phone'] && (
                  <span className="input-error text-red">
                    {errors['phone']}
                  </span>
                )}
              </FormGroup>
              <FormGroup className="custom-form-group">
                <ControlLabel className="custom-form-control-label">
                  Address
                </ControlLabel>
                <Scrollbars style={{ height: '45px' }}>
                  <FormControl
                    id="modalAboutDesc"
                    className="custom-form-control editabouttxtarea"
                    componentClass="textarea"
                    placeholder="2nd Floor, Tulsi Complex, Nr Azad Society, Behind Sahajanand College, Ambavadi, Ahmedabad - 380 015, Gujarat, India. "
                    name="address"
                    value={EditContactForm.address}
                    onChange={this.handleChange.bind(this)}
                  />
                </Scrollbars>
                {errors['address'] && (
                  <span className="input-error text-red">
                    {errors['address']}
                  </span>
                )}
              </FormGroup>

              <Button
                className="btn btn-orange edit-about-submit"
                onClick={event => this.handleSubmit(event)}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={this.props.EditContactClose}
                className="btn btn-grey edit-about-cancel"
              >
                Cancel
              </Button>
            </form>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

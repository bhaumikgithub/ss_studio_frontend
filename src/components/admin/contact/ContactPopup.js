import React, { Component } from 'react';
import {
  Col,
  Button,
  Modal,
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap';

// Import icon
import createTitle from '../../../assets/images/admin/contact/admin-add-contact/add-contact-icon.png';
import editTitle from '../../../assets/images/admin/contact/admin-add-contact/edit-contact-icon.png';

// Import components
import validationHandler from '../../common/ValidationHandler';

// Import services
import { createContact, updateContact } from '../../../services/admin/Contact';

// Import helper
import { str2bool, isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/contact/add-contact/add-contact.css';

export default class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      contactForm: {
        first_name: '',
        last_name: '',
        status: 'active',
        email: '',
        phone: '',
        photo_attributes: {
          image: ''
        }
      },
      errors: {}
    };

    return initialState;
  }

  handleChange(e) {
    const contactForm = this.state.contactForm;
    var key = e.target.name;
    contactForm[key] = str2bool(e.target.value);
    this.setState({
      contactForm
    });
  }

  handleFileChange(e) {
    var reader = new FileReader();
    var file = e.target.files[0];
    const newContactForm = Object.assign({}, this.state.contactForm);

    reader.onloadend = () => {
      newContactForm.photo_attributes.image = file;
      this.setState({ contactForm: newContactForm });
      document.querySelector('.upload-thumb img').src = reader.result;
    };

    reader.readAsDataURL(file);
  }

  generateFormData(object) {
    let data = new FormData();
    var newObject = Object.assign({}, object);
    data.append(
      'contact[photo_attributes][image]',
      newObject.photo_attributes.image
    );
    Object.keys(newObject).forEach(
      key =>
        key !== 'photo_attributes'
          ? data.append('contact[' + key + ']', newObject[key])
          : ''
    );

    return data;
  }

  handleSubmit(e) {
    var self = this;
    let data = this.generateFormData(this.state.contactForm);
    var callContactApi = () => {};
    if (isObjectEmpty(self.props.editObject)) {
      var createParams = data;
      callContactApi = createContact(createParams);
    } else {
      var editParams = {
        id: self.props.editObject.id,
        contactForm: data
      };
      callContactApi = updateContact(editParams);
    }

    callContactApi
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
      this.resetcontactForm();
      this.props.renderContact(
        responseData.data.contact,
        isObjectEmpty(this.props.editObject) ? 'insert' : 'replace'
      );
      this.props.closeOn();
    } else {
      console.log(responseData.errors);
    }
  }

  resetcontactForm() {
    this.setState({ contactForm: this.getInitialState().contactForm });
  }

  editContact(contact) {
    var self = this;
    const { first_name, last_name, status, email, phone, photo } = contact;
    self.setState({
      contactForm: {
        first_name: first_name,
        last_name: last_name,
        status: status,
        email: email,
        phone: phone,
        photo_attributes: photo
      }
    });
  }

  componentWillMount() {
    var self = this;

    if (!isObjectEmpty(self.props.editObject)) {
      self.editContact(self.props.editObject);
    }
  }

  render() {
    const { contactForm, errors } = this.state;
    return (
      <Modal
        show={this.props.showCreate}
        className="add-contact-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="add-contact-body p-none">
          <span className="close-modal-icon" onClick={this.props.closeOn}>
            <img
              src={require('../../../assets/images/admin/album/close-icon.png')}
              alt=""
              className="hidden-xs"
            />
            <img
              src={require('../../../assets/images/admin/album/close-icon-white.png')}
              alt=""
              className="visible-xs"
            />
          </span>
          <Col className="add-contact-title-wrap p-none" sm={5}>
            <Col xs={12} className="p-none add-contact-title-details">
              <img
                src={
                  isObjectEmpty(this.props.editObject) ? createTitle : editTitle
                }
                alt=""
                className="add-contact-icon img-responsive"
              />
              <h4 className="add-contact-text text-white">
                {/*Create New Contact*/}
                {isObjectEmpty(this.props.editObject) ? (
                  'Create New Contact'
                ) : (
                  'Edit Contact'
                )}
              </h4>
            </Col>
          </Col>
          <Col className="add-contact-wrap" sm={7}>
            <form className="admin-side add-contact-form custom-form">
              <FormGroup className="custom-form-group">
                <ControlLabel className="custom-form-control-label">
                  First Name
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  value={contactForm.first_name}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['first_name'] && (
                  <span className="input-error text-red">
                    {errors['first_name']}
                  </span>
                )}
              </FormGroup>
              <FormGroup className="custom-form-group">
                <ControlLabel className="custom-form-control-label">
                  Last Name
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  placeholder="Last name"
                  name="last_name"
                  value={contactForm.last_name}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['last_name'] && (
                  <span className="input-error text-red">
                    {errors['last_name']}
                  </span>
                )}
              </FormGroup>
              <FormGroup className="<custom-form-group></custom-form-group>">
                <ControlLabel className="custom-form-control-label">
                  Upload Image
                </ControlLabel>

                <div className="upload-img-wrap">
                  <div className="upload-thumb upload-image-thumb-wrap">
                    <img
                      className="img-responsive"
                      src={
                        contactForm.photo_attributes &&
                        contactForm.photo_attributes.image
                      }
                      alt=""
                    />
                  </div>
                  <div className="upload-img-btn">
                    <span>Upload</span>
                    <FormControl
                      accept="image/*"
                      name="image"
                      type="file"
                      label="File"
                      title=""
                      className="upload-img-control"
                      onChange={this.handleFileChange.bind(this)}
                    />
                  </div>
                </div>
              </FormGroup>
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Email
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  placeholder="example@gmail.com"
                  name="email"
                  value={contactForm.email}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['email'] && (
                  <span className="input-error text-red">
                    {errors['email']}
                  </span>
                )}
              </FormGroup>
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Phone
                </ControlLabel>
                <FormControl
                  className="custom-form-control contact-input"
                  type="text"
                  placeholder="0987654321"
                  name="phone"
                  value={contactForm.phone}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['phone'] && (
                  <span className="input-error text-red">
                    {errors['phone']}
                  </span>
                )}
              </FormGroup>

              <Button
                /*type="submit" */
                className="btn btn-orange add-contact-submit"
                onClick={event => this.handleSubmit(event)}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={this.props.closeOn}
                className="btn btn-grey add-contact-cancel"
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

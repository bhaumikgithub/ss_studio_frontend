import React, { Component } from 'react';
import { Col, Button, Modal,ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

// Import icon
import createTitle from '../../../assets/images/admin/contact/admin-add-contact/add-contact-icon.png';
import editTitle from '../../../assets/images/admin/contact/admin-add-contact/edit-contact-icon.png'

// Import services
import { createContact, updateContact } from '../../../services/admin/Contacts';

// Import helper
import { str2bool, isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/contact/add-contact/add-contact.css'

export default class AddContact extends Component {
  constructor(props){
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
          photo: ''
        }
      }

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

  // handleImageChange(e) {
  //   var self = this;
  //   // debugger;
  //   var preview = document.querySelector('.upload-thumb img');
  //   // var file = this.refs.file.files[0];
  //   var file    = document.querySelector('input[type=file]').files[0];
  //   // console.log(file);
  //   var reader = new FileReader();
  //   // var url = reader.readAsDataURL(file);
  //   reader.addEventListener("load", function () {
  //     preview.src = reader.result;
  //     preview.height = 51;
  //     preview.width = 51;
  //     const contactForm = self.state.contactForm;
  //     contactForm.photo_attributes['photo'] = reader.result;
  //     self.setState({
  //       contactForm
  //     });
  //   }, false);
    
  //   if (file) {
  //     var url = reader.readAsDataURL(file);
  //   }
     
  // // console.log(url);
  // }

  handleSubmit(e) {
    var self = this;
    var callContactApi = () => {};
    if (isObjectEmpty(self.props.editObject)) {
      var createParams = { contact: self.state.contactForm };
      callContactApi = createContact(createParams);
    } else {
      var editParams = {
        id: self.props.editObject.id,
        contactForm: { contact: self.state.contactForm }
      };
      callContactApi = updateContact(editParams);
    }

    callContactApi
    .then(function(response) {
      self.handelResponse(response);
    })
    .catch(function(error) {
      console.log(error.response);
    });

  }

  handelResponse(response) {
    var responseData = response.data;
    console.log(responseData)
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
    console.log(self)
    const {
      first_name,
      last_name,
      status,
      email,
      phone
    } = contact;

    

    self.setState({
      contactForm: {
        first_name: first_name,
        last_name: last_name,
        status: status,
        email: email,
        phone: phone
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
    const { contactForm } = this.state; 
   console.log(contactForm)   
    return (
      <Modal 
        show={this.props.showCreate} 
        className="add-contact-modal" 
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="add-contact-body p-none">
          <span className="close-modal-icon" 
                onClick={this.props.closeOn}>
            <img src={require('../../../assets/images/admin/album/close-icon.png')} alt="" className="hidden-xs"/>
            <img src={require('../../../assets/images/admin/album/close-icon-white.png')} alt="" className="visible-xs" />            
          </span>
          <Col className="add-contact-title-wrap p-none" sm={5}>
                <Col xs={12} className="p-none add-contact-title-details">
                    <img 
                      src={
                        isObjectEmpty(this.props.editObject)
                          ? createTitle
                          : editTitle
                      }
                      alt="" 
                      className="add-contact-icon img-responsive" 
                    />
                    <h4 
                      className="add-contact-text text-white">
                      {/*Create New Contact*/}
                      {isObjectEmpty(this.props.editObject)
                        ? 'Create New Contact'
                        : 'Edit Contact'}
                    </h4>
                </Col>
          </Col>
          <Col className="add-contact-wrap" sm={7}>            
            <form className="add-contact-form custom-form">
                <FormGroup className="custom-form-group required">
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
                </FormGroup>    
                <FormGroup className="custom-form-group required">
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
                </FormGroup>    
                <FormGroup className="<custom-form-group></custom-form-group>">
                  <ControlLabel className="custom-form-control-label">
                    Upload Image
                  </ControlLabel>
                   
                  <div className="upload-img-wrap">
                    <div className="upload-thumb">
                      <img src={require('../../../assets/images/admin/contact/admin-add-contact/contact-thumb.png')} alt="" />                          
                    </div>
                    <div className="upload-img-btn">
                      <span>Upload</span>
                      <FormControl 
                        accept="image/*"
                        ref={contactForm.photo_attributes}
                        type="file" 
                        label="File" 
                        title=""
                        className="upload-img-control"
                        onChange=""
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
                </FormGroup>     

                <Button 
                  /*type="submit" */
                  className="btn btn-orange add-contact-submit"
                  onClick={event => this.handleSubmit(event)}
                >
                  Save
                </Button>
                <Button type="button" onClick={this.props.closeOn} className="btn btn-grey add-contact-cancel">
                  Cancel
                </Button>
            </form>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

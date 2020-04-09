import React, { Component } from 'react';
import {
  Col,
  Button,
  Modal,
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap';
// Import components
import validationHandler from '../../common/ValidationHandler';

// Import icon
import AddTitle from '../../../assets/images/admin/site-content/add-service-icon.png';

// Import css
import 'react-select/dist/react-select.min.css';
import '../../../assets/css/admin/site-content/add-service.css';
import '../../../assets/css/admin/contact/add-contact/add-contact.css';

// Import services
import { HomePageGalleryService } from '../../../services/Index';

export default class createHomepagePopup extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      HomepageForm: {
        homepage_image: "",
        is_active: true
      },
      errors: {}
    };

    return initialState;
  }

  resetHomepageForm() {
    this.setState({ HomepageForm: this.getInitialState().HomepageForm });
  }

  handleFileChange(e) {
    var reader = new FileReader();
    var file = e.target.files[0];
    const newHomepageForm = Object.assign({}, this.state.HomepageForm);

    reader.onloadend = () => {
      newHomepageForm.homepage_image = file;
      this.setState({ HomepageForm: newHomepageForm });
      document.querySelector('.upload-thumb img').src = reader.result;
    };

    reader.readAsDataURL(file);
  }

  generateFormData(object) {
    let data = new FormData();
    var newObject = Object.assign({}, object);
    data.append(
      'homepage_photo[homepage_image]',
      newObject.homepage_image
    );
    Object.keys(newObject).forEach(
      key =>
        key !== 'homepage_image'
          ? data.append('homepage_photo[' + key + ']', newObject[key])
          : ''
    );

    return data;
  }

  handleSubmit(e) {
    var self = this;
    var callServiceApi = () => {};
    let data = this.generateFormData(this.state.HomepageForm);
    var createParams = data;
    callServiceApi = HomePageGalleryService.createHomepagePhotos(createParams);

    callServiceApi
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
      this.resetHomepageForm();
      this.props.renderPhoto(
        responseData.data.homepage_photo,
        'insert'
      );
      this.props.closeCreatePopup();
    } else {
      console.log(responseData.errors);
    }
  }

  render() {
    return (
      <Modal
        show={this.props.showCreatePopup}
        bsSize="large"
        className="add-category-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="add-category-body p-none">
          <span
            className="close-modal-icon"
            onClick={this.props.closeCreatePopup}
          >
            <img
              src={require('../../../assets/images/admin/site-content/close-icon.png')}
              className="hidden-xs"
              alt=""
            />
            <img
              src={require('../../../assets/images/admin/site-content/close-icon-white.png')}
              className="visible-xs"
              alt=""
            />
          </span>
          <Col className="add-title-wrap p-none" sm={4}>
            <Col xs={12} className="p-none add-category-title-details">
              <img
                src={
                  AddTitle
                }
                alt=""
                className="add-category-icon img-responsive"
              />
              <h4 className="add-category-text text-white">
                Add HomePage Photo
              </h4>
            </Col>
          </Col>
          <Col className="add-content-wrap" sm={8}>
            <form className="admin-side create-album-form custom-form">
            <FormGroup className="<custom-form-group></custom-form-group>">
                <ControlLabel className="custom-form-control-label">
                  Upload Image
                </ControlLabel>

                <div className="upload-img-wrap">
                  <div className="upload-thumb upload-image-thumb-wrap">
                    <img className="img-responsive" alt="" />
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
              <Button
                className="btn btn-orange add-category-submit"
                onClick={event => this.handleSubmit(event)}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={this.props.closeCreatePopup}
                className="btn btn-grey add-category-cancel"
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

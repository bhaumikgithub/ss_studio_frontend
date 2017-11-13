import React, { Component } from 'react';
import {
  Col,
  Button,
  Modal,
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap';
// import Select from 'react-select';
import { Scrollbars } from 'react-custom-scrollbars';

import Select from 'react-select';

// Import components
import validationHandler from '../../common/ValidationHandler';

// Import icon
import AddTitle from '../../../assets/images/admin/site-content/add-service-icon.png';
import EditTitle from '../../../assets/images/admin/site-content/edit-contact-icon.png';

// Import css
import 'react-select/dist/react-select.min.css';
import '../../../assets/css/admin/site-content/add-service.css';

// Import services
import { AboutService } from '../../../services/Index';

// Import helper
import { str2bool, isObjectEmpty } from '../../Helper';

export default class SocialMediaPopup extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      SocialMediaForm: {
        soical_media_title: ''
      },
      errors: {}
    };

    return initialState;
  }

  resetSocialMediaForm() {
    this.setState({ SocialMediaForm: this.getInitialState().SocialMediaForm });
  }

  handleSelectChange(e) {
    const SocialMediaForm = this.state.SocialMediaForm;
    var title = e.value;
    SocialMediaForm['soical_media_title'] = title;
    this.setState({
      SocialMediaForm
    });
  }

  handleChange(e) {
    const SocialMediaForm = this.state.SocialMediaForm;
    var key = e.target.name;
    SocialMediaForm[key] = str2bool(e.target.value);
    this.setState({
      SocialMediaForm
    });
  }

  handleSubmit(e) {
    var self = this;
    var editParams = {
      about: self.state.SocialMediaForm
    };
    AboutService.updateAboutUs(editParams)
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        debugger;
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
      this.resetSocialMediaForm();
      this.props.renderSocialMedia(
        responseData.data.about_us.social_links,
        isObjectEmpty(this.props.editObject) ? 'insert' : 'replace'
      );
      this.props.SocialMediaCloseModal();
    } else {
      console.log(responseData.errors);
    }
  }

  updateState(element) {
    this.setState({ value: element });
  }

  render() {
    const { SocialMediaForm, errors } = this.state;
    var options = [
      { value: 'facebook_link', label: 'Facebook' },
      { value: 'twitter_link', label: 'Twitter' },
      { value: 'instagram_link', label: 'Instagram' },
      { value: 'youtube_link', label: 'Youtube' },
      { value: 'vimeo_link', label: 'Vimeo' },
      { value: 'linkedin_link', label: 'Linkedin' },
      { value: 'pinterest_link', label: 'Pinterest' },
      { value: 'flickr_link', label: 'Flickr' }
    ];
    return (
      <Modal
        show={this.props.AddSocialMediaShow}
        bsSize="large"
        className="add-category-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="add-category-body p-none">
          <span
            className="close-modal-icon"
            onClick={this.props.SocialMediaCloseModal}
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
                  isObjectEmpty(this.props.editObject) ? AddTitle : EditTitle
                }
                alt=""
                className="add-category-icon img-responsive"
              />
              <h4 className="add-category-text text-white">
                {isObjectEmpty(this.props.editObject)
                  ? 'Add Social Media Links'
                  : 'Edit Social Media Links'}
              </h4>
            </Col>
          </Col>
          <Col className="add-content-wrap" sm={8}>
            <form className="admin-side create-album-form custom-form">
              <FormGroup controlId="formControlsSelect required">
                <ControlLabel className="custom-form-control-label">
                  Select social media platform
                </ControlLabel>
                <Select
                  className="custom-form-control"
                  name="soical_media_title"
                  value={SocialMediaForm.soical_media_title}
                  options={options}
                  placeholder={false}
                  onChange={this.handleSelectChange.bind(this)}
                />
                {errors['service_name'] && (
                  <span className="input-error text-red">
                    {errors['service_name']}
                  </span>
                )}
              </FormGroup>

              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  URL
                </ControlLabel>

                <Scrollbars style={{ height: '40px' }}>
                  <FormControl
                    className="custom-form-control"
                    type="text"
                    placeholder="Url"
                    name={SocialMediaForm.soical_media_title}
                    //value={SocialMediaForm.service_name}
                    onChange={this.handleChange.bind(this)}
                  />
                </Scrollbars>
                {errors['description'] && (
                  <span className="input-error text-red">
                    {errors['description']}
                  </span>
                )}
              </FormGroup>
              <Button
                className="btn btn-orange add-category-submit"
                onClick={event => this.handleSubmit(event)}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={this.props.SocialMediaCloseModal}
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

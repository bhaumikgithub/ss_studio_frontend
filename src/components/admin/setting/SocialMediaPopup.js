import React, { Component } from 'react';
import {
  Col,
  Button,
  Modal,
  ControlLabel,
  FormGroup,
  FormControl,
  InputGroup
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
      socialMedia: {},
      SocialMediaForm: {
        soical_media_title: '',
        social_link: ''
      },
      social_media_title_error: '',
      social_link_error: '',
      errors: {}
    };

    return initialState;
  }

  componentWillMount() {
    var self = this;
    AboutService.getAboutUs().then(function(response) {
      if (response.status === 200) {
        self.setState({
          socialMedia: response.data.data.about_us.social_links
        });
      }
    });
    if (!isObjectEmpty(self.props.editObject)) {
      self.editSocialMedia(self.props.editObject);
    }
  }

  editSocialMedia(socialMedia) {
    var self = this;
    const { soical_media_title, social_link } = socialMedia;

    self.setState({
      SocialMediaForm: {
        soical_media_title: soical_media_title,
        social_link: social_link.includes("http://www.") ? social_link.split("http://www.").pop()
        : social_link
      }
    });
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
    var social_link_name =
      key === 'social_link'
        ? SocialMediaForm['soical_media_title']
        : 'social_link';
    SocialMediaForm[key] = str2bool(e.target.value);
    SocialMediaForm[social_link_name] = "http://www." + SocialMediaForm[key]
    this.setState({
      SocialMediaForm
    });
  }

  handleSubmit(e) {
    var self = this;
    var { SocialMediaForm } = self.state;
    var editParams = {
      about: SocialMediaForm
    };

    if (SocialMediaForm.soical_media_title.length < 1) {
      return self.setState({
        social_media_title_error: "Social medial title can't be blank."
      });
    } else if (SocialMediaForm.social_link.length < 1) {
      return self.setState({
        social_link_error: "Social link can't be blank."
      });
    }
    AboutService.updateAboutUs(editParams)
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
    const {
      SocialMediaForm,
      socialMedia,
      social_media_title_error,
      social_link_error
    } = this.state;
    var options = [];

    socialMedia &&
      Object.keys(socialMedia).map(social_link => {
        if (socialMedia[social_link] === '') {
          options.push({
            value: social_link,
            label: social_link.replace('_link', '')
          });
        }
        return options;
      });
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
                {isObjectEmpty(this.props.editObject) ? (
                  <Select
                    className="custom-form-control social_media_custom-label"
                    name="soical_media_title"
                    value={SocialMediaForm.soical_media_title}
                    options={options}
                    placeholder={false}
                    onChange={this.handleSelectChange.bind(this)}
                  />
                ) : (
                  <FormControl
                    className="custom-form-control social_media_custom-label"
                    type="text"
                    disabled="true"
                    name="soical_media_title"
                    value={SocialMediaForm.soical_media_title.replace(
                      '_link',
                      ''
                    )}
                  />
                )}
                {social_media_title_error && (
                  <span className="input-error text-red">
                    {social_media_title_error}
                  </span>
                )}
              </FormGroup>

              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  URL
                </ControlLabel>

                <Scrollbars style={{ height: '40px' }}>
                  <InputGroup>
                    <InputGroup.Addon>http://www.</InputGroup.Addon>
                    <FormControl
                      className=""
                      type="text"
                      placeholder="Url"
                      name="social_link"
                      value={SocialMediaForm.social_link}
                      onChange={this.handleChange.bind(this)}
                    />
                  </InputGroup>
                </Scrollbars>
                {social_link_error && (
                  <span className="input-error text-red">
                    {social_link_error}
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

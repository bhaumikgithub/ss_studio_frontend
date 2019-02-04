import React, { Component } from 'react';
import {
  Col,
  Button,
  Modal,
  ControlLabel,
  FormGroup,
  FormControl,
  Checkbox
} from 'react-bootstrap';

// Import services
import { HomePageGalleryService } from '../../../services/Index';

// Import components
import validationHandler from '../../common/ValidationHandler';

// Import helper
import { isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/video-films/add-video/add-video.css';

export default class HomepagePopup extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      HomepageForm: {
        position: 0,
        slide_text: '',
        button_text: '',
        button_link: '',
        is_display_text: false,
        is_display_button: false
      },
      errors: {}
    };

    return initialState;
  }

  resetHomepageForm() {
    this.setState({ HomepageForm: this.getInitialState().HomepageForm });
  }

  componentWillMount() {
    var self = this;
    if (!isObjectEmpty(self.props.editObject.photo)) {
      self.editHomepage(self.props.editObject.photo);
    }
  }

  editHomepage(HomepageDetail) {
    var self = this;
    self.setState({
      HomepageForm: HomepageDetail
    });
  }

  handleChange(e) {
    const HomepageForm = this.state.HomepageForm;
    var key = e.target.name;
    var value = e.target.value;
    if (key === 'is_display_text' || key === 'is_display_button') {
      HomepageForm[key] = e.target.checked;
    } else {
      HomepageForm[key] = value;
    }
    this.setState({
      HomepageForm
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    var callHomepageApi = () => {};
    var newHomePageForm = self.state.HomepageForm
    if (!isObjectEmpty(self.props.editObject)) {
      delete newHomePageForm.homepage_image
      delete newHomePageForm.homepage_image_file_name
      var editParams = {
        id: self.props.editObject.photo.id,
        homepage_photo: newHomePageForm
      };
      callHomepageApi = HomePageGalleryService.updateHomepagePhoto(editParams, editParams.id);
    }

    callHomepageApi
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        debugger
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
        responseData.data.homepage_photo
      );
      this.props.closePopup();
    } else {
      console.log(responseData.errors);
    }
  }

  render() {
    const { HomepageForm, errors } = this.state;
    return (
      <Modal
        show={this.props.showPopup}
        className="add-videofilms-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="add-videofilms-body p-none">
          <span className="close-modal-icon" onClick={this.props.closePopup}>
            <img
              src={require('../../../assets/images/admin/album/share-album/close-icon.png')}
              alt=""
              className="hidden-xs"
            />
            <img
              src={require('../../../assets/images/admin/album/share-album/close-icon-white.png')}
              alt=""
              className="visible-xs"
            />
          </span>
          <Col className="add-videofilms-title-wrap p-none" sm={5}>
            <Col xs={12} className="p-none add-videofilms-title-details">
              <img
                src={require('../../../assets/images/admin/album/create-album/edit-album-icon.png')}
                alt=""
                className="add-videofilms-icon img-responsive"
              />
              <h4 className="add-videofilms-text text-white">Edit Homepage Detail</h4>
            </Col>
          </Col>
          <Col className="add-videofilms-content-wrap" sm={7}>
            <form className="admin-side add-videofilms-form custom-form">
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Slide Order
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  name="position"
                  value={HomepageForm.position === null ? "" : HomepageForm.position}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['position'] && (
                  <span className="input-error text-red">
                    {errors['position']}
                  </span>
                )}
              </FormGroup>
              <FormGroup className="custom-form-group">
                <Checkbox
                  className=""
                  name="is_display_text"
                  value={''}
                  onClick={this.handleChange.bind(this)}
                  defaultChecked={HomepageForm.is_display_text}
                >
                  {' '}
                  <span>Display Text on Slide</span>
                  <div className="check">
                    <div className="inside" />
                  </div>
                </Checkbox>
              </FormGroup>
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Slide Text
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  name="slide_text"
                  disabled={HomepageForm.is_display_text ? false : true}
                  value={HomepageForm.slide_text === null ? "" : HomepageForm.slide_text}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['slide_text'] && (
                  <span className="input-error text-red">
                    {errors['slide_text']}
                  </span>
                )}
              </FormGroup>
              <FormGroup className="custom-form-group">
                <Checkbox
                  className=""
                  name="is_display_button"
                  value={''}
                  onClick={this.handleChange.bind(this)}
                  defaultChecked={HomepageForm.is_display_button}
                >
                  {' '}
                  <span>Display Button on Slide</span>
                  <div className="check">
                    <div className="inside" />
                  </div>
                </Checkbox>
              </FormGroup>
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Button Text
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  name="button_text"
                  value={HomepageForm.button_text === null ? "" : HomepageForm.button_text}
                  disabled={HomepageForm.is_display_button ? false : true}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['button_text'] && (
                  <span className="input-error text-red">
                    {errors['button_text']}
                  </span>
                )}
              </FormGroup>

              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Button Link
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  name="button_link"
                  value={HomepageForm.button_link === null ? "" : HomepageForm.button_link}
                  disabled={HomepageForm.is_display_button ? false : true}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['button_link'] && (
                  <span className="input-error text-red">
                    {errors['button_link']}
                  </span>
                )}
              </FormGroup>
              <Button
                type="submit"
                className="btn btn-orange create-video-submit"
                onClick={event => this.handleSubmit(event)}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={this.props.closePopup}
                className="btn btn-grey create-video-cancel"
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

import React, { Component } from 'react';
import {
  Col,
  Button,
  Modal,
  Radio,
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap';

// Import services
import { VideoFilmService } from '../../../services/Index';

// Import components
import validationHandler from '../../common/ValidationHandler';

// Import helper
import { isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/video-films/add-video/add-video.css';

export default class VideoPopup extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      videoForm: {
        title: '',
        video_type: 'youtube',
        video_url: '',
        status: 'published'
      },
      showVideoUrl: true,
      errors: {}
    };

    return initialState;
  }

  resetVideoForm() {
    this.setState({ videoForm: this.getInitialState().videoForm });
  }

  componentWillMount() {
    var self = this;

    if (!isObjectEmpty(self.props.editObject)) {
      self.editVideo(self.props.editObject);
    }
  }

  editVideo(video) {
    var self = this;
    self.setState({
      videoForm: video
    });
  }

  handleChange(e) {
    const videoForm = this.state.videoForm;
    var key = e.target.name;
    var value = e.target.value;
    this.handleVideoSelector(key, value);
    videoForm[key] = e.target.value;
    this.setState({
      videoForm
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    var callVideoApi = () => {};

    if (isObjectEmpty(self.props.editObject)) {
      var createParams = { video: this.state.videoForm };
      callVideoApi = VideoFilmService.createVideoFilm(createParams);
    } else {
      var editParams = {
        id: self.props.editObject.id,
        videoForm: { video: self.state.videoForm }
      };
      callVideoApi = VideoFilmService.updateVideoFilm(editParams);
    }

    callVideoApi
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
      this.resetVideoForm();
      this.props.renderVideo(
        responseData.data.video,
        isObjectEmpty(this.props.editObject) ? 'insert' : 'replace'
      );
      this.props.closePopup();
    } else {
      console.log(responseData.errors);
    }
  }

  handleVideoSelector(key, value) {
    if (value === 'youtube' && key === 'video_type') {
      this.handleVideoSelector(true);
    }
  }

  render() {
    const { videoForm, showVideoUrl, errors } = this.state;
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
                src={require('../../../assets/images/admin/video-films/add-video-icon.png')}
                alt=""
                className="add-videofilms-icon img-responsive"
              />
              <h4 className="add-videofilms-text text-white">Add New Video</h4>
            </Col>
          </Col>
          <Col className="add-videofilms-content-wrap" sm={7}>
            <form className="admin-side add-videofilms-form custom-form">
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Video Title
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  name="title"
                  value={videoForm.title}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['title'] && (
                  <span className="input-error text-red">
                    {errors['title']}
                  </span>
                )}
              </FormGroup>

              <FormGroup className="custom-form-group radio-wrapper">
                <ControlLabel className="custom-form-control-label">
                  Video Type
                </ControlLabel>
                <br />
                <span className="custom-radio-wrap videotype-radio-wrap">
                  <Radio
                    name="video_type"
                    inline
                    value="youtube"
                    checked={videoForm.video_type === 'youtube'}
                    onChange={this.handleChange.bind(this)}
                  >
                    YouTube
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Radio>
                </span>{' '}
                <span className="custom-radio-wrap videotype-radio-wrap">
                  <Radio
                    name="video_type"
                    inline
                    value="vimeo"
                    checked={videoForm.video_type === 'vimeo'}
                    onChange={this.handleChange.bind(this)}
                  >
                    Vimeo
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Radio>
                </span>
              </FormGroup>
              {showVideoUrl && (
                <FormGroup className="custom-form-group required hide-show-group">
                  <FormControl
                    name="video_url"
                    className="custom-form-control"
                    type="text"
                    placeholder="Enter URL"
                    value={videoForm.video_url}
                    onChange={this.handleChange.bind(this)}
                  />
                  {errors['video_url'] && (
                    <span className="input-error text-red">
                      {errors['video_url']}
                    </span>
                  )}
                </FormGroup>
              )}

              <FormGroup className="custom-form-group radio-wrapper">
                <ControlLabel className="custom-form-control-label">
                  Status
                </ControlLabel>
                <br />
                <span className="custom-radio-wrap">
                  <Radio
                    name="status"
                    inline
                    value="published"
                    checked={videoForm.status === 'published'}
                    onChange={this.handleChange.bind(this)}
                  >
                    publish
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Radio>
                </span>{' '}
                <span className="custom-radio-wrap">
                  <Radio
                    name="status"
                    inline
                    value="unpublished"
                    checked={videoForm.status === 'unpublished'}
                    onChange={this.handleChange.bind(this)}
                  >
                    unpublish
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Radio>
                </span>
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

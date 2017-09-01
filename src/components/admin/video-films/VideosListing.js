import React, { Component } from 'react';
import { Col, Button, Media } from 'react-bootstrap';

// Import component
import SweetAlert from 'sweetalert-react';
import VideoPopup from './VideoPopup';
import PlayVideo from './PlayVideo';

// Import services
import {
  getVideoFilms,
  deleteVideoFilm
} from '../../../services/admin/VideoFilms';

// Import helper
import { isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/video-films/video-films.css';

// Import plugin
var youtubeThumbnail = require('youtube-thumbnail');

export default class VideoFilms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editObject: {},
      videos: [],
      showPopup: false,
      showPlayVideo: false,
      alert: {
        objectId: '',
        show: false,
        cancelBtn: true,
        confirmAction: () => {},
        title: '',
        text: '',
        btnText: '',
        type: ''
      }
    };
  }

  componentWillMount() {
    var self = this;

    getVideoFilms()
      .then(function(response) {
        var data = response.data;
        if (response.status === 200) {
          self.setState({ videos: data.data.videos });
        }
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  showDialogueBox(id) {
    this.setState({
      alert: {
        objectId: id,
        show: true,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        btnText: 'Yes, delete it!',
        type: 'warning',
        confirmAction: () => this.deleteVideoFilm(),
        cancelBtn: true
      }
    });
  }

  hideDialogueBox() {
    this.setState({ alert: { show: false } });
  }

  deleteVideoFilm() {
    var self = this;

    deleteVideoFilm(self.state.alert.objectId)
      .then(function(response) {
        if (response.status === 200) {
          self.handleDeleteSuccessResponse(response);
        } else {
          self.handleDeleteErrorResponse(response);
        }
      })
      .catch(function(error) {
        self.handleDeleteErrorResponse(error.response);
      });
  }

  handleDeleteSuccessResponse(response) {
    var self = this;

    const videos = self.state.videos.filter(
      video => video.id !== self.state.alert.objectId
    );

    self.setState({
      videos: videos,
      alert: {
        show: true,
        title: 'Success',
        text: response.data.message,
        type: 'success',
        confirmAction: () => self.hideDialogueBox()
      }
    });
  }

  handleDeleteErrorResponse(response) {
    var self = this;

    self.setState({
      alert: {
        show: true,
        title: response.data.message,
        text: response.data.errors[0].detail,
        type: 'warning',
        confirmAction: () => self.hideDialogueBox()
      }
    });
  }

  renderVideo = (video, action) => {
    const { videos, editObject } = this.state;
    const newVideos = videos.slice();

    if (action === 'insert') {
      newVideos.splice(0, 0, video);
    } else if (action === 'replace' && !isObjectEmpty(editObject)) {
      newVideos.splice(newVideos.indexOf(editObject), 1, video);
    }
    this.setState({
      videos: newVideos
    });
  };

  getStatusClass(status) {
    if (status === 'published') {
      return 'text-green';
    } else if (status === 'unpublished') {
      return 'text-red';
    }
  }

  getVideoIcon(video_type) {
    if (video_type === 'youtube') {
      return require('../../../assets/images/admin/video-films/you-tube-icon.png');
    } else if (video_type === 'vimeo') {
      return require('../../../assets/images/admin/video-films/vimeo-icon.png');
    } else {
      return '';
    }
  }

  closePopup = () => {
    this.setState({ showPopup: false, editObject: {} });
  };
  closePlayVideo = () => {
    this.setState({ showPlayVideo: false, editObject: {} });
  };

  render() {
    const { videos, alert } = this.state;
    return (
      <Col xs={12} className="video-films-page-wrap">
        <SweetAlert
          show={alert.show || false}
          title={alert.title || ''}
          text={alert.text || ''}
          type={alert.type || 'success'}
          showCancelButton={alert.cancelBtn}
          confirmButtonText={alert.btnText}
          onConfirm={alert.confirmAction}
          onCancel={() => this.hideDialogueBox()}
        />
        {this.state.showPopup && (
          <VideoPopup
            showPopup={this.state.showPopup}
            closePopup={this.closePopup}
            renderVideo={this.renderVideo}
            editObject={this.state.editObject}
          />
        )}
        {this.state.showPlayVideo && (
          <PlayVideo
            video={this.state.editObject}
            showPlayVideo={this.state.showPlayVideo}
            closePlayVideo={this.closePlayVideo}
          />
        )}
        <Col xs={12} className="filter-wrap p-none">
          <Col xs={12} className="p-none">
            <Button
              className="btn btn-orange pull-right add-video-btn"
              onClick={() => this.setState({ showPopup: true })}
            >
              <i className="add-video-icon">
                <img
                  src={require('../../../assets/images/admin/album/add-icon.png')}
                  alt=""
                />
              </i>Add New
            </Button>
          </Col>
        </Col>
        <Col xs={12} className="p-none video-list">
          {videos.length === 0 && (
            <h4 className="text-center">No videos available</h4>
          )}
          {videos.map((video, index) => (
            <Col xs={12} className="videos-list-wrap p-none" key={video.id}>
              <Col xs={12} className="video-film-wrap">
                <Media>
                  <Media.Left align="top" className="video-thumb-wrap">
                    <a
                      onClick={() =>
                        this.setState({
                          showPlayVideo: true,
                          editObject: video
                        })}
                    >
                      <img
                        className="video-thumb"
                        src={youtubeThumbnail(video.video_url).default.url}
                        alt="Video thumb"
                      />
                      <img
                        className="video-thumb-icon"
                        src={require('../../../assets/images/admin/video-films/video-icon.png')}
                        alt="Video icon"
                      />
                    </a>
                  </Media.Left>
                  <Media.Body className="video-header-wrap">
                    <Media.Heading className="video-film-title">
                      {video.title}
                    </Media.Heading>

                    <Button
                      className="btn-link p-none video-action-btn video-edit-btn"
                      onClick={() =>
                        this.setState({
                          showPopup: true,
                          editObject: video
                        })}
                    >
                      <img
                        src={require('../../../assets/images/admin/album/edit-icon.png')}
                        alt=""
                      />
                    </Button>
                    {/*<Button className="btn-link p-none video-action-btn video-share-btn">
                      <img
                        src={require('../../../assets/images/admin/album/share-icon.png')}
                        alt=""
                      />
                    </Button>*/}

                    <Col xs={12} className="p-none updated-info">
                      <span className="fa fa-clock-o updated-icon" /> Last
                      updated on {video.updated_at}
                    </Col>
                    <Col xs={12} className="p-none video-separator">
                      <hr />
                    </Col>
                  </Media.Body>
                </Media>
                <Col xs={12} className="p-none video-count-main-wrap">
                  <Col xs={12} className="p-none">
                    <Col
                      lg={4}
                      sm={6}
                      xs={12}
                      className="video-detail-wrap type-wrap"
                    >
                      <span className="video-detail video-detail-title">
                        video Type
                      </span>
                      <span className="video-detail count-num">
                        <i className="video-type-icon">
                          <img
                            src={this.getVideoIcon(video.video_type)}
                            alt="video Type"
                          />
                        </i>
                        {video.video_type}
                      </span>
                    </Col>
                    <Col
                      lg={3}
                      sm={6}
                      xs={12}
                      className="video-detail-wrap video-count-wrap"
                    >
                      <span className="video-detail video-detail-title">
                        View Counts
                      </span>
                      <span className="video-detail video-count-num">0</span>
                    </Col>
                    <Col
                      lg={3}
                      sm={6}
                      xs={12}
                      className="video-detail-wrap video-status-wrap"
                    >
                      <span className="video-detail video-detail-title">
                        Status
                      </span>
                      <span
                        className={
                          'video-detail count-num ' +
                          this.getStatusClass(video.status)
                        }
                      >
                        {video.status}
                      </span>
                    </Col>
                  </Col>
                  <Button
                    className="btn-link p-none video-action-btn video-delete-btn"
                    onClick={() => this.showDialogueBox(video.id)}
                  >
                    <img
                      src={require('../../../assets/images/admin/album/delete-icon.png')}
                      alt=""
                    />
                  </Button>
                </Col>
              </Col>
            </Col>
          ))}
        </Col>
      </Col>
    );
  }
}

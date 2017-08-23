import React, { Component } from 'react';
import { Col, Button, Media, Pagination } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
// import AddVideo from './add-video';

// Import services
import {
  getVideoFilms,
  deleteVideoFilm
} from '../../../services/admin/VideoFilms';

// Import css
import '../../../assets/css/admin/video-films/video-films.css';

export default class VideoFilms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      CreateShow: false,
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

  CreateClose = () => this.setState({ CreateShow: false });

  handleSelect(eventKey, e) {
    this.setState({
      activePage: eventKey
    });
  }

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
        {/* <AddVideo
          showCreate={this.state.CreateShow}
          closeOn={this.CreateClose}
        /> */}
        <Col xs={12} className="filter-wrap p-none">
          <Col xs={12} className="p-none">
            <Button
              className="btn btn-orange pull-right add-video-btn"
              onClick={() => this.setState({ CreateShow: true })}
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
          {videos.length === 0 &&
            <h4 className="text-center">No videos available</h4>}
          {videos.map((video, index) =>
            <Col xs={12} className="videos-list-wrap p-none" key={video.id}>
              <Col xs={12} className="video-film-wrap">
                <Media>
                  <Media.Left align="top" className="video-thumb-wrap">
                    <a href="">
                      <img
                        className="video-thumb"
                        src={require('../../../assets/images/admin/video-films/video-thumb-1.png')}
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

                    <Button className="btn-link p-none video-action-btn video-edit-btn">
                      <img
                        src={require('../../../assets/images/admin/album/edit-icon.png')}
                        alt=""
                      />
                    </Button>
                    <Button className="btn-link p-none video-action-btn video-share-btn">
                      <img
                        src={require('../../../assets/images/admin/album/share-icon.png')}
                        alt=""
                      />
                    </Button>

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
          )}
        </Col>

        {/* <Col xs={12} className="p-none custom-pagination-wrap">
          <Pagination
            prev
            next
            ellipsis
            boundaryLinks
            items={10}
            maxButtons={3}
            activePage={this.state.activePage}
            onSelect={this.handleSelect}
            className="custom-pagination"
          />
        </Col> */}
      </Col>
    );
  }
}

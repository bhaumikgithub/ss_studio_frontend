import React, { Component } from 'react';
import { Col, Modal } from 'react-bootstrap';
import Iframe from 'react-iframe';

// Import css
import '../../../assets/css/admin/video-films/add-video/add-video.css';

export default class VideoPopup extends Component {
  render() {
    const video = this.props.video;
    return (
      <Modal
        show={this.props.showPlayVideo}
        className="add-videofilms-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header>
          <h4 className="p-none m-none">
            {video.title}
          </h4>

          <span
            className="close-modal-icon"
            onClick={this.props.closePlayVideo}
          >
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
        </Modal.Header>
        <Modal.Body className="add-videofilms-body p-none">
          <Col
            className="add-videofilms-content-wrap play-admin-video-film"
            sm={12}
          >
            <Iframe
              url={video.video_url}
              className="embed-responsive embed-responsive-16by9"
              display="initial"
              position="relative"
              allowFullScreen
              width="570px"
              height="450px"
            />
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

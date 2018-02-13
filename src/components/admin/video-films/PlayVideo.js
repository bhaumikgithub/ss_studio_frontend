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
            className="play-admin-video-film embed-responsive embed-responsive-16by9"
            sm={12}
          >
            <Iframe
              url={video.video_embed_url + '?rel=0&amp;showinfo=0'}
              className="embed-responsive-item"
              allowFullScreen
            />
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

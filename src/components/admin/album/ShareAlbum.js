import React, { Component } from 'react';
import { Col, Button, Modal, FormGroup, FormControl } from 'react-bootstrap';

// Import css
import '../../../assets/css/admin/album/share-album/share-album.css';

export default class ShareAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }
  updateState(element) {
    this.setState({ value: element });
  }

  render() {
    return (
      <Modal
        show={this.props.shareAlbum}
        className="share-album-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="share-album-body p-none">
          <span className="close-modal-icon" onClick={this.props.closeOn}>
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
          <Col className="share-title-wrap p-none" sm={5}>
            <Col xs={12} className="p-none share-album-title-details">
              <img
                src={require('../../../assets/images/admin/album/share-album/share-album-icon.png')}
                alt=""
                className="share-album-icon img-responsive"
              />
              <h4 className="create-album-text text-white">Share Album</h4>
            </Col>
          </Col>
          <Col className="modal-share-content-wrap" sm={7}>
            <div className="header-wrap">
              <div className="thumb-wrap">
                <img
                  src={require('../../../assets/images/admin/album/share-album/sare-album-thumb.png')}
                  className="link-icons"
                  alt=""
                />
              </div>
              <div className="text-wrap">
                <h3 className="title">Joy Birthday</h3>
                <p>2500 photos</p>
              </div>
            </div>

            <form className="share-album-form custom-form">
              <FormGroup className="custom-form-group">
                <FormControl
                  className="custom-form-control"
                  type="text"
                  placeholder="Enter a name or email address"
                />
              </FormGroup>
              <FormGroup className="custom-form-group">
                <FormControl
                  className="custom-form-control"
                  componentClass="textarea"
                  type="text"
                  placeholder="Type a message (Optional)"
                />
              </FormGroup>
              <Button type="submit" className="btn btn-orange share-submit">
                Save
              </Button>
            </form>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

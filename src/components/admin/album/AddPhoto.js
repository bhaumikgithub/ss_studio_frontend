import React, { Component } from 'react';
import { Col, Modal } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import DropzoneComponent from 'react-dropzone-component';

// Import service
import { uploadPhoto } from '../../../services/admin/Photo';

// Import css
import '../../../assets/css/admin/album/already-shared/already-shared.css';
import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';

export default class AlreadyShared extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.jpeg'],
      showFiletypeIcon: true,
      postUrl: '/photos'
    };
    this.djsConfig = {
      addRemoveLinks: true,
      allowedFiletypes: ['.jpg', '.png', '.jpeg'],
      autoProcessQueue: false
    };
    this.eventHandlers = { addedfile: file => this.handleUploadFile(file) };
  }

  handleUploadFile(file) {
    console.log(file);
    var params = {
      photo: [
        {
          image: file,
          imageable_id: 73,
          imageable_type: 'Album'
        }
      ]
    };
    // uploadPhoto(params)
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  }

  render() {
    return (
      <Modal
        show={this.props.addPhoto}
        className="shared-album-modal"
        aria-labelledby="contained-modal-title-lg"
        bsSize="large"
      >
        <Modal.Body className="shared-album-body p-none">
          <span className="close-modal-icon" onClick={this.props.closeOn}>
            <img
              src={require('../../../assets/images/admin/album/already-shared/close-icon.png')}
              alt=""
              className="hidden-xs"
            />
            <img
              src={require('../../../assets/images/admin/album/already-shared/close-icon-white.png')}
              alt=""
              className="visible-xs"
            />
          </span>
          <Col className="shared-content-wrap" sm={12}>
            <Scrollbars style={{ height: '220px' }}>
              <DropzoneComponent
                config={this.componentConfig}
                eventHandlers={this.eventHandlers}
                djsConfig={this.djsConfig}
              />
            </Scrollbars>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

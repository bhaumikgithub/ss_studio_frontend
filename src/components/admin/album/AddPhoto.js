import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Modal, Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import DropzoneComponent from 'react-dropzone-component';

// Import service
import { uploadPhoto } from '../../../services/admin/Photo';

// Import Helper
import { getIndex } from '../../Helper';

// Import css
import '../../../assets/css/admin/album/already-shared/already-shared.css';
import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';

export default class AlreadyShared extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', albumId: props.albumId, photos: [], id: '' };
    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.jpeg'],
      showFiletypeIcon: true,
      postUrl: 'no-url'
    };
    this.djsConfig = {
      addRemoveLinks: true,
      allowedFiletypes: ['.jpg', '.png', '.jpeg'],
      autoProcessQueue: false,
      params: {
        id: this.state.id
      }
    };
  }

  handleUploadFile(file) {
    var self = this;
    let data = new FormData();
    data.append('photo[][image]', file);
    data.append('photo[][imageable_id]', self.state.albumId);
    data.append('photo[][imageable_type]', 'Album');
    console.log(data);
    uploadPhoto(data)
      .then(function(response) {
        self.handleSuccessResponse(response, file);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  handleRemoveFile(file) {
    this.props.deletePhotos([file.id], 'Add photos');
    this.handlePhotoRendering(file, 'remove');
  }

  handlePhotoRendering(file, action, response = undefined) {
    var photos = this.state.photos;

    if (action === 'insert') {
      var newPhoto = response.data.data.photos[0];
      file.id = newPhoto.id;
      photos.push(newPhoto);
    } else if (action === 'remove') {
      var photoIndex = getIndex(file.id, photos, 'id');
      photos.splice(photoIndex, 1);
    }
    this.setState({ photos: photos });
  }

  handleSuccessResponse(response, file) {
    if (response.status === 201) {
      this.handlePhotoRendering(file, 'insert', response);
    }
  }

  handleOk() {
    this.props.renderNewPhotos(this.state.photos);
    this.props.closeOn();
  }

  render() {
    const eventHandlers = {
      addedfile: this.handleUploadFile.bind(this),
      removedfile: this.handleRemoveFile.bind(this)
    };
    return (
      <Modal
        show={this.props.addPhoto}
        className="shared-album-modal"
        aria-labelledby="contained-modal-title-lg"
        bsSize="large"
      >
        <Modal.Body className="shared-album-body p-none">
          <span className="close-modal-icon" onClick={() => this.handleOk()}>
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
                eventHandlers={eventHandlers}
                djsConfig={this.djsConfig}
              />
            </Scrollbars>
            <Col className="text-center p-none" sm={12}>
              <Button
                type="button"
                onClick={() => this.handleOk()}
                className="btn btn-orange create-album-cancel add-photo"
              >
                Ok
              </Button>
            </Col>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

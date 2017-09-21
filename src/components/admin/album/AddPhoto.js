import React, { Component } from 'react';
import { Col, Modal, Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import DropzoneComponent from 'react-dropzone-component';

// Import service
import { PhotoService } from '../../../services/Index';

// Import Helper
import { getIndex } from '../../Helper';

// Import css
import '../../../assets/css/admin/album/already-shared/already-shared.css';
import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';

export default class AlreadyShared extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      albumId: props.albumId,
      photos: [],
      id: '',
      photoCount: props.photoCount
    };
    this.dropzone = null;
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
    var dropzoneOptions = this.dropzone.options;
    const { photoCount, albumId } = self.state;
    data.append('photo[][image]', file);
    data.append('photo[][imageable_id]', albumId);
    data.append('photo[][imageable_type]', 'Album');
    self.setState({ photoCount: photoCount + 1 });
    if (photoCount === 0) {
      data.append('photo[][is_cover_photo]', true);
    }

    PhotoService.uploadPhoto(data, file, this.uploadProgress)
      .then(function(response) {
        self.handleSuccessResponse(response, file);
      })
      .catch(function(error) {
        const response = error.response;
        if (response && response.data.errors.length > 0) {
          file.previewElement.classList.add('dz-complete');
          dropzoneOptions.error(
            file,
            'Image ' + response.data.errors[1].detail
          );
        }
      });
  }

  uploadProgress = (file, progress) => {
    this.dropzone.options.uploadprogress(file, progress);
  };

  handleRemoveFile(file) {
    if (file.id) {
      this.props.deletePhotos([file.id], 'Add photos');
    }
    this.handlePhotoRendering(file, 'remove');
  }

  handlePhotoRendering(file, action, response = undefined) {
    var { photos } = this.state;

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
    var dropzoneOptions = this.dropzone.options;
    if (response.status === 201) {
      this.handlePhotoRendering(file, 'insert', response);
      file.previewElement.classList.add('dz-complete');
      dropzoneOptions.success(file);
    }
  }

  handleOk() {
    this.props.renderNewPhotos(this.state.photos);
    this.props.closeOn();
  }

  render() {
    const eventHandlers = {
      init: dz => (this.dropzone = dz),
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
          <Col className="shared-content-wrap" sm={12}>
            <Scrollbars style={{ height: '450px' }}>
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
                className="btn btn-orange create-album-submit add-photo"
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

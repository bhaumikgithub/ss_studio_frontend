import React, { Component } from 'react';
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
    this.dropzone = null;
    this.state = {
      value: '',
      albumId: props.albumId,
      photos: [],
      id: '',
      photoCount: props.photoCount
    };
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
  handleUploadProgress(file, progress) {
    console.log(file);
    console.log(progress);
  }
  handleUploadFile(file) {
    debugger;
    // var self = this;
    // let data = new FormData();
    // const { photoCount, albumId } = self.state;
    // data.append('photo[][image]', file);
    // data.append('photo[][imageable_id]', albumId);
    // data.append('photo[][imageable_type]', 'Album');
    // self.setState({ photoCount: photoCount + 1 });
    // if (photoCount === 0) {
    //   data.append('photo[][is_cover_photo]', true);
    // }

    // uploadPhoto(data)
    //   .then(function(response) {
    //     self.handleSuccessResponse(response, file);
    //   })
    //   .catch(function(error) {
    //     console.log(error.response);
    //   });
  }

  handleRemoveFile(file) {
    this.props.deletePhotos([file.id], 'Add photos');
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
      init: dz => (this.dropzone = dz),
      addedfile: this.handleUploadFile.bind(this),
      removedfile: this.handleRemoveFile.bind(this),
      uploadprogress: this.handleUploadProgress.bind(this)
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

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
      photoCount: props.photoCount,
      isDisplay: false,
      maxWidth: 1200,
      maxHeight: 600
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

  base64ToFile(dataURI, origFile) {
    var byteString, mimestring;
    if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = decodeURI(dataURI.split(',')[1]);
    }
    mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var content = [];
    for (var i = 0; i < byteString.length; i++) {
      content[i] = byteString.charCodeAt(i);
    }
    var newFile = new File(
      [new Uint8Array(content)], origFile.name, {type: mimestring}
    );

    // Copy props set by the dropzone in the original file
    var origProps = [
      "upload", "status", "previewElement", "previewTemplate", "accepted"
    ];
    origProps.map((object, index) => {
      newFile[object] = origFile[object]
      return newFile
    })
    return newFile;
  }

  resizeImage(event,file){
    var self = this;
    var width  = event.target.width;
    var height = event.target.height;
    // Don't resize if it's small enough
    if (width <= self.state.maxWidth && height <= self.state.maxHeight) {
      self.dropzone.enqueueFile(file);
      return;
    }
    // Calc new dims otherwise
    if(width > 1500){
      if (width > height) {
        if (width > self.state.maxWidth) {
          height *= self.state.maxWidth / width;
          width = self.state.maxWidth;
        }
      } else {
        if (height > self.state.maxHeight) {
          width *= self.state.maxHeight / height;
          height = self.state.maxHeight;
        }
      }
    }
    return { width: width, height: height }
  }

  handleUploadFile(file) {
    var self = this
    var reader = new FileReader();
    reader.addEventListener("load", function(event) {
      var origImg = new Image();
      origImg.src = event.target.result;
      origImg.addEventListener("load", function(event) {
        var newImage = self.resizeImage(event,file)
        // Resize
        var canvas = document.createElement('canvas');
        canvas.width = newImage.width;
        canvas.height = newImage.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(origImg, 0, 0, newImage.width, newImage.height);
        var resizedFile = self.base64ToFile(canvas.toDataURL(), file);

        // Replace original with resized
        var origFileIndex = self.dropzone.files.indexOf(file);
        self.dropzone.files[origFileIndex] = resizedFile;
        self.setState({isDisplay: true})
        if(self.state.isDisplay === true){
          self.uploadNewImage(resizedFile)
        }
      });
    });
    reader.readAsDataURL(file);
  }

  uploadNewImage(file){
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

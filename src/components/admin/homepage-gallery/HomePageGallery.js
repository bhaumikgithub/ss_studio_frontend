import React, { Component } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
import HomepagePopup from './HomepagePopup';
import CreateHomepagePopup from './CreateHomepagePopup';
// Import services
import { HomePageGalleryService } from '../../../services/Index';

// Import helper
import { setLoader } from '../../Helper';

// Import css
import '../../../assets/css/admin/homepage_gallery/homepage-gallery.css';

export default class HomePageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active_photos: [],
      homepage_photo: {},
      showPopup: false,
      editObject: {},
      showCreatePopup: false,
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
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentWillMount() {
    var self = this;

    HomePageGalleryService.getHomepagePhotos()
      .then(function(response) {
        var data = response.data;
        self.setState({ active_photos: data.data.active_photos });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  handleUploadFile = (e, index, id) => {
    e.preventDefault();
    setLoader({ elementId: 'image-loader-' + index, styleProperty: 'block' });

    var self = this;
    let file = e.target.files[0];
    let data = new FormData();
    data.append('homepage_photo[homepage_image]', file);

    HomePageGalleryService.updateHomepagePhoto(data, id)
      .then(function(response) {
        self.handleSuccessResponse(response, index);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  };

  handleImageChange(e, index) {
    var inputField = this.refs['editHomeImage' + index];
    inputField.click();
  }

  handleSuccessResponse(response, index) {
    if (response.status === 201) {
      this.handlePhotoRendering(response, index);
    }
  }

  handlePhotoRendering(response, index) {
    const activePhotos = Object.assign([], this.state.active_photos);
    activePhotos[index] = response.data.data.homepage_photo;
    setLoader({ elementId: 'image-loader-' + index, styleProperty: 'none' });
    this.setState({ active_photos: activePhotos });
  }

  renderPhoto = (photo, action) => {
    const self = this
    const { active_photos, editObject } = self.state;
    const activePhotos = active_photos.slice();
    if (action === 'insert') {
      active_photos.splice(0, 0, photo);
      this.setState({ active_photos: active_photos });
    }else {
      activePhotos[activePhotos.indexOf(editObject.photo)] = photo;
      this.setState({ active_photos: activePhotos });
    }
  }

  closePopup = () => {
    this.setState({ showPopup: false, editObject: {} });
  };

  closeCreatePopup = () => {
    this.setState({ showCreatePopup: false, editObject: {} });
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
        confirmAction: () => this.deleteHomepagePhoto(),
        cancelBtn: true
      }
    });
  }

  hideDialogueBox() {
    this.setState({ alert: { show: false } });
  }
  
  deleteHomepagePhoto() {
    var self = this;

    HomePageGalleryService.deleteHomepagePhoto(self.state.alert.objectId)
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

    const active_photos = self.state.active_photos.filter(
      active_photo => active_photo.id !== self.state.alert.objectId
    );

    self.setState({
      active_photos: active_photos,
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

  render() {
    const { alert, active_photos } = this.state;
    return (
      <Col xs={12} className="homepage-gallery-page-wrap">
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
        {this.state.showCreatePopup && (
          <CreateHomepagePopup
            showCreatePopup={this.state.showCreatePopup}
            closeCreatePopup={this.closeCreatePopup}
            renderPhoto={this.renderPhoto}
          />
        )}
        {this.state.showPopup && (
          <HomepagePopup
            showPopup={this.state.showPopup}
            closePopup={this.closePopup}
            editObject={this.state.editObject}
            renderPhoto={this.renderPhoto}
          />
        )}
        <Row>
          <Col xs={12} className="filter-wrap p-none album-listing-title-wrap">
            <Col xs={12} className="p-none">
              <Button
                className="btn pull-right btn-green create-album-btn"
                onClick={() => this.setState({ showCreatePopup: true })}
              >
                <i className="fa fa-plus add-icon" />Add Photo
              </Button>
            </Col>
          </Col>
          <Col xs={12} className="homepage-gallery">
            <Col xs={12} className="slider-images-wrap disable-scrollbar">
              {active_photos.map((photo, index) => (
                <Col
                  xs={6}
                  sm={4}
                  md={4}
                  lg={3}
                  className="gallery-slider-img-wrap"
                  key={photo.id}
                >
                  <div className="loader-overlay" id={'image-loader-' + index}>
                    <img
                      src={require('../../../assets/images/loader.gif')}
                      alt="loading"
                      className="loader"
                    />
                  </div>
                  <img
                    className="img-responsive album-image"
                    src={photo.homepage_image}
                    alt={photo.homepage_image_file_name}
                  />
                  <div className="slider-num">
                    slide {index + 1}
                    <a
                      className="edit-slide"
                      onClick={event => this.handleImageChange(event, index)}
                    >
                      <i className="fa fa-pencil-square-o" aria-hidden="true" />
                      <input
                        type="file"
                        ref={'editHomeImage' + index}
                        className="custom-photo-edit"
                        onChange={e =>
                          this.handleUploadFile(e, index, photo.id)}
                      />
                    </a>
                    <a
                      className="edit-slide edit-slide-margin"
                      onClick={() =>
                        this.setState({
                          showPopup: true,
                          editObject: {photo}
                        })
                      }
                    >
                      <i className="fa fa-pencil" aria-hidden="true" />
                    </a>

                    <a
                      className="edit-slide delete-slide-margin"
                      onClick={event => this.showDialogueBox(photo.id)}
                    >
                      <i className="fa fa-trash" aria-hidden="true" />
                    </a>
                  </div>
                </Col>
              ))}
            </Col>
          </Col>
        </Row>
      </Col>
    );
  }
}

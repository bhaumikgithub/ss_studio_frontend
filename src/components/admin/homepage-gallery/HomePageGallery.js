import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import HomepagePopup from './HomepagePopup';
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
      showPopup: false
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

  closePopup = () => {
    this.setState({ showPopup: false, editObject: {} });
  };

  render() {
    const { active_photos } = this.state;
    return (
      <Col xs={12} className="homepage-gallery-page-wrap">
        {this.state.showPopup && (
          <HomepagePopup
            showPopup={this.state.showPopup}
            closePopup={this.closePopup}
            editObject={this.state.editObject}
          />
        )}
        <Row>
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
                          editObject: {active_photos}
                        })
                      }
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

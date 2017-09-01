import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

// Import services
import {
  getHomepagePhotos,
  updateHomepagePhoto
} from '../../../services/admin/HomePageGallery';

// Import helper
import { setLoader } from '../../Helper';

// Import css
import '../../../assets/css/admin/homepage_gallery/homepage-gallery.css';

export default class HomePageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active_photos: [],
      homepage_photo: {}
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentWillMount() {
    var self = this;

    getHomepagePhotos()
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

    updateHomepagePhoto(data, id)
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

  render() {
    const { active_photos } = this.state;
    return (
      <Col xs={12} className="homepage-gallery-page-wrap">
        <Row>
          <Col xs={12} className="homepage-gallery">
            <Col xs={12} className="slider-images-wrap disable-horizontal">
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
                      <img
                        className="img-responsive"
                        alt=""
                        src={require('../../../assets/images/admin/homepage_gallery/img-edit-icon.png')}
                      />
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

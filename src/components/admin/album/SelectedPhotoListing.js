import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

// Import services
import { AlbumService } from '../../../services/Index';

// Import css
import '../../../assets/css/admin/album/album-details/album-details.css';

export default class SelectedPhotoListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albumSlug: this.props.match.params.slug,
      photos: []
    };
  }

  componentWillMount() {
    if (
      this.props.location.query &&
      this.props.location.query.commented_photos
    ) {
      this.getCommentedPhotos();
    } else {
      this.getSelectedPhotos();
    }
  }

  getCommentedPhotos() {
    var self = this;
    AlbumService.getCommentedPhotos(self.state.albumSlug).then(function(
      response
    ) {
      if (response.status === 200) {
        self.setState({ photos: response.data.data.photos });
      }
    });
  }

  getSelectedPhotos() {
    var self = this;
    AlbumService.getSelectedPhotos(self.state.albumSlug).then(function(
      response
    ) {
      if (response.status === 200) {
        self.setState({ photos: response.data.data.photos });
      }
    });
  }

  render() {
    const { photos } = this.state;
    return (
      <Col xs={12} className="album-details-main-wrap">
        <Col xs={12} className="album-details-outer-wrap p-none">
          {photos &&
            photos.map((photo, index) => (
              <Col
                xs={6}
                sm={4}
                md={4}
                lg={2}
                className={
                  'album-image-wrap no-m-l-r album-photo-thumbs-wrap portfolio-album-thub-wrap selected-photo-wrap'
                }
                key={photo.id}
              >
                <Col xs={12} className="album-photo-thumbs p-none">
                  <img
                    className="img-responsive album-image"
                    src={photo.image}
                    alt={photo.image_file_name}
                  />
                </Col>
              </Col>
            ))}
        </Col>
      </Col>
    );
  }
}

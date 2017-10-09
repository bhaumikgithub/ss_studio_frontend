import React, { Component } from 'react';
import { Carousel, Grid, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

// Import services
import { HomePageGalleryService } from '../services/Index';

// Import components
import PhotoLoader from './loader/PhotoLoader';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      loadedPhotos: []
    };
  }

  componentDidMount() {
    var self = this;

    HomePageGalleryService.getActiveHomepagePhotos().then(function(response) {
      if (response.status === 200) {
        self.setState({ photos: response.data.data.active_photos });
      }
    });
  }

  onLoadImage(photo) {
    this.setState(({ loadedPhotos }) => {
      return { loadedPhotos: loadedPhotos.concat(photo) };
    });
  }

  render() {
    const { photos, loadedPhotos } = this.state;
    return (
      <div
        className={
          photos.length > loadedPhotos.length ? 'custom-loader page-wrap' : ''
        }
      >
        {photos.length > loadedPhotos.length && <PhotoLoader />}
        <Grid fluid={true} className="home-slider">
          <Row>
            <Col xs={12} className="p-none">
              <Carousel
                id="carousel-example-generic"
                data-ride="carousel"
                controls={false}
              >
                {loadedPhotos.map((photo, index) => (
                  <Carousel.Item className="full-screen" key={photo.id}>
                    <div
                      className="slider-img"
                      style={{
                        backgroundImage: 'url(' + photo.homepage_image + ')'
                      }}
                    />
                    <Carousel.Caption className="custom-carousel-caption">
                      <p>
                        We Capture <span>Memories..</span>
                      </p>
                      <NavLink
                        to="/portfolio"
                        className="btn btn-default outline-btn slider-btn"
                      >
                        view our work
                      </NavLink>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
              <div className="hidden">
                {photos.map((photo, i) => (
                  <img
                    alt={photo.homepage_image_file_name}
                    src={photo.homepage_image}
                    onLoad={this.onLoadImage.bind(this, photo)}
                    key={i}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;

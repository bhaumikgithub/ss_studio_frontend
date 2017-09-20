import React, { Component } from 'react';
import { Carousel, Grid, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

// Import services
import { HomePageGalleryService } from '../services/Index';

// Import helper
import { setLoader } from './Helper';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
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

  handleImageLoaded(index) {
    setLoader({
      elementId: 'image-loader-' + index,
      styleProperty: 'block'
    });
  }

  render() {
    const photos = this.state.photos;
    return (
      <Grid fluid={true} className="home-slider">
        <Row className="row">
          <Col xs={12} className="p-none">
            <Carousel
              id="carousel-example-generic"
              data-ride="carousel"
              controls={false}
            >
              {photos.map((photo, index) => (
                <Carousel.Item className="full-screen" key={photo.id}>
                  <Col className="overlay" />
                  <div
                    className="loader-overlay image-loader-overlay"
                    id={'image-loader-' + index}
                  >
                    <img
                      src={require('../assets/images/loader.gif')}
                      alt="loading"
                      className="homepage-loader"
                    />
                  </div>
                  <img
                    src={photo.homepage_image}
                    alt={photo.homepage_image_file_name}
                    onLoad={() => this.handleImageLoaded(index)}
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
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;

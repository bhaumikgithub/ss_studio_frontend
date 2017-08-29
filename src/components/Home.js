import React, { Component } from 'react';
import { Carousel, Grid, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

// Import services
import { getHomepagePhotos } from '../services/Home';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    var self = this;

    getHomepagePhotos().then(function(response) {
      if (response.status === 200) {
        self.setState({ photos: response.data.data.active_photos });
      }
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
              {photos.map(photo => (
                <Carousel.Item className="full-screen" key={photo.id}>
                  <Col className="overlay" />
                  <img
                    src={photo.homepage_image}
                    alt={photo.homepage_image_file_name}
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

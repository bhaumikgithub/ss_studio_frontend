import React, { Component } from 'react';
import { Carousel, Grid, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

// Import services
import { HomePageGalleryService } from '../services/Index';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    var self = this;
    var user = this.props.match.params.user
    HomePageGalleryService.getActiveHomepagePhotos({user: user}).then(function(response) {
      if (response.status === 200) {
        self.setState({ photos: response.data.data.active_photos });
      }
    });
  }

  render() {
    const { photos } = this.state;
    return (
      <Grid fluid={true} className="home-slider">
        <Row>
          <Col xs={12} className="p-none">
            <Carousel
              id="carousel-example-generic"
              data-ride="carousel"
              controls={false}
            >
              {photos.map((photo, index) => (
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
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;

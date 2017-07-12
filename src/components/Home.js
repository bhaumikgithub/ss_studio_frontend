import React, { Component } from 'react';
import { Carousel, Grid, Col, Row } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
        <Grid fluid={true} className="home-slider">
          <Row className="row">
            <Col xs={12} className="p-none">
              <Carousel id="carousel-example-generic" data-ride="carousel" controls={false} >
                <Carousel.Item className="full-screen">
                  <Col className="overlay" />
                  <img src={require('../assets/images/slider-img-1.png')} alt="" />
                  <Carousel.Caption className="custom-carousel-caption">
                    <p>
                      We Capture <span>Memories..</span>
                    </p>
                    <a href="" className="btn btn-default outline-btn slider-btn" >
                      view our work
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="full-screen">
                  <Col className="overlay" />
                  <img src={require('../assets/images/slider-img-2.png')} alt="" />
                  <Carousel.Caption className="custom-carousel-caption">
                    <p>
                      We Capture <span>Memories..</span>
                    </p>
                    <a href="" className="btn btn-default outline-btn slider-btn" >
                      view our work
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="full-screen">
                  <Col className="overlay" />
                  <img src={require('../assets/images/slider-img-3.png')} alt="" />
                  <Carousel.Caption className="custom-carousel-caption">
                    <p>
                      We Capture <span>Memories..</span>
                    </p>
                    <a href="" className="btn btn-default outline-btn slider-btn" >
                      view our work
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="full-screen">
                  <Col className="overlay" />
                  <img src={require('../assets/images/slider-img-4.png')} alt="" />
                  <Carousel.Caption className="custom-carousel-caption">
                    <p>
                      We Capture <span>Memories..</span>
                    </p>
                    <a href="" className="btn btn-default outline-btn slider-btn" >
                      view our work
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="full-screen">
                  <Col className="overlay" />
                  <img src={require('../assets/images/slider-img-5.png')} alt="" />
                  <Carousel.Caption className="custom-carousel-caption">
                    <p>
                      We Capture <span>Memories..</span>
                    </p>
                    <a href="" className="btn btn-default outline-btn slider-btn" >
                      view our work
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Grid>
    );
  }
}

export default Home;

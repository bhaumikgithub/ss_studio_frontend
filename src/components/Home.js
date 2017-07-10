import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <section className="home-slider">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 p-none">
              <Carousel
                id="carousel-example-generic"
                data-ride="carousel"
                controls={false}
              >
                <Carousel.Item className="full-screen">
                  <div className="overlay" />
                  <img
                    src={
                      process.env.PUBLIC_URL + '/assets/images/slider-img-1.png'
                    }
                    alt=""
                  />
                  <Carousel.Caption className="custom-carousel-caption">
                    <p>
                      We Capture <span>Memories..</span>
                    </p>
                    <a
                      href=""
                      className="btn btn-default outline-btn slider-btn"
                    >
                      view our work
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="full-screen">
                  <div className="overlay" />
                  <img
                    src={
                      process.env.PUBLIC_URL + 'assets/images/slider-img-2.png'
                    }
                    alt=""
                  />
                  <Carousel.Caption className="custom-carousel-caption">
                    <p>
                      We Capture <span>Memories..</span>
                    </p>
                    <a
                      href=""
                      className="btn btn-default outline-btn slider-btn"
                    >
                      view our work
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="full-screen">
                  <div className="overlay" />
                  <img
                    src={
                      process.env.PUBLIC_URL + 'assets/images/slider-img-3.png'
                    }
                    alt=""
                  />
                  <Carousel.Caption className="custom-carousel-caption">
                    <p>
                      We Capture <span>Memories..</span>
                    </p>
                    <a
                      href=""
                      className="btn btn-default outline-btn slider-btn"
                    >
                      view our work
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="full-screen">
                  <div className="overlay" />
                  <img
                    src={
                      process.env.PUBLIC_URL + 'assets/images/slider-img-4.png'
                    }
                    alt=""
                  />
                  <Carousel.Caption className="custom-carousel-caption">
                    <p>
                      We Capture <span>Memories..</span>
                    </p>
                    <a
                      href=""
                      className="btn btn-default outline-btn slider-btn"
                    >
                      view our work
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="full-screen">
                  <div className="overlay" />
                  <img
                    src={
                      process.env.PUBLIC_URL + 'assets/images/slider-img-5.png'
                    }
                    alt=""
                  />
                  <Carousel.Caption className="custom-carousel-caption">
                    <p>
                      We Capture <span>Memories..</span>
                    </p>
                    <a
                      href=""
                      className="btn btn-default outline-btn slider-btn"
                    >
                      view our work
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;

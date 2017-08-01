import React, { Component } from 'react';
import { PageHeader, Carousel, Grid, Col } from 'react-bootstrap';

// Import css
import '../assets/css/feedback.css';

// Import services
import { getFeedbacks } from '../services/Feedback';

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: []
    };
  }

  componentDidMount() {
    var self = this;

    getFeedbacks().then(function(response) {
      if (response.status === 200) {
        console.log(response.data.data.testimonials);
        self.setState({ feedbacks: response.data.data.testimonials });
      }
    });
  }

  render() {
    const feedbacks = this.state.feedbacks;
    var Rating = require('react-rating');
    return (
      <div className="page-wrap feedback-wrap">
        <Grid>
          <Col xs={12}>
            <PageHeader className="page-title page-main-title text-center">
              <label>
                <span className="text-white">what our </span> client says
              </label>
            </PageHeader>
          </Col>
          <Col xs={12}>
            <Carousel className="feedback-carousel">
              {feedbacks.map(feedback =>
                <Carousel.Item className="feedback-item" key={feedback.id}>
                  <Col xs={12} sm={4} className="feedback-img-wrap">
                    <img
                      className="feedback-img img-responsive"
                      src={feedback.photo.image}
                      alt="user"
                    />
                  </Col>
                  <Col
                    xs={12}
                    sm={8}
                    className="text-white feedback-content-wrap"
                  >
                    <h4 className="feedback-title">
                      {feedback.client_name}
                    </h4>
                    <p>
                      {feedback.message}
                    </p>
                    <Rating
                      className="feedback-rating"
                      empty="fa fa-star-o"
                      full="fa fa-star"
                      fractions={2}
                      initialRate={4.5}
                      readonly={true}
                    />
                  </Col>
                </Carousel.Item>
              )}
              {/* <Carousel.Item className="feedback-item">
                <Col xs={12} sm={4} className="feedback-img-wrap">
                  <img
                    className="feedback-img img-responsive"
                    src={require('../assets/images/feedback/feedback-thumb.png')}
                    alt="user"
                  />
                </Col>
                <Col
                  xs={12}
                  sm={8}
                  className="text-white feedback-content-wrap"
                >
                  <h4 className="feedback-title">Hemali gadani</h4>
                  <p>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                    scelerisque ante sollicitudin commodo. Cras purus odio,
                    vestibulum in vulputate at, tempus viverra turpis. Fusce
                    condimentum nunc ac nisi vulputate fringilla.
                  </p>
                  <Rating
                    className="feedback-rating"
                    empty="fa fa-star-o"
                    full="fa fa-star"
                    fractions={2}
                    initialRate={4.5}
                    readonly={true}
                  />
                </Col>
              </Carousel.Item>

              <Carousel.Item className="feedback-item">
                <Col xs={12} sm={4} className="feedback-img-wrap">
                  <img
                    className="feedback-img img-responsive"
                    src={require('../assets/images/feedback/feedback-thumb.png')}
                    alt="user"
                  />
                </Col>
                <Col
                  xs={12}
                  sm={8}
                  className="text-white feedback-content-wrap"
                >
                  <h4 className="feedback-title">Hemali gadani</h4>
                  <p>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                    scelerisque ante sollicitudin commodo. Cras purus odio,
                    vestibulum in vulputate at, tempus viverra turpis. Fusce
                    condimentum nunc ac nisi vulputate fringilla.
                  </p>
                  <Rating
                    className="feedback-rating"
                    empty="fa fa-star-o"
                    full="fa fa-star"
                    fractions={2}
                    initialRate={2.5}
                    readonly={true}
                  />
                </Col>
              </Carousel.Item>

              <Carousel.Item className="feedback-item">
                <Col xs={12} sm={4} className="feedback-img-wrap">
                  <img
                    className="feedback-img img-responsive"
                    src={require('../assets/images/feedback/feedback-thumb.png')}
                    alt="user"
                  />
                </Col>
                <Col
                  xs={12}
                  sm={8}
                  className="text-white feedback-content-wrap"
                >
                  <h4 className="feedback-title">Hemali gadani</h4>
                  <p>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                    scelerisque ante sollicitudin commodo. Cras purus odio,
                    vestibulum in vulputate at, tempus viverra turpis. Fusce
                    condimentum nunc ac nisi vulputate fringilla.
                  </p>
                  <Rating
                    className="feedback-rating"
                    empty="fa fa-star-o"
                    full="fa fa-star"
                    fractions={2}
                    initialRate={5}
                    readonly={true}
                  />
                </Col>
              </Carousel.Item> */}
            </Carousel>
          </Col>
        </Grid>
      </div>
    );
  }
}

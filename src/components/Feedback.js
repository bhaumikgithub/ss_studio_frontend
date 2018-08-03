import React, { Component } from 'react';
import { PageHeader, Carousel, Grid, Col } from 'react-bootstrap';

// Import css
import '../assets/css/feedback.css';

// Import services
import { TestimonialService } from '../services/Index';

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: []
    };
  }

  componentDidMount() {
    var self = this;

    TestimonialService.getFeedbacks().then(function(response) {
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
              {feedbacks.map(feedback => (
                <Carousel.Item className="feedback-item" key={feedback.id}>
                  <Col xs={12} sm={4} className="feedback-img-wrap">
                    <img
                      className="feedback-img img-responsive"
                      src={feedback.photo && feedback.photo.image}
                      alt="user"
                    />
                  </Col>
                  <Col
                    xs={12}
                    sm={8}
                    className="text-white feedback-content-wrap"
                  >
                    <h4 className="feedback-title">{feedback.client_name}</h4>
                    <p>{feedback.message}</p>
                    <Rating
                      className="feedback-rating"
                      empty="fa fa-star-o"
                      full="fa fa-star"
                      fractions={2}
                      initialRate={feedback.rating}
                      readonly={true}
                    />
                  </Col>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Grid>
      </div>
    );
  }
}

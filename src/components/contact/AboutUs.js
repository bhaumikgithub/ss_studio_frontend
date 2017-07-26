import React, { Component } from 'react';
import { PageHeader, Grid, Col, Button } from 'react-bootstrap';

import '../../assets/css/contact/about-us.css';

export default class AboutUs extends Component {
  render() {
    return (
      <div className="page-wrap about-page-wrap">
        <Grid>
          <Col xs={12}>
            <PageHeader className="page-title page-main-title text-center">
              <label>
                <span className="text-grey">about </span> us
              </label>
            </PageHeader>
          </Col>
          <Col xs={12} className="p-none">
            <Col xs={12} sm={4} className="about-img-wrap">
              <img
                className="img-responsive"
                src={require('../../assets/images/about/about-thumb.png')}
                alt="user"
              />
            </Col>
            <Col xs={12} sm={8} className="text-grey">
              <Col xs={12} className="about-details-wrap">
                <h3 className="about-title">
                  A young photographer taking lovely shots.
                </h3>
                <p>
                  we are capture best moments which is impossible to recapture..
                  Wedding Photography, Weding Videography, Candid Photography,
                  Birthday party, Candid Video, Short Film, Wedding Highlight,
                  Portrait Songs, Pre-wedding Songs, model Photography,
                  indoor/outdoor Photography, Product Photography, Making
                  Brochure Design, etc...
                </p>
                <p>
                  I have worked with over the year........ Stay in touch with
                  Sagar Gadani. Thank you for visiting the website.
                </p>
              </Col>
              <Col className="media-icons" xs={12}>
                <a href="" className="btn btn-grey btn-round media-link">
                  <span className="fa fa-facebook" />
                </a>
                <a href="" className="btn btn-grey btn-round media-link">
                  <span className="fa fa-tumblr" />
                </a>
              </Col>
              <Col xs={12} className="hire-wrap">
                <Button className="btn btn-orange hire-btn">hire me</Button>
              </Col>
            </Col>
          </Col>
        </Grid>
      </div>
    );
  }
}

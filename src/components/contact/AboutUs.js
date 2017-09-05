import React, { Component } from 'react';
import { PageHeader, Grid, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Import css
import '../../assets/css/contact/about-us.css';

// Import services
import { getAboutUs } from '../../services/Contact';

export default class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutUs: []
    };
  }

  componentWillMount() {
    var self = this;
    console.log(self);

    getAboutUs().then(function(response) {
      if (response.status === 200) {
        self.setState({ aboutUs: response.data.data.about_us });
      }
    });
  }

  render() {
    const aboutUs = this.state.aboutUs;
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
              {aboutUs.photo && (
                <img
                  className="img-responsive"
                  src={aboutUs.photo.image}
                  alt="user"
                />
              )}
            </Col>
            <Col xs={12} sm={8} className="text-grey">
              <Col xs={12} className="about-details-wrap">
                <h3 className="about-title">{aboutUs.title_text}</h3>
                <p className="p-wrap">{aboutUs.description}</p>
              </Col>
              {aboutUs.social_links && (
                <Col className="media-icons" xs={12}>
                  <a
                    target="_blank"
                    href={aboutUs.social_links.facebook_link}
                    className="btn btn-grey btn-round media-link"
                  >
                    <span className="fa fa-facebook" />
                  </a>
                  {/* <a
                    target="_blank"
                    href={aboutUs.social_links.twitter_link}
                    className="btn btn-grey btn-round media-link"
                  >
                    <span className="fa fa-tumblr" />
                  </a> */}
                </Col>
              )}
              <Col xs={12} className="hire-wrap">
                <LinkContainer
                  to="/contact"
                  className="btn btn-orange hire-btn"
                >
                  <span>hire me</span>
                </LinkContainer>
              </Col>
            </Col>
          </Col>
        </Grid>
      </div>
    );
  }
}

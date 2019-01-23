import React, { Component } from 'react';
import { PageHeader, Grid, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { SocialIcon } from 'react-social-icons';

// Import css
import '../../assets/css/contact/about-us.css';

// Import services
import { AboutService } from '../../services/Index';

export default class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutUs: [],
      socialMedia: {}
    };
  }

  componentWillMount() {
    var self = this;
    var user = self.props.match.params.user;
    AboutService.getAboutUsDetail({user: user, onlyAPI: true}).then(function(response) {
      if (response.status === 200) {
        self.setState({
          aboutUs: response.data.data.about_us,
          socialMedia: response.data.data.about_us.social_links
        });
      }
    });
  }

  render() {
    const { aboutUs, socialMedia } = this.state;
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
                <p
                  dangerouslySetInnerHTML={{ __html: aboutUs.description }}
                  className="p-wrap"
                />
              </Col>
              <Col className="media-icons" xs={12}>
                {socialMedia &&
                  Object.keys(socialMedia).map(
                    (social_link, index) =>
                      socialMedia[social_link] !== '' ? (
                        <SocialIcon
                          url={socialMedia[social_link]}
                          className="btn btn-round media-link"
                          key={index}
                        />
                      ) : (
                        ''
                      )
                  )}
              </Col>

              <Col xs={12} className="hire-wrap">
                <LinkContainer
                  to={"/"+this.props.match.params.user+"/contact"}
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

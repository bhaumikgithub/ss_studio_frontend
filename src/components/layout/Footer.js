import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';

// Import services
import { AboutService } from '../../services/Index';
import { SocialIcon } from 'react-social-icons';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socialMedia: {}
    };
  }

  componentWillMount() {
    var self = this;
    AboutService.getAboutUs().then(function(response) {
      if (response.status === 200) {
        self.setState({
          socialMedia: response.data.data.about_us.social_links
        });
      }
    });
  }
  render() {
    return (
      <Col>
        <div className="social_media_btn">
          {/* <a
            href="https://www.facebook.com/sagarphotocam"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={require('../../assets/images/fb_btn.png')}
              alt=""
              className="facebook-img"
            />
          </a> */}
          <Col className="media-icons" xs={12}>
            {this.state.socialMedia &&
              Object.keys(this.state.socialMedia).map(
                (social_link, index) =>
                  this.state.socialMedia[social_link] !== '' ? (
                    <SocialIcon
                      url={this.state.socialMedia[social_link]}
                      className={social_link + " btn media-link"}
                      key={index}
                    />
                  ) : (
                    ''
                  )
            )}
          </Col>
        </div>
        <Col xs={12} className="custom-footer">
          <Grid className="custom-container">
            <Col sm={6} className="content">
              © Copyright 2017 - Sagar Gadani , All rights reserved
            </Col>

            <Col sm={6} className="content">
              <Col className="text-right">
                Designed By{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://techplussoftware.com/"
                >
                  Techplus Software Pvt. Ltd.
                </a>
              </Col>
            </Col>
          </Grid>
        </Col>
      </Col>
    );
  }
}

export default Footer;

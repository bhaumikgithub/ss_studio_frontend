import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import { isObjectEmpty } from '../Helper'

// Import services
import { AboutService, WebsiteDetailService } from '../../services/Index';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.match.params.user,
      socialMedia: {},
      websiteDetail: {}
    }
  }
  componentWillMount() {
    var self = this
    AboutService.getAboutUsDetail({user: self.state.user}).then(function(response) {
      if (response.status === 200) {
        self.setState({
          socialMedia: response.data.data.about_us.social_links.facebook_link
        });
      }
    });
    WebsiteDetailService.getWebsiteDetails({user: self.state.user}).then(function(response) {
      if (response.status === 200) {
        self.setState({
          websiteDetail: response.data.data.website_detail
        });
      }
    });
  }
  render() {
    return (
      <Col xs={12} className="custom-footer">
        <Grid className="custom-container">
          <Col sm={6} className="content">
            {this.state.websiteDetail ? this.state.websiteDetail.copyright_text : "© Copyright 2018 - AfterClix , All rights reserved"}
          </Col>

          <Col sm={6} className="content">
            <Col className="text-right">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.afterclix.com/"
              >
                Powered by AfterClix
              </a>
            </Col>
          </Col>
          {this.state.socialMedia && 
            <div className="fb_btn">
              <a
                href={!isObjectEmpty(this.state.socialMedia) && this.state.socialMedia.includes("http") ? this.state.socialMedia : 'http://'+this.state.socialMedia}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={require('../../assets/images/fb_btn.png')}
                  alt=""
                  className="facebook-img"
                />
              </a>
            </div>
          }
        </Grid>
      </Col>
    );
  }
}

export default Footer;

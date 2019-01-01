import React, { Component } from 'react';
import { PageHeader, Grid, Col, Button } from 'react-bootstrap';
import Iframe from 'react-iframe';

// Import services
import { VideoFilmService } from '../services/Index';

// Import css
import '../assets/css/films.css';

export default class Films extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: []
    };
  }

  componentWillMount() {
    var self = this;
    var user = self.props.match.params.user;
    VideoFilmService.getPublishVideos({user: user, onlyAPI: true})
      .then(function(response) {
        var data = response.data;
        self.setState({ videos: data.data.videos });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  render() {
    const { videos } = this.state;
    return (
      <div className="page-wrap video-gallery-wrap">
        <Grid>
          <Col xs={12}>
            <PageHeader className="page-title page-main-title text-center">
              <label>
                <span className="text-grey">Video </span> gallery
              </label>
            </PageHeader>
          </Col>
          <Col xs={12} className="p-none">
            {videos.map((video, index) => (
              <Col
                sm={index === 0 ? 12 : 6}
                xs={12}                
                className="video-wrap"
                key={video.id}
              >
                <Col className="video-title">{video.title}</Col>
                <Col className="video-icons">
                  <Button className="icon-like action-icon">
                    <span className="fa fa-heart" />
                  </Button>
                  <br />
                  <Button className="icon-timer action-icon">
                    <span className="fa fa-clock-o" />
                  </Button>
                </Col>
                <Col className="embed-responsive embed-responsive-16by9">
                  <Iframe
                    url={video.video_embed_url ? video.video_embed_url : video.video_url + '?rel=0&amp;showinfo=0'}
                    className="embed-responsive-item"
                    allowFullScreen
                  />
                </Col>
              </Col>
            ))}
          </Col>
        </Grid>
      </div>
    );
  }
}

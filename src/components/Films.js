import React, { Component } from 'react';
import { PageHeader, Grid, Col, Button } from 'react-bootstrap';
import { Player, BigPlayButton } from 'video-react';

// Import services
import { getPublishVideos } from '../services/Film';

import 'video-react/dist/video-react.css';
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
    getPublishVideos()
      .then(function(response) {
        var data = response.data;
        // debugger;
        self.setState({ videos: data.data.videos, meta: data.meta });
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
          {videos.map((video,index) =>
          index === 0 ? (
            <Col xs={12} className="video-wrap" key={video.id}>
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
              <Player
                playsInline
                poster={video.video_thumb}
                from={video.video_type}
                src={video.video_url}
              >
                <BigPlayButton position="center" />
              </Player>
            </Col>
          )
           :
           ( <Col sm={6} className="video-wrap" key={video.id}>
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

              <Player
                playsInline
                poster={video.video_thumb}
                from={video.video_type}
                src={video.video_url}
              >
                <BigPlayButton position="center" />
              </Player>
            </Col>
           )
        )}
          </Col>
        </Grid>
      </div>
    );
  }
}

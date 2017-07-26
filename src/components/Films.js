import React, { Component } from 'react';
import { PageHeader, Grid, Col, Button } from 'react-bootstrap';
import { Player, BigPlayButton } from 'video-react';

import 'video-react/dist/video-react.css';
import '../assets/css/films.css';

export default class Films extends Component {
  render() {
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
            <Col xs={12} className="video-wrap">
              <Col className="video-title">Himani & akshay</Col>
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
                poster="http://104.251.216.241/demo/ss-studio/video-images/video-img-1.png"
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              >
                <BigPlayButton position="center" />
              </Player>
            </Col>
          </Col>
          <Col xs={12} className="p-none">
            <Col sm={6} className="video-wrap">
              <Col className="video-title">Sonali & Pulkit</Col>
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
                poster="http://104.251.216.241/demo/ss-studio/video-images/video-img-2.png"
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              >
                <BigPlayButton position="center" />
              </Player>
            </Col>

            <Col sm={6} className="video-wrap">
              <Col className="video-title">kanishk & susmita</Col>
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
                poster="http://104.251.216.241/demo/ss-studio/video-images/video-img-3.png"
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              >
                <BigPlayButton position="center" />
              </Player>
            </Col>
          </Col>
        </Grid>
      </div>
    );
  }
}

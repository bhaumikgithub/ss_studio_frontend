import React, { Component } from 'react';
import { PageHeader, Button, Thumbnail, Grid, Col } from 'react-bootstrap';
import '../../assets/css/contact/services.css';

export default class Services extends Component {
  render() {
    return (
      <div className="page-wrap service-wrap">
        <Grid>
          <Col xs={12}>
            <PageHeader className="page-title page-main-title text-center">
              <label>
                <span className="text-grey">CREATIVE & BEST </span> SERVICES
              </label>
            </PageHeader>
            <Col xs={12} sm={6} md={4} className="no-m-l-r">
              <Thumbnail
                className="service-thumbs"
                alt="icon-images"
                src={require('../../assets/images/services/wedding-icon.png')}
              >
                <Col className="sevice-details">
                  <h4 className="service-title text-center">
                    Wedding photography
                  </h4>
                  <Col className="p-none service-description">
                    <p>
                      It was popularised in the 1960s with the release of the
                      Letraset sheets containing
                    </p>
                    <Button className="btn outline-btn service-btn">
                      View our Work
                    </Button>
                  </Col>
                </Col>
              </Thumbnail>
            </Col>
            <Col xs={12} sm={6} md={4} className="no-m-l-r">
              <Thumbnail
                className="service-thumbs"
                alt="icon-images"
                src={require('../../assets/images/services/product-icon.png')}
              >
                <Col className="sevice-details">
                  <h4 className="service-title text-center">
                    Product photography
                  </h4>
                  <Col className="p-none service-description">
                    <p>
                      It was popularised in the 1960s with the release of the
                      Letraset sheets containing
                    </p>
                    <Button className="btn outline-btn service-btn">
                      View our Work
                    </Button>
                  </Col>
                </Col>
              </Thumbnail>
            </Col>
            <Col xs={12} sm={6} md={4} className="no-m-l-r">
              <Thumbnail
                className="service-thumbs"
                alt="icon-images"
                src={require('../../assets/images/services/poterait-icon.png')}
              >
                <Col className="sevice-details">
                  <h4 className="service-title text-center">
                    portrait photography
                  </h4>
                  <Col className="p-none service-description">
                    <p>
                      It was popularised in the 1960s with the release of the
                      Letraset sheets containing
                    </p>
                    <Button className="btn outline-btn service-btn">
                      View our Work
                    </Button>
                  </Col>
                </Col>
              </Thumbnail>
            </Col>
            <Col xs={12} sm={6} md={4} className="no-m-l-r">
              <Thumbnail
                className="service-thumbs"
                alt="icon-images"
                src={require('../../assets/images/services/fashion-icon.png')}
              >
                <Col className="sevice-details">
                  <h4 className="service-title text-center">
                    fashion photography
                  </h4>
                  <Col className="p-none service-description">
                    <p>
                      It was popularised in the 1960s with the release of the
                      Letraset sheets containing
                    </p>
                    <Button className="btn outline-btn service-btn">
                      View our Work
                    </Button>
                  </Col>
                </Col>
              </Thumbnail>
            </Col>
            <Col xs={12} sm={6} md={4} className="no-m-l-r">
              <Thumbnail
                className="service-thumbs"
                alt="icon-images"
                src={require('../../assets/images/services/kids-icon.png')}
              >
                <Col className="sevice-details">
                  <h4 className="service-title text-center">
                    kids photography
                  </h4>
                  <Col className="p-none service-description">
                    <p>
                      It was popularised in the 1960s with the release of the
                      Letraset sheets containing
                    </p>
                    <Button className="btn outline-btn service-btn">
                      View our Work
                    </Button>
                  </Col>
                </Col>
              </Thumbnail>
            </Col>
          </Col>
        </Grid>
      </div>
    );
  }
}

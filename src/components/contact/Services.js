import React, { Component } from 'react';
import { PageHeader, Thumbnail, Grid, Col } from 'react-bootstrap';

// Import css
import '../../assets/css/contact/services.css';

// Import services
import { getActiveServices } from '../../services/Contact';

export default class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: []
    };
  }

  componentDidMount() {
    var self = this;

    getActiveServices().then(function(response) {
      if (response.status === 200) {
        self.setState({ services: response.data.data.active_services });
      }
    });
  }

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
            {this.state.services.map(service => (
              <Col xs={12} sm={6} md={4} className="no-m-l-r" key={service.id}>
                <Thumbnail
                  className="service-thumbs"
                  alt="icon-images"
                  src={service.service_icon.icon_image}
                >
                  <Col className="sevice-details">
                    <h4 className="service-title text-center">
                      {service.service_name}
                    </h4>
                    <Col className="p-none service-description">
                      <p>{service.description}</p>
                      {/*<Button className="btn outline-btn service-btn">
                        View our Work
                      </Button>*/}
                    </Col>
                  </Col>
                </Thumbnail>
              </Col>
            ))}
          </Col>
        </Grid>
      </div>
    );
  }
}

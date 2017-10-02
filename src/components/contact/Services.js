import React, { Component } from 'react';
import { PageHeader, Grid, Col } from 'react-bootstrap';

// Import css
import '../../assets/css/contact/services.css';

// Import component
import ServiceModule from '../common/ServiceModule';

// Import services
import { UserServiceService } from '../../services/Index';

export default class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: []
    };
  }

  componentDidMount() {
    var self = this;

    UserServiceService.getActiveServices().then(function(response) {
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
            <ServiceModule
              services={this.state.services}
              showEditPopup={this.showEditPopup}
            />
          </Col>
        </Grid>
      </div>
    );
  }
}

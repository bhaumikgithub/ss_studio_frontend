import React, { Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';

export default class ServiceModule extends Component {
  render() {
    const { services } = this.props;
    return (
      <Col xs={12} className="admin-service-thumb-wrap">
        {services.map(service => (
          <Thumbnail
            className="admin-service-thumb"
            alt="icon-images"
            //src={require('../../../assets/images/admin/album/site-content-icon.png')}
            src={service.service_icon.icon_image}
            key={service.id}
          >
            <Col className="admin-sevice-details">
              <h4 className="admin-service-title text-center">
                {service.service_name}
              </h4>
              <Col className="p-none admin-service-description">
                <p>{service.description}</p>
              </Col>
            </Col>
            <a
              className="edit-service-thumb"
              onClick={() => this.props.showEditPopup(service)}
            >
              <img
                src={require('../../assets/images/admin/site-content/edit-icon-grey.png')}
                alt=""
              />
            </a>
          </Thumbnail>
        ))}
      </Col>
    );
  }
}

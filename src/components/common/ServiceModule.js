import React, { Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';

export default class ServiceModule extends Component {
  render() {
    const { services, admin_service } = this.props;
    return (
      <div>
        {services &&
          services.map(service => (
            <Col xs={12} sm={6} md={4} className="service-thumb-wrap" key={service.id}>
              <Thumbnail
                className="service-thumbs"
                alt={service.service_icon ? 'icon-images' : ''}
                src={service.service_icon && service.service_icon.icon_image}
              >
                <Col className="sevice-details">
                  <h4 className="service-title text-center">
                    {service.service_name}
                  </h4>
                  <Col className="p-none service-description">
                    <p>{service.description}</p>
                  </Col>
                </Col>
                {admin_service && (
                  <a
                    className="edit-service-thumb custom-service-thumb"
                    onClick={() => this.props.showEditPopup(service)}
                  >
                    <img
                      src={require('../../assets/images/admin/site-content/edit-icon-grey.png')}
                      alt=""
                      className="service-edit-icon"
                    />
                  </a>
                )}
                {admin_service && (
                  <a
                    className="delete-service-thumb custom-service-thumb social-media-delete"
                    onClick={() => this.props.showDialogueBox(service.id)}
                  >
                    <img
                      src={require('../../assets/images/admin/album/delete-icon.png')}
                      alt=""
                      className="service-edit-icon"
                    />
                  </a>
                )}
              </Thumbnail>
            </Col>
          ))}
      </div>
    );
  }
}

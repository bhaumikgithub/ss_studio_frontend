import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap';

// Import helper
import { fullName } from '../../Helper';

// Import css
import '../../../assets/css/admin/sidebar.css';

export default class Sidebar extends Component {
  render() {
    return (
      <Col className="sidebar">
        <Col xs={12} className="user-wrap">
          <img
            className="img-responsive img-circle logged-user-thumb"
            src={require('../../../assets/images/about/about-thumb.png')}
            alt="user"
          />
          <h5 className="user-name">
            {fullName()}
          </h5>
          <Col xs={6} className="text-center">
            <h4 className="album-num">25</h4>
            <label className="album-name">Albums</label>
          </Col>
          <Col xs={6} className="text-center">
            <h4 className="album-num">12500</h4>
            <label className="album-name">Photos</label>
          </Col>
        </Col>
        <Col xs={12} className="link-wrap">
          <ListGroup className="sidebar-nav-links">
            <ListGroupItem href="#link1">
              <img
                src={require('../../../assets/images/admin/album/home-icon.png')}
                className="link-icons"
                alt=""
              />Dashboard
            </ListGroupItem>
            <NavLink to="/albums">
              <ListGroupItem>
                <img
                  src={require('../../../assets/images/admin/album/album-icon.png')}
                  className="link-icons"
                  alt=""
                />{' '}
                Albums
              </ListGroupItem>
            </NavLink>
            <ListGroupItem href="#link3">
              <img
                src={require('../../../assets/images/admin/album/video-films-icon.png')}
                className="link-icons"
                alt=""
              />{' '}
              Video films
            </ListGroupItem>
            <ListGroupItem href="#link4">
              <img
                src={require('../../../assets/images/admin/album/categories-icon.png')}
                className="link-icons"
                alt=""
              />{' '}
              categories
            </ListGroupItem>
            <ListGroupItem href="#link5">
              <img
                src={require('../../../assets/images/admin/album/contacts-icon.png')}
                className="link-icons"
                alt=""
              />{' '}
              Contacts
            </ListGroupItem>
            <ListGroupItem href="#link6">
              <img
                src={require('../../../assets/images/admin/album/site-content-icon.png')}
                className="link-icons"
                alt=""
              />{' '}
              site content
            </ListGroupItem>
            <ListGroupItem href="#link7">
              <img
                src={require('../../../assets/images/admin/album/home-gallery-icon.png')}
                className="link-icons"
                alt=""
              />{' '}
              Home Page Gallery
            </ListGroupItem>
            <ListGroupItem href="#link8">
              <img
                src={require('../../../assets/images/admin/album/testimonial-icon.png')}
                className="link-icons"
                alt=""
              />{' '}
              Testimonials
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Col>
    );
  }
}

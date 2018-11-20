import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

// Import services
import { UserService } from '../../../services/Index';

// Import css
import '../../../assets/css/admin/sidebar.css';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      redirectToReferrer: false
    };
  }

  componentWillMount() {
    var self = this;

    UserService.getCurrentUser()
      .then(function(response) {
        if (response.status === 200) {
          self.setState({ user: response.data.data.user });
        } else {
          console.log(response.data);
        }
      })
      .catch(function(error) {
        if (error.response.status === 401) {
          localStorage.clear();
          self.setState({ redirectToReferrer: true });
        }
      });
  }

  render() {
    const { user, redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect push to="/admin" />;
    }
    return (
      <Col className="sidebar">
        <Col xs={12} className="user-wrap">
          <Col xs={6} className="text-center">
          <Link to={'/albums'}
            className="text-white"
          >
            <h4 className="album-num">{user.album_count}</h4>
            <label className="album-name">Albums</label>
          </Link>
          </Col>
          <Col xs={6} className="text-center">
          <Link to={'/albums'}
            className="text-white"
          >
            <h4 className="album-num">{user.photo_count}</h4>
            <label className="album-name">Photos</label>
            </Link>
          </Col>
        </Col>
        <Col xs={12} className="link-wrap">
          <ListGroup className="sidebar-nav-links">
            <NavLink to="/dashboard">
              <ListGroupItem href="">
                <img
                  src={require('../../../assets/images/admin/album/home-icon.png')}
                  className="link-icons"
                  alt=""
                />Dashboard
              </ListGroupItem>
              </NavLink>
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
            <NavLink to="/video_films">
              <ListGroupItem href="">
                <img
                  src={require('../../../assets/images/admin/album/video-films-icon.png')}
                  className="link-icons"
                  alt=""
                />{' '}
                Video films
              </ListGroupItem>
            </NavLink>
            <NavLink to="/testimonials">
              <ListGroupItem href="">
                <img
                  src={require('../../../assets/images/admin/album/testimonial-icon.png')}
                  className="link-icons"
                  alt=""
                />{' '}
                Manage Testimonials
              </ListGroupItem>
            </NavLink>
            <NavLink to="/homepage_gallery">
              <ListGroupItem>
                <img
                  src={require('../../../assets/images/admin/album/home-gallery-icon.png')}
                  className="link-icons"
                  alt=""
                />{' '}
                Homepage Gallery
              </ListGroupItem>
            </NavLink>
            <NavLink to="/contacts">
              <ListGroupItem>
                <img
                  src={require('../../../assets/images/admin/album/contacts-icon.png')}
                  className="link-icons"
                  alt=""
                />{' '}
                My Contacts
              </ListGroupItem>
            </NavLink>
            <NavLink to="/site_contents">
              <ListGroupItem>
                <img
                  src={require('../../../assets/images/admin/album/site-content-icon.png')}
                  className="link-icons"
                  alt=""
                />{' '}
                Site Content
              </ListGroupItem>
            </NavLink>
            <NavLink to="/categories">
              <ListGroupItem>
                <img
                  src={require('../../../assets/images/admin/album/categories-icon.png')}
                  className="link-icons"
                  alt=""
                />{' '}
                Categories
              </ListGroupItem>
            </NavLink>
          </ListGroup>
        </Col>
      </Col>
    );
  }
}

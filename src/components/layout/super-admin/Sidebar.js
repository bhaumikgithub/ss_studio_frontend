import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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
          <h5 className="user-name super-admin-name">{user.full_name}</h5>
        </Col>
        <Col xs={12} className="link-wrap">
          <ListGroup className="sidebar-nav-links">
            <NavLink to="/users">
              <ListGroupItem>
                <img
                  src={require('../../../assets/images/admin/album/contacts-icon.png')}
                  className="link-icons"
                  alt=""
                />{' '}
                Users
              </ListGroupItem>
            </NavLink>
            <NavLink to="/subscription_plans">
              <ListGroupItem>
                <img
                  src={require('../../../assets/images/admin/album/site-content-icon.png')}
                  className="link-icons"
                  alt=""
                />{' '}
                Subscription Plans
              </ListGroupItem>
            </NavLink>
          </ListGroup>
        </Col>
      </Col>
    );
  }
}

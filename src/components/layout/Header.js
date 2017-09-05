import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar
        inverse
        fixedTop
        collapseOnSelect
        className="header custom-navbar"
      >
        <div className="fb_btn">
          <a
            href="https://www.facebook.com/sagarphotocam"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={require('../../assets/images/fb_btn.png')}
              alt=""
              className="facebook-img"
            />
          </a>
        </div>
        <Navbar.Header>
          <Navbar.Brand className="navbar-logo">
            <Link to="/">
              <img
                src={require('../../assets/images/logo.png')}
                alt=""
                className="img-responsive"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight className="menu-links">
            <IndexLinkContainer to="/">
              <NavItem eventKey={1}>Home</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/portfolio">
              <NavItem eventKey={2}>Portfolio</NavItem>
            </LinkContainer>
            <LinkContainer to="/films">
              <NavItem eventKey={3}>Films</NavItem>
            </LinkContainer>
            <LinkContainer to="/services">
              <MenuItem eventKey={4}>Services</MenuItem>
            </LinkContainer>
            <LinkContainer to="/feedback">
              <NavItem eventKey={5}>Testimonials</NavItem>
            </LinkContainer>
            <LinkContainer to="/about_us">
              <MenuItem eventKey={6}>About us</MenuItem>
            </LinkContainer>
            <LinkContainer to="/contact">
              <MenuItem eventKey={7}>Contact</MenuItem>
            </LinkContainer>
            {/*<li>
              <Link to="/admin" target="_blank">
                <img
                  src={require('../../assets/images/lock-icon.png')}
                  alt=""
                  className="img-responsive"
                />
              </Link>
            </li>*/}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;

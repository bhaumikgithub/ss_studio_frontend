import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

class Header extends Component {
  render() {
    const logo = `${process.env.PUBLIC_URL}/assets/images/logo.png`;
    return (
      <Navbar
        inverse
        collapseOnSelect
        fixedTop
        className="header custom-navbar"
      >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="">
              <img src={logo} alt="" className="img-responsive" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight className="menu-links">
            <NavItem eventKey={1} href="#" className="active">
              Home
            </NavItem>
            <NavItem eventKey={2} href="#">
              Portfolio
            </NavItem>
            <NavItem eventKey={3} href="#">
              Films
            </NavItem>
            <NavItem eventKey={4} href="#">
              Feedback
            </NavItem>
            <NavDropdown
              eventKey={3}
              title="Contact"
              id="basic-nav-dropdown"
              className="navbar-dropdown"
            >
              <li>
                <a href="">Get in Touch</a>
              </li>
              <li>
                <a href="">About Us</a>
              </li>
              <li>
                <a href="">Services</a>
              </li>
              <li>
                <a href="">Pricing</a>
              </li>
            </NavDropdown>
            <li>
              <a href="">
                <img
                  src={process.env.PUBLIC_URL + '/assets/images/lock-icon.png'}
                  alt=""
                  className="img-responsive"
                />
              </a>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;

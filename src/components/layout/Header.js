import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.match.params.user
    }
  }
  render() {
    return (
      <Navbar
        inverse
        fixedTop
        collapseOnSelect
        className="header custom-navbar"
      >
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
            <IndexLinkContainer to={"/"+this.state.user}>
              <NavItem eventKey={1}>Home</NavItem>
            </IndexLinkContainer>
            <LinkContainer to={"/"+this.state.user+"/portfolio"}>
              <NavItem eventKey={2}>Portfolio</NavItem>
            </LinkContainer>
            <LinkContainer to={"/"+this.state.user+"/films"}>
              <NavItem eventKey={3}>Films</NavItem>
            </LinkContainer>
            <LinkContainer to={"/"+this.state.user+"/services"}>
              <NavItem eventKey={4}>Services</NavItem>
            </LinkContainer>
            <LinkContainer to={"/"+this.state.user+"/feedback"}>
              <NavItem eventKey={5}>Testimonials</NavItem>
            </LinkContainer>
            <LinkContainer to={"/"+this.state.user+"/about_us"}>
              <NavItem eventKey={6}>About us</NavItem>
            </LinkContainer>
            <LinkContainer to={"/"+this.state.user+"/contact"}>
              <NavItem eventKey={7}>Contact</NavItem>
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

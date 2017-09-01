import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

// Import css
import '../../../assets/css/admin/admin.css';

// Import component
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

export default class AfterLoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: true
    };
    this.handler = this.handler.bind(this);
  }

  handler(e) {
    e.preventDefault();
    this.setState({ condition: !this.state.condition });
  }

  render() {
    return (
      <div className={this.state.condition ? 'Toggled AdminApp' : 'AdminApp'}>
        <div className="left-sidebar-main-wrap">
          <Sidebar />
        </div>
        <div className="content-area">
          <Header handler={this.handler} />
          <div className="page-wrap">
            <Grid fluid={true}>{this.props.children}</Grid>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

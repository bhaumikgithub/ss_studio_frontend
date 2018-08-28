import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

// Import component
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

// Import css
import '../../../assets/css/admin/admin.css';

export default class AfterSuperAdminLoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: true,
      title: '',
    };
    this.handler = this.handler.bind(this);
  }

  componentWillMount() {
    this.setState({ title: this.props.title });
  }

  componentDidUpdate(prevProps, prevState) {
    const title = this.props.title;
    if (this.state.title !== title) {
      this.setState({ title: title });
    }
  }

  handler(e) {
    e.preventDefault();
    this.setState({ condition: !this.state.condition });
  }

  render() {
    const {
      title,
      condition,
    } = this.state;
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child)
    );

    return (
      <div className={condition ? 'Toggled AdminApp' : 'AdminApp'}>
        <div className="left-sidebar-main-wrap">
          <Sidebar />
        </div>
        <div className="content-area">
          <Header
            handler={this.handler}
            title={title}
          />
          <div className="page-wrap">
            <Grid fluid={true}>{childrenWithProps}</Grid>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

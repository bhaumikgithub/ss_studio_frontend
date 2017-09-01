import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

// Import component
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

// Import service
import { showAlbum } from '../../../services/admin/Album';

// Import css
import '../../../assets/css/admin/admin.css';

export default class AfterLoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: true,
      album: {},
      albumSlug: props.children.props.match.params.slug,
      title: ''
    };
    this.handler = this.handler.bind(this);
  }

  componentWillMount() {
    this.albumForAlbumDetailRoute();
    this.setState({ title: this.props.title });
  }

  // componentDidMount() {
  //   console.log('Component DID MOUNT!');
  // }

  // componentWillReceiveProps(newProps) {
  //   console.log('Component WILL RECIEVE PROPS!');
  // }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log('Component WILL UPDATE!');
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.title !== this.props.title) {
      this.albumForAlbumDetailRoute();
      this.setState({ title: this.props.title });
    }
  }

  // componentWillUnmount() {
  //   console.log('Component WILL UNMOUNT!');
  // }

  albumForAlbumDetailRoute() {
    var self = this;
    const albumSlug = this.props.children.props.match.params.slug;
    if (this.props.title === 'Album detail') {
      showAlbum(self.state.albumSlug || albumSlug)
        .then(function(response) {
          self.handleAlbumSuccessResponse(response, albumSlug);
        })
        .catch(function(error) {
          console.log(error.response);
        });
    } else {
      self.setState({ album: {}, albumSlug: '' });
    }
  }

  handleAlbumSuccessResponse(response, albumSlug) {
    var data = response.data;
    if (response.status === 200) {
      this.setState({ album: data.data.album, albumSlug: albumSlug });
    } else {
      console.log(data);
    }
  }

  handler(e) {
    e.preventDefault();
    this.setState({ condition: !this.state.condition });
  }

  render() {
    const { album, title, condition } = this.state;
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        album: album
      })
    );

    return (
      <div className={condition ? 'Toggled AdminApp' : 'AdminApp'}>
        <div className="left-sidebar-main-wrap">
          <Sidebar />
        </div>
        <div className="content-area">
          <Header handler={this.handler} title={title} />
          <div className="page-wrap">
            <Grid fluid={true}>{childrenWithProps}</Grid>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

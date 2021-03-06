import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

// Import component
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

// Import service
import { AlbumService } from '../../../services/Index';

// Import css
import '../../../assets/css/admin/admin.css';

const paginationPerPage = 32;

export default class AfterLoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: true,
      album: {},
      albumSlug: props.children.props.match.params.slug,
      title: '',
      albumDetailTitle: '',
      selectionAlbumObject: {}
    };
    this.handler = this.handler.bind(this);
  }

  componentWillMount() {
    this.albumForAlbumDetailRoute();
    this.setState({ title: this.props.title });
  }

  componentDidUpdate(prevProps, prevState) {
    const title = this.props.title;
    if (this.state.title !== title) {
      this.albumForAlbumDetailRoute();
      this.setState({ title: title });
    }
  }

  albumForAlbumDetailRoute(page = 1) {
    var self = this;
    const albumSlug = this.props.children.props.match.params.slug;
    if (this.props.title === 'Album detail') {
      AlbumService.showAlbum(self.state.albumSlug || albumSlug, {
        page: page,
        per_page: paginationPerPage
      })
        .then(function(response) {
          self.handleAlbumSuccessResponse(response, albumSlug);
        })
        .catch(function(error) {
          console.log(error.response);
        });
    } else {
      self.setState({
        album: {},
        albumSlug: '',
        albumDetailTitle: '',
        selectionAlbumObject: {}
      });
    }
  }

  handleAlbumSuccessResponse(response, albumSlug) {
    var data = response.data;
    if (response.status === 200) {
      this.setState({
        album: data.data.album,
        albumSlug: albumSlug,
        albumDetailTitle: data.data.album.album_name,
        selectionAlbumObject: data.data.album.album_recipients
      });
    } else {
      console.log(data);
    }
  }

  handler(e) {
    e.preventDefault();
    this.setState({ condition: !this.state.condition });
  }

  render() {
    const {
      album,
      title,
      condition,
      albumDetailTitle,
      selectionAlbumObject
    } = this.state;
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        album: album,
        selectionAlbumObject: selectionAlbumObject
      })
    );

    return (
      <div className={condition ? 'Toggled AdminApp' : 'AdminApp'}>
        <div className="left-sidebar-main-wrap">
          <Sidebar />
        </div>
        <div className="content-area">
          <Header
            handler={this.handler}
            title={title === 'Album detail' ? albumDetailTitle : title}
            isAlbumDetail={title === 'Album detail' ? true : false}
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

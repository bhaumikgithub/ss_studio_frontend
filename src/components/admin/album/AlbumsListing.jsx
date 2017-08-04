import React, { Component } from 'react';
import { Col, Button, Media, Pagination } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
// import CreateAlbum from './create-album';

// Import services
import { getAlbums, deleteAlbum } from '../../../services/admin/Album';

// Import css
import '../../../assets/css/admin/album/albums.css';

export default class AlbumsListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activePage: 3,
      CreateShow: false,
      albums: [],
      meta: [],
      alert: {
        objectId: '',
        show: false,
        cancelBtn: true,
        confirmAction: () => {},
        title: '',
        text: '',
        btnText: '',
        type: ''
      }
    };
  }

  componentWillMount() {
    var self = this;

    getAlbums()
      .then(function(response) {
        console.log(response);
        var data = response.data;
        self.setState({ albums: data.data.albums, meta: data.meta });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  showDialogueBox(id) {
    this.setState({
      alert: {
        objectId: id,
        show: true,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        btnText: 'Yes, delete it!',
        type: 'warning',
        confirmAction: () => this.deleteAlbum(),
        cancelBtn: true
      }
    });
  }

  hideDialogueBox() {
    this.setState({ alert: { show: false } });
  }

  deleteAlbum() {
    var self = this;

    deleteAlbum(self.state.alert.objectId)
      .then(function(response) {
        if (response.status === 200) {
          self.handleDeleteSuccessResponse(response);
        } else {
          self.handleDeleteErrorResponse(response);
        }
      })
      .catch(function(error) {
        self.handleDeleteErrorResponse(error.response);
      });
  }

  handleDeleteSuccessResponse(response) {
    var self = this;

    const albums = self.state.albums.filter(
      album => album.id !== self.state.alert.objectId
    );
    const totalCount = self.state.meta.pagination.total_count;

    self.setState({
      albums: albums,
      meta: { pagination: { total_count: totalCount - 1 } },
      alert: {
        show: true,
        title: 'Success',
        text: response.data.message,
        type: 'success',
        confirmAction: () => self.hideDialogueBox()
      }
    });
  }

  handleDeleteErrorResponse(response) {
    var self = this;

    self.setState({
      alert: {
        show: true,
        title: response.data.message,
        text: response.data.errors[0].detail,
        type: 'warning',
        confirmAction: () => self.hideDialogueBox()
      }
    });
  }

  getStatusClass(status) {
    if (status === 'New') {
      return 'text-red';
    } else if (status === 'Shared') {
      return 'text-yellow';
    } else if (status === 'Delivered') {
      return 'text-green';
    } else {
      return 'text-green';
    }
  }

  getPortfolioClass(visibile) {
    if (visibile) {
      return 'fa-eye text-green';
    } else {
      return 'fa-eye-slash text-red';
    }
  }

  CreateClose = () => this.setState({ CreateShow: false });

  handleSelect(eventKey, e) {
    this.setState({
      activePage: eventKey
    });
  }

  render() {
    const { albums, meta, alert } = this.state;
    return (
      <Col xs={12} className="albums-page-wrap">
        <SweetAlert
          show={alert.show || false}
          title={alert.title || ''}
          text={alert.text || ''}
          type={alert.type || 'success'}
          showCancelButton={alert.cancelBtn}
          confirmButtonText={alert.btnText}
          onConfirm={alert.confirmAction}
          onCancel={() => this.hideDialogueBox()}
        />
        {/* <CreateAlbum
          showCreate={this.state.CreateShow}
          closeOn={this.CreateClose}
        /> */}
        <Col xs={12} className="filter-wrap p-none">
          <Col xs={12} className="p-none">
            <span className="total-album pull-left">
              Total :{' '}
              <span>{meta.pagination && meta.pagination.total_count}</span>{' '}
              albums
            </span>
            <h5 className="pull-left sortBy">
              Sort By : <span className="fa fa-sort" />
            </h5>
            <Button
              className="btn pull-right btn-orange create-album-btn"
              onClick={() => this.setState({ CreateShow: true })}
            >
              <i className="fa fa-plus add-icon" />Create album
            </Button>
          </Col>
        </Col>
        <Col xs={12} className="p-none album-list">
          {albums.map(album =>
            <Col xs={12} className="albums-list-wrap p-none" key={album.id}>
              <Col xs={12} className="album-wrap">
                <Media>
                  <Media.Left align="top" className="album-img-wrap">
                    <img
                      className="album-thumb"
                      width={190}
                      height={190}
                      src={album.cover_photo.image}
                      alt={album.cover_photo.image_file_name}
                    />
                    {album.is_private &&
                      <span className="lock-icon">
                        <i className="fa fa-lock" />
                      </span>}
                  </Media.Left>
                  <Media.Body className="album-detail-wrap">
                    <Media.Heading className="album-title">
                      {album.album_name}
                    </Media.Heading>

                    <Button className="btn-link p-none album-action-btn album-edit-btn">
                      <img
                        src={require('../../../assets/images/admin/album/edit-icon.png')}
                        alt=""
                      />
                    </Button>
                    <Button className="btn-link p-none album-action-btn album-share-btn">
                      <img
                        src={require('../../../assets/images/admin/album/share-icon.png')}
                        alt=""
                      />
                    </Button>

                    <Col xs={12} className="p-none album-badges-wrap">
                      {album.categories.map(category =>
                        <span
                          className="album-badge"
                          key={category.category_name}
                        >
                          {category.category_name}
                        </span>
                      )}
                    </Col>

                    <Col xs={12} className="p-none updated-info">
                      <span className="fa fa-clock-o updated-icon" /> Last
                      updated on {album.updated_at}.
                    </Col>
                    <Col xs={12} className="p-none album-separator">
                      <hr />
                    </Col>
                  </Media.Body>
                </Media>
                <Col xs={12} className="p-none count-main-wrap">
                  <Col xs={12} className="p-none">
                    <Col
                      lg={3}
                      sm={6}
                      xs={12}
                      className="count-wrap photo-wrap"
                    >
                      <span className="count-detail">Total photos</span>
                      <span className="count-detail count-num">
                        {album.photo_count}
                      </span>
                    </Col>
                    <Col
                      lg={3}
                      sm={6}
                      xs={12}
                      className="count-wrap view-count-wrap"
                    >
                      <span className="count-detail">View count</span>
                      <span className="count-detail count-num">0</span>
                    </Col>
                    <Col
                      lg={2}
                      sm={6}
                      xs={12}
                      className="count-wrap status-wrap"
                    >
                      <span className="count-detail">status</span>
                      <span
                        className={
                          'count-detail count-num ' +
                          this.getStatusClass(album.delivery_status)
                        }
                      >
                        {album.delivery_status}
                      </span>
                    </Col>
                    <Col
                      lg={4}
                      sm={6}
                      xs={12}
                      className="count-wrap visible-wrap"
                    >
                      <span className="count-detail">
                        visible in portfolio ?
                      </span>
                      <span className="count-detail count-num">
                        <span
                          className={
                            'fa visible-icon text-red ' +
                            this.getPortfolioClass(album.portfolio_visibility)
                          }
                        />{' '}
                        {album.portfolio_visibility ? 'Yes' : 'No'}
                      </span>
                    </Col>
                  </Col>
                  <Button
                    className="btn-link p-none album-action-btn album-delete-btn"
                    onClick={event => this.showDialogueBox(album.id)}
                  >
                    <img
                      src={require('../../../assets/images/admin/album/delete-icon.png')}
                      alt=""
                    />
                  </Button>
                </Col>
              </Col>
            </Col>
          )}
        </Col>

        <Col xs={12} className="p-none custom-pagination-wrap">
          <Pagination
            prev
            next
            ellipsis
            boundaryLinks
            items={10}
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.handleSelect}
            className="custom-pagination"
          />
        </Col>
      </Col>
    );
  }
}
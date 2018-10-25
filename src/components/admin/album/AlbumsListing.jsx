import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Media, Checkbox } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
import Select from 'react-select';
// Import component
import AlbumPopup from './AlbumPopup';
import ShareAlbum from './ShareAlbum';
import PaginationModule from '../../common/PaginationModule';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Import services
import { AlbumService } from '../../../services/Index';

// Import helper
import { isObjectEmpty, getAlbumStatusClass, toCapitalize } from '../../Helper';

// Import css
import '../../../assets/css/admin/album/albums.css';
import '../../../assets/css/admin/album/album-details/album-details.css';

export default class AlbumsListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editObject: {},
      shareAlbumObject: {},
      shareAlbumAction: {},
      selectionAlbumObject: {},
      showCreatePopup: false,
      shareAlbum: false,
      albumSortingOrder: '',
      activeCheckboxSelected: false,
      deactiveCheckboxSelected: false,
      categoryId: '',
      albums: [],
      categories: [],
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
    var {
      categoryId,
      activeCheckboxSelected,
      deactiveCheckboxSelected
    } = self.state;
    this.getAllAlbums(
      categoryId,
      activeCheckboxSelected,
      deactiveCheckboxSelected,
      undefined
    );
  }

  handleAlbumSorting(categoryId, eventKey = 1) {
    var self = this;
    var checked, status;
    var { activeCheckboxSelected, deactiveCheckboxSelected } = self.state;

    checked = activeCheckboxSelected || deactiveCheckboxSelected ? true : false;
    status = activeCheckboxSelected ? 'active' : 'inactive';
    if (
      (deactiveCheckboxSelected === true && activeCheckboxSelected === true) ||
      (deactiveCheckboxSelected === false && activeCheckboxSelected === false)
    ) {
      self.getAllAlbums(
        categoryId,
        activeCheckboxSelected,
        deactiveCheckboxSelected,
        eventKey
      );
    } else {
      self.getSlectedAlbums(
        status,
        checked,
        categoryId,
        activeCheckboxSelected,
        deactiveCheckboxSelected,
        eventKey
      );
    }
  }

  handleSelectChange(e) {
    if (e) {
      this.setState({
        albumSortingOrder: e.value,
        categoryId: e.value,
      });
      this.handleAlbumSorting(e.value);
    }
    else if (e === null){
      this.setState({
        albumSortingOrder: e,
        categoryId: e,
      });
      this.handleAlbumSorting(e);
    }
  }
  getAllAlbums(
    categoryId,
    activeCheckbox,
    deactiveCheckbox,
    page = 1
  ) {
    var self = this;
    AlbumService.getAlbums({
      category_id: categoryId === undefined ? this.state.categoryId : categoryId,
      page: page,
      per_page: window.paginationPerPage
    })
      .then(function(response) {
        var data = response.data;
        self.setState({
          albums: data.data.albums,
          meta: data.meta,
          activeCheckboxSelected: activeCheckbox,
          deactiveCheckboxSelected: deactiveCheckbox,
          categories: data.data.categories
        });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  handlePaginationClick = eventKey => {
    this.handleAlbumSorting(undefined, eventKey);
  };

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

    AlbumService.deleteAlbum(self.state.alert.objectId)
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
    var pagination = Object.assign({}, self.state.meta.pagination);
    pagination.total_count -= 1;

    if (albums.length === 0 && pagination.total_count > 0) {
      this.getAllAlbums(
        undefined,
        this.state.activeCheckboxSelected,
        this.state.deactiveCheckboxSelected
      );
    }

    self.setState({
      albums: albums,
      meta: { pagination: pagination },
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

  getPortfolioClass(visibile) {
    if (visibile) {
      return 'fa-eye text-green';
    } else {
      return 'fa-eye-slash text-red';
    }
  }

  hideCreatePopup = () => {
    this.setState({ showCreatePopup: false, editObject: {} });
  };

  closeShareAlbum = () => this.setState({ shareAlbum: false });

  renderAlbum = (album, action) => {
    var self = this;
    const newAlbums = self.state.albums.slice();
    var totalCount = self.state.meta.pagination.total_count;
    if (action === 'insert') {
      newAlbums.splice(0, 0, album);
      totalCount = totalCount + 1;
      self.props.history.push('/albums/' + album.slug);
    } else if (action === 'replace' && !isObjectEmpty(self.state.editObject)) {
      newAlbums.splice(newAlbums.indexOf(self.state.editObject), 1, album);
    }

    self.setState({
      albums: newAlbums,
      meta: { pagination: { total_count: totalCount } }
    });
  };

  renderUpdateAlbum = album => {};

  renderShareAlbum = album => {
    const newAlbums = this.state.albums.slice();
    album.delivery_status = 'Shared';
    newAlbums.splice(newAlbums.indexOf(this.state.shareAlbumObject), 1, album);
  };

  getSlectedAlbums(
    status,
    checked,
    categoryId,
    activeCheckbox,
    deactiveCheckbox,
    page = 1
  ) {
    var self = this;
    AlbumService.getAlbumStatusWise({
      page: page,
      per_page: window.paginationPerPage,
      status: status,
      checked: checked,
      category_id: categoryId === undefined ? this.state.categoryId : categoryId,
    })
      .then(function(response) {
        var data = response.data;
        self.setState({
          albums: data.data.albums,
          meta: data.meta,
          activeCheckboxSelected: activeCheckbox,
          deactiveCheckboxSelected: deactiveCheckbox,
        });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  displayAlbumStatusWise(event, status) {
    var { checked, deactiveCheckbox, activeCheckbox } = false;
    deactiveCheckbox = document.getElementsByName('deactive-checkbox')[0]
      .checked;
    activeCheckbox = document.getElementsByName('active-checkbox')[0].checked;
    if (event.target.checked) {
      checked = true;
    } else {
      checked = false;
    }
    if (
      (deactiveCheckbox === true && activeCheckbox === true) ||
      (deactiveCheckbox === false && activeCheckbox === false)
    ) {
      this.getAllAlbums(undefined, activeCheckbox, deactiveCheckbox);
    } else {
      this.getSlectedAlbums(status, checked, this.state.categoryId, activeCheckbox, deactiveCheckbox);
    }
  }

  categoryOptions(categories = this.state.categories.categories) {
    var options = [];
    if(categories !== undefined && categories.length > 0){
      categories.map(category => {
        return options.push({
          value: category.id,
          label: toCapitalize(category.category_name)
        });
      });
      return options;
    }
  }
  render() {
    const {
      albums,
      meta,
      alert,
      albumSortingOrder,
    } = this.state;
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
        {this.state.showCreatePopup && (
          <AlbumPopup
            showCreatePopup={this.state.showCreatePopup}
            hideCreatePopup={this.hideCreatePopup}
            renderAlbum={this.renderAlbum}
            editObject={this.state.editObject}
          />
        )}

        {this.state.shareAlbum && (
          <ShareAlbum
            albumId={this.state.shareAlbumObject.id}
            shareAlbum={this.state.shareAlbum}
            closeShareAlbum={this.closeShareAlbum}
            shareAlbumObject={this.state.shareAlbumObject}
            renderShareAlbum={this.renderShareAlbum}
            shareAlbumAction={this.state.shareAlbumAction}
            selectionAlbumObject={this.state.selectionAlbumObject}
          />
        )}
        <Col xs={12} className="filter-wrap p-none album-listing-title-wrap">
          <Col xs={12} className="p-none">
            <span className="total-album pull-left">
              Total :{' '}
              <span>
                {albums.length + '/'}
                {meta.pagination && meta.pagination.total_count}
              </span>{' '}
              albums
            </span>
            <Select
              className="album-sorting-option"
              name="sorting"
              value={albumSortingOrder}
              options={this.categoryOptions()}
              placeholder={false}
              onChange={this.handleSelectChange.bind(this)}
            />
            <Checkbox
              name="active-checkbox"
              className="all-selection-check album-status-checkboxes"
              onClick={event => this.displayAlbumStatusWise(event, 'active')}
            >
              {' '}
              Active
              <div className="check">
                <div className="inside" />
              </div>
            </Checkbox>
            <Checkbox
              name="deactive-checkbox"
              className="all-selection-check deactive-checkbox album-status-checkboxes"
              onClick={event => this.displayAlbumStatusWise(event, 'inactive')}
            >
              {' '}
              Deactive
              <div className="check">
                <div className="inside" />
              </div>
            </Checkbox>
            <Button
              className="btn pull-right btn-orange create-album-btn"
              onClick={() => this.setState({ showCreatePopup: true })}
            >
              <i className="fa fa-plus add-icon" />Create album
            </Button>
          </Col>
        </Col>
        <Col xs={12} className="p-none album-list">
          {albums.length === 0 && (
            <h4 className="text-center">No albums available</h4>
          )}
          <ReactCSSTransitionGroup
            transitionName="page-animation"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeave={false}
          >
            {albums.map(album => (
              <Col xs={12} className="albums-list-wrap p-none" key={album.id}>
                <Col
                  xs={12}
                  className={
                    'album-wrap' +
                    (album.status === 'inactive' ? ' inactive-album-wrap' : '')
                  }
                >
                  <Media>
                    <Media.Left align="top" className="album-img-wrap">
                      <Link to={'/albums/' + album.slug}>
                        <img
                          className="album-thumb"
                          width={190}
                          height={190}
                          src={album.cover_photo.image}
                          alt={album.cover_photo.image_file_name}
                        />
                        {album.is_private && (
                          <span className="lock-icon">
                            <i className="fa fa-lock" />
                          </span>
                        )}
                      </Link>
                    </Media.Left>
                    <Media.Body className="album-detail-wrap">
                      <Link to={'/albums/' + album.slug}>
                        <Media.Heading className="album-title">
                          {album.album_name}
                        </Media.Heading>
                      </Link>

                      <Link
                        to={'/albums/' + album.slug}
                        className="view-photo-listing"
                      >
                        <img
                          src={require('../../../assets/images/admin/album/album-details/views-icon.png')}
                          alt=""
                        />{' '}
                        View Photos
                      </Link>
                      <Link
                        to={
                          album.is_private
                            ? '/'+ album.user_name +'/shared_album_login/' + album.slug
                            : '/'+ album.user_name +'/shared_album/' + album.slug
                        }
                        target="_blank"
                        className="view-album-listing"
                      >
                        <img
                          src={require('../../../assets/images/admin/album/album-details/views-icon.png')}
                          alt=""
                        />{' '}
                        View Album
                      </Link>
                      <Link
                        to={{
                          pathname: '/albums/' + album.slug,
                          search: '?add_photo=true'
                        }}
                        className="add-photos-album-listing"
                      >
                        <i
                          className="fa fa-plus-circle"
                          aria-hidden="true"
                        />{' '}
                        Add Photos
                      </Link>

                      <Button
                        className="btn-link p-none album-action-btn album-edit-btn"
                        onClick={() =>
                          this.setState({
                            showCreatePopup: true,
                            editObject: album
                          })}
                      >
                        <img
                          src={require('../../../assets/images/admin/album/edit-icon.png')}
                          alt=""
                        />
                      </Button>
                      <Button
                        className="btn-link p-none album-action-btn album-share-btn"
                        onClick={() =>
                          this.setState({
                            shareAlbum: true,
                            shareAlbumObject: album,
                            shareAlbumAction: 'albumsListing'
                          })}
                      >
                        <img
                          src={require('../../../assets/images/admin/album/share-icon.png')}
                          alt=""
                        />
                      </Button>

                      <Col xs={12} className="p-none album-badges-wrap">
                        {album.categories.map(category => (
                          <span
                            className="album-badge"
                            key={category.category_name}
                          >
                            {category.category_name}
                          </span>
                        ))}
                      </Col>

                      <Col xs={3} className="p-none updated-info">
                        <span className="fa fa-clock-o updated-icon" /> Last
                        updated on {album.updated_at}.
                      </Col>
                      <Col xs={7} className="p-none updated-info">
                        <span className="fa fa-clock-o updated-icon" /> Created
                        on {album.created_at}.
                      </Col>
                      {(album.delivery_status === 'New' ||
                      album.delivery_status === 'Shared') &&
                      album.album_recipients &&
                      (!isObjectEmpty(album.album_recipients) &&
                      album.album_recipients.length > 0)
                        ?
                        <Col xs={2} className="p-none updated-info selection-progress-label">
                          Selection in Progress.
                        </Col>
                            : ''
                      }
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
                            getAlbumStatusClass(album.status)
                          }
                        >
                          {album.status}
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
            ))}
          </ReactCSSTransitionGroup>
        </Col>
        <PaginationModule
          pagination={meta.pagination}
          paginationClick={this.handlePaginationClick.bind(this)}
        />
      </Col>
    );
  }
}

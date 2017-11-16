import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Checkbox } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';

// Import component
import ShareAlbum from './ShareAlbum';
import AlreadyShared from './AlreadyShared';
import AddPhoto from './AddPhoto';
import AlbumPopup from './AlbumPopup';
import LightBoxModule from '../../common/LightBoxModule';
import PaginationModule from '../../common/PaginationModule';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CommentPopup from '../../shared-album/CommentPopup';

// Import services
import {
  PhotoService,
  AlbumService,
  CommentService,
  AlbumRecipientService
} from '../../../services/Index';

// Import helper
import { getStatusClass, isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/album/album-details/album-details.css';

export default class AlbumDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editObject: {},
      condition: true,
      shareAlbumObject: {},
      openDetailsBar: false,
      showCreatePopup: false,
      addPhoto: false,
      shareAlbum: false,
      alreadySharedAlbum: false,
      isOpenLightbox: false,
      photoIndex: 0,
      albumSlug: this.props.match.params.slug,
      album: props.album,
      showComment: false,
      albumSelection: false,
      selectionAlbumObject: props.selectionAlbumObject,
      adminAlbumRecipient: {},
      showSelectedPhotos: false,
      resetSelectionAlbum: false,
      comment: [],
      alert: {
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

  showAlbum(page = 1) {
    var self = this;
    AlbumService.showAlbum(self.state.albumSlug, {
      page: page,
      per_page: 16
    })
      .then(function(response) {
        var data = response.data;
        if (response.status === 200) {
          self.setState({ album: data.data.album, showSelectedPhotos: false });
        }
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  showDialogueBox() {
    var id = this.getSelectedCheckboxIds();
    if (id.length === 0) {
      this.handleDeleteErrorResponse();
    } else {
      this.setState({
        alert: {
          show: true,
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          btnText: 'Yes, delete it!',
          type: 'warning',
          confirmAction: () => this.deletePhotos(),
          cancelBtn: true
        }
      });
    }
  }

  hideDialogueBox() {
    this.setState({ alert: { show: false } });
  }

  hideCreatePopup = () => {
    this.setState({
      showCreatePopup: false,
      editObject: {},
      showComment: false
    });
  };

  componentWillMount() {
    this.state.album.id &&
      this.setState({ addPhoto: this.getAddPhotoStatus() });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.album.id !== this.props.album.id) {
      this.setState({
        album: this.props.album,
        addPhoto: this.getAddPhotoStatus()
      });
    }
  }

  getAddPhotoStatus() {
    const location = this.props.location;
    const params = new URLSearchParams(location.search);
    var addPhoto = false;

    if (params.get('add_photo') === 'true') {
      addPhoto = true;
      this.props.history.push(location.pathname);
    }
    return addPhoto;
  }

  getSelectedCheckboxIds() {
    const ids = [];
    const selectedPhotos = document.querySelectorAll(
      'input[name=photo-checkbox]:checked'
    );
    Object.keys(selectedPhotos).map(key => ids.push(selectedPhotos[key].id));
    return ids;
  }

  selectAll(event) {
    if (event.target.checked) {
      this.checkboxCheckUncheck(true);
    } else {
      this.checkboxCheckUncheck(false);
    }
  }

  checkboxCheckUncheck(action) {
    var checkboxes = document.getElementsByName('photo-checkbox');
    var select_all_checkbox = document.querySelector(
      '.all-selection-check input'
    );
    Object.keys(checkboxes).map(key => (checkboxes[key].checked = action));
    select_all_checkbox.checked = action;
  }

  deletePhotos = (ids = undefined, from = undefined) => {
    var self = this;
    ids = ids || self.getSelectedCheckboxIds().map(Number);

    PhotoService.deleteSelectedPhotos({ photo: { ids: ids } })
      .then(function(response) {
        if (response.status === 200) {
          self.handleDeleteSuccessResponse(response, ids, from);
        } else {
          self.handleDeleteErrorResponse(response);
        }
      })
      .catch(function(error) {
        self.handleDeleteErrorResponse(error.response);
      });
  };

  openLightbox(photo) {
    const allPhotos = this.state.album.photos;
    const photoIndex = allPhotos.indexOf(photo);
    this.setState({ isOpenLightbox: true, photoIndex: photoIndex });
  }

  handleDeleteSuccessResponse(response, ids, from) {
    var self = this;
    const { album } = self.state;
    const newAlbum = Object.assign({}, this.state.album);
    newAlbum.photo_count = album.photo_count - ids.length;
    const photos = album.photos.filter(album => {
      return album.id !== ids[ids.indexOf(album.id)];
    });
    newAlbum.photos = photos;
    document.querySelector('.all-selection-check input').checked = false;

    if (photos.length === 0 && album.photo_pagination.total_count > 0) {
      this.showAlbum();
    }

    self.updateSuccessState(newAlbum, response.data.message, from);
  }

  updateSuccessState(album, text, from) {
    if (from === 'Add photos') {
      this.setState({ album: album });
    } else {
      this.setState({
        album: album,
        alert: {
          show: true,
          title: 'Success',
          text: text,
          type: 'success',
          confirmAction: () => this.hideDialogueBox()
        }
      });
    }
  }

  handleDeleteErrorResponse(response) {
    var self = this;

    self.setState({
      alert: {
        show: true,
        title: response
          ? response.data.message
          : 'Please select atleast 1 photo to delete',
        text: '',
        type: 'warning',
        confirmAction: () => self.hideDialogueBox()
      }
    });
  }

  handlePasscodeClick(event, passcode) {
    const innerHtml = event.target.innerHTML;
    if (innerHtml === passcode) {
      event.target.innerHTML = 'View Passcode';
    } else {
      event.target.innerHTML = passcode;
    }
  }

  handleSetCoverPicClick(id, index) {
    var self = this;
    PhotoService.setCoverPhoto(id)
      .then(function(response) {
        self.handleCoverPicSuccessResponse(response, index);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  removeOldCoverPhoto(photos) {
    photos.map(photo => {
      if (photo.is_cover_photo) {
        return (photo.is_cover_photo = false);
      }
      return false;
    });
    return false;
  }

  handleCoverPicSuccessResponse(response, index) {
    var self = this;
    var data = response.data;
    if (response.status === 201) {
      const { photos } = this.state.album;
      const newAlbum = Object.assign({}, this.state.album);
      self.removeOldCoverPhoto(photos);
      photos[index].is_cover_photo = true;
      newAlbum.cover_photo = data.data.photo;
      this.setState({ album: newAlbum });
    } else {
      console.log(data);
    }
  }

  renderNewPhotos = createdPhotos => {
    var self = this;
    const newAlbum = Object.assign({}, self.state.album);
    const photos = newAlbum.photos;
    const newPhotos = photos.slice();
    newAlbum.photo_count += createdPhotos.length;
    createdPhotos.map(createdPhoto => {
      return newPhotos.splice(0, 0, createdPhoto);
    });
    newAlbum.photos = newPhotos;
    self.setState({ album: newAlbum });
  };

  renderRecipientsCount = (action, count = 1) => {
    const newAlbum = Object.assign({}, this.state.album);
    if (action === 'delete') {
      newAlbum.recipients_count -= 1;
    } else if (action === 'add') {
      newAlbum.recipients_count += count;
    }
    this.setState({ album: newAlbum });
  };

  renderShareAlbum = (count, adminAlbumRecipient, albumReceipientObject) => {
    const newAlbum = Object.assign({}, this.state.album);
    if (this.state.album.delivery_status === 'New') {
      newAlbum.delivery_status = 'Shared';
    }
    if (albumReceipientObject !== '') {
      newAlbum.album_recipients = [];
      newAlbum.album_recipients.push(adminAlbumRecipient);
    }
    this.setState({
      album: newAlbum,
      selectionAlbumObject: albumReceipientObject,
      adminAlbumRecipient: adminAlbumRecipient
    });
    if (albumReceipientObject === '') {
      this.renderRecipientsCount('add', count);
    }
  };

  renderAlbum = album => {
    const newAlbum = Object.assign({}, this.state.album);
    newAlbum.album_name = album.album_name;
    newAlbum.is_private = album.is_private;
    newAlbum.portfolio_visibility = album.portfolio_visibility;
    newAlbum.categories = album.categories;
    this.setState({ album: newAlbum });
  };

  handlePaginationClick = eventKey => {
    if (eventKey !== this.state.album.photo_pagination.current_page)
      this.showAlbum(eventKey);
  };

  closeAddPhoto = () => {
    this.setState({ addPhoto: false });
  };
  closeShareAlbum = () =>
    this.setState({
      shareAlbum: false,
      albumSelection: false
    });
  closeAlreadySharedAlbum = () => this.setState({ alreadySharedAlbum: false });

  closeLightBox = () => {
    this.setState({ isOpenLightbox: false });
  };

  getComment(photo) {
    var self = this;
    if (photo.comment_id) {
      CommentService.showComment(photo.id, photo.comment_id).then(function(
        response
      ) {
        if (response.status === 200) {
          self.setState({
            showComment: true,
            comment: response.data.data.comment
          });
        }
      });
    }
  }

  getAdminAlbumRecipients(album) {
    var self = this;
    var { selectionAlbumObject, adminAlbumRecipient } = self.state;
    selectionAlbumObject = isObjectEmpty(this.state.selectionAlbumObject)
      ? self.props.selectionAlbumObject
      : self.state.selectionAlbumObject;
    if (
      selectionAlbumObject.length > 0 ||
      (adminAlbumRecipient !== null && !isObjectEmpty(adminAlbumRecipient))
    ) {
      AlbumRecipientService.getAdminAlbumRecipients(album.id).then(function(
        response
      ) {
        if (response.status === 200) {
          self.setState({
            albumSelection: true,
            shareAlbumObject: album,
            selectionAlbumObject: response.data.data.album_recipients
          });
        }
      });
    } else {
      self.setState({
        albumSelection: true,
        shareAlbumObject: album,
        selectionAlbumObject: {}
      });
    }
  }

  deliveredAlbum() {
    var self = this;
    AlbumService.markAsDelivered(self.state.albumSlug).then(function(response) {
      if (response.status === 200) {
        const newAlbum = Object.assign({}, self.state.album);
        newAlbum.delivery_status = 'Delivered';
        self.setState({
          album: newAlbum
        });
      }
    });
  }
  getSelectedPhotos() {
    var self = this;
    AlbumService.getSelectedPhotos(self.state.albumSlug).then(function(
      response
    ) {
      if (response.status === 200) {
        const newAlbum = Object.assign({}, self.state.album);
        newAlbum.photos = response.data.data.photos;
        self.setState({ album: newAlbum, showSelectedPhotos: true });
      }
    });
  }

  getCommentedPhotos() {
    var self = this;
    AlbumService.getCommentedPhotos(self.state.albumSlug).then(function(
      response
    ) {
      if (response.status === 200) {
        const newAlbum = Object.assign({}, self.state.album);
        newAlbum.photos = response.data.data.photos;
        self.setState({ album: newAlbum, showSelectedPhotos: true });
      }
    });
  }

  showActionDialogueBox(event) {
    this.setState({
      alert: {
        show: true,
        title:
          event.target.textContent === 'Reset Selection'
            ? 'Are you sure you want to reset selection process?'
            : event.target.textContent === 'Stop Allowing Selection'
              ? 'Are you sure you want to stop allowing selection?'
              : 'Are you sure you want to re allow photo selection?',
        text: "You won't be able to revert this!",
        btnText: 'Yes',
        type: 'warning',
        confirmAction:
          event.target.textContent === 'Reset Selection'
            ? () => this.resetPhotoSelection()
            : event.target.textContent === 'Stop Allowing Selection'
              ? () => this.stopAllowingSelection()
              : () => this.reAllowingSelection(),
        cancelBtn: true
      }
    });
  }

  resetPhotoSelection() {
    var self = this;
    AlbumRecipientService.resetAdminRecipients(self.state.album.id)
      .then(function(response) {
        if (response.status === 200) {
          const newAlbum = Object.assign({}, self.state.album);
          newAlbum.album_recipients = {};
          newAlbum.delivery_status = 'Shared';
          newAlbum.photos = response.data.data.data.photos;
          self.setState({ album: newAlbum });
          self.updateSuccessState(self.state.album, response.data.message);
        }
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  stopAllowingSelection() {
    var self = this;
    AlbumService.markAsStopedSelection(self.state.albumSlug)
      .then(function(response) {
        if (response.status === 200) {
          const newAlbum = Object.assign({}, self.state.album);
          newAlbum.delivery_status = 'Stoped_selection';
          self.setState({
            album: newAlbum
          });
          self.updateSuccessState(self.state.album, response.data.message);
        }
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  reAllowingSelection() {
    var self = this;
    AlbumService.markAsShared(self.state.albumSlug)
      .then(function(response) {
        if (response.status === 200) {
          const newAlbum = Object.assign({}, self.state.album);
          newAlbum.delivery_status = 'Shared';
          self.setState({
            album: newAlbum
          });
          self.updateSuccessState(self.state.album, response.data.message);
        }
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  render() {
    const {
      album,
      alert,
      albumSlug,
      isOpenLightbox,
      photoIndex,
      showSelectedPhotos,
      selectionAlbumObject
    } = this.state;
    const photos = album.photos;
    return (
      <div>
        <Col xs={12} className="album-details-main-wrap">
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
          {this.state.addPhoto && (
            <AddPhoto
              addPhoto={this.state.addPhoto}
              closeOn={this.closeAddPhoto}
              renderNewPhotos={this.renderNewPhotos}
              deletePhotos={this.deletePhotos}
              albumId={album.id}
              photoCount={photos.length}
            />
          )}
          {(this.state.shareAlbum || this.state.albumSelection) && (
            <ShareAlbum
              albumId={album.id}
              shareAlbum={this.state.shareAlbum}
              closeShareAlbum={this.closeShareAlbum}
              renderShareAlbum={this.renderShareAlbum}
              shareAlbumObject={this.state.shareAlbumObject}
              albumSelection={this.state.albumSelection}
              selectionAlbumObject={selectionAlbumObject}
            />
          )}
          {this.state.alreadySharedAlbum && (
            <AlreadyShared
              albumId={album.id}
              alreadySharedAlbum={this.state.alreadySharedAlbum}
              renderRecipientsCount={this.renderRecipientsCount}
              closeOn={this.closeAlreadySharedAlbum}
            />
          )}
          {this.state.showComment && (
            <CommentPopup
              hideCreatePopup={this.hideCreatePopup}
              showComment={this.state.showComment}
              comment={this.state.comment}
            />
          )}

          <Col xs={12} className="album-details-outer-wrap p-none">
            <Col xs={12} className="action-wrap">
              <div className="select-delete">
                <Checkbox
                  className="all-selection-check"
                  onClick={event => this.selectAll(event)}
                >
                  {' '}
                  Select All
                  <div className="check">
                    <div className="inside" />
                  </div>
                </Checkbox>

                <Button
                  className="delete-selected btn-link"
                  onClick={() => this.showDialogueBox()}
                >
                  <img
                    src={require('../../../assets/images/admin/album/album-details/delete-icon.png')}
                    alt="delete"
                  />{' '}
                  Delete Selected
                </Button>
                <Link
                  to={
                    album.is_private
                      ? '/shared_album_login/' + albumSlug
                      : '/shared_album/' + albumSlug
                  }
                  target="_blank"
                  className="view-album-detail"
                >
                  <img
                    src={require('../../../assets/images/admin/album/album-details/views-icon.png')}
                    alt=""
                  />{' '}
                  View Album
                </Link>
                {(album.delivery_status === 'Submitted' ||
                  album.delivery_status === 'Delivered') && (
                  <Button
                    className="delete-selected btn-link"
                    onClick={() =>
                      showSelectedPhotos
                        ? this.showAlbum()
                        : this.getSelectedPhotos()}
                  >
                    <img
                      src={require('../../../assets/images/admin/album/album-details/views-icon.png')}
                      alt=""
                    />{' '}
                    {showSelectedPhotos
                      ? 'Show All Photos'
                      : 'Show Selected Photos'}
                  </Button>
                )}
              </div>
              <div className="detail-btn-wrap">
                <Button
                  className="edit-album-detail"
                  onClick={() =>
                    this.setState({
                      showCreatePopup: true,
                      editObject: album
                    })}
                >
                  <img
                    src={require('../../../assets/images/admin/category/edit-icon.png')}
                    alt=""
                  />{' '}
                  Edit Album
                </Button>
                <Button
                  className="add-photoes-btn btn btn-orange"
                  onClick={event => {
                    this.setState({ addPhoto: true });
                    this.checkboxCheckUncheck(false);
                  }}
                >
                  <img
                    src={require('../../../assets/images/admin/album/album-details/add-icon.png')}
                    alt=""
                  />{' '}
                  Add photos
                </Button>
              </div>
            </Col>
            <Col
              xs={12}
              className={
                this.state.openDetailsBar
                  ? 'album-details-page-wrap p-none open-detail'
                  : 'album-details-page-wrap p-none'
              }
            >
              <span
                className="detail-toggle-btn"
                onClick={() =>
                  this.setState({ openDetailsBar: !this.state.openDetailsBar })}
              >
                <i
                  className={
                    this.state.openDetailsBar
                      ? 'fa fa-close'
                      : 'fa fa-snowflake-o wobble-fix fa-spin'
                  }
                  aria-hidden="true"
                />
              </span>
              <Col
                xs={12}
                sm={12}
                md={8}
                lg={9}
                className="photo-selection-wrap"
              >
                {photos &&
                  photos.length === 0 && (
                    <h4 className="text-center m-t-15">
                      {' '}
                      No images available.Please click on Add Photo button to
                      upload images.
                    </h4>
                  )}
                <ReactCSSTransitionGroup
                  transitionName="page-animation"
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnterTimeout={500}
                  transitionLeave={false}
                >
                  {album.photos &&
                    album.photos.map((photo, index) => (
                      <Col
                        xs={6}
                        sm={4}
                        md={4}
                        lg={3}
                        className={
                          showSelectedPhotos
                            ? 'album-image-wrap no-m-l-r album-photo-thumbs-wrap portfolio-album-thub-wrap selected-photo-name-wrapper'
                            : photo.is_cover_photo
                              ? 'album-image-wrap cover-pic no-m-l-r album-photo-thumbs-wrap portfolio-album-thub-wrap'
                              : 'album-image-wrap no-m-l-r album-photo-thumbs-wrap portfolio-album-thub-wrap'
                        }
                        key={photo.id}
                      >
                        <Col xs={12} className="album-photo-thumbs p-none">
                          <img
                            className="img-responsive album-image"
                            src={photo.image}
                            alt={photo.image_file_name}
                          />
                          <a
                            onClick={() => this.openLightbox(photo)}
                            className="overlay"
                          >
                            <i
                              className="fa fa-search-plus overlay-search"
                              aria-hidden="true"
                            />
                          </a>
                        </Col>
                        {showSelectedPhotos ? (
                          <span
                            className="set-cover-pic custom-cover-pic "
                            onClick={event => {
                              this.handleSetCoverPicClick(photo.id, index);
                            }}
                          >
                            {' '}
                            {photo.image_file_name}
                          </span>
                        ) : (
                          !photo.is_cover_photo && (
                            <span
                              className="set-cover-pic custom-cover-pic "
                              onClick={event => {
                                this.handleSetCoverPicClick(photo.id, index);
                              }}
                            >
                              {' '}
                              {showSelectedPhotos
                                ? photo.image_file_name
                                : 'Set as Cover Pic'}
                            </span>
                          )
                        )}

                        <Checkbox
                          name="photo-checkbox"
                          id={photo.id}
                          className="pic-selection-check photo-selection-checkbox"
                        >
                          <div className="check">
                            <div className="inside" />
                          </div>
                        </Checkbox>
                        {photo.comment_id && (
                          <a
                            className="admin-view-comment"
                            title="View comment"
                            onClick={() => this.getComment(photo)}
                          >
                            {/* <img
                              src={require('../../../assets/images/admin/album/white-eye.png')}
                              
                              alt=""
                            /> */}
                            <i className="fa fa-eye link-icons admin-custom-view-comment-icon" />
                          </a>
                        )}
                      </Col>
                    ))}
                </ReactCSSTransitionGroup>
              </Col>

              <Col sm={12} md={4} lg={3} className="album-info-wrap">
                <label className="album-info-label">
                  <img
                    src={require('../../../assets/images/admin/album/album-details/photos-icon.png')}
                    className="info-icon"
                    alt=""
                  />
                  <span className="information">
                    {album.photo_count} photos
                  </span>
                </label>
                <label className="album-info-label">
                  <img
                    src={require('../../../assets/images/admin/album/album-details/views-icon.png')}
                    className="info-icon"
                    alt=""
                  />
                  <span className="information">0 Views</span>
                </label>
                <label className="album-info-label">
                  <img
                    src={require('../../../assets/images/admin/album/album-details/portfolio-icon.png')}
                    className="info-icon"
                    alt=""
                  />
                  <span className="information">
                    {album.portfolio_visibility
                      ? 'Visible in portfolio'
                      : 'Hidden in portfolio'}
                  </span>
                </label>
                <label className="album-info-label">
                  <img
                    src={require('../../../assets/images/admin/album/album-details/public-icon.png')}
                    className="info-icon"
                    alt=""
                  />
                  <span className="information">
                    {album.is_private
                      ? 'Marked as private'
                      : 'Marked as public'}
                  </span>
                </label>
                <label className="album-info-label">
                  <img
                    src={require('../../../assets/images/admin/album/album-details/calandar-icon.png')}
                    className="info-icon"
                    alt=""
                  />
                  <span className="information">{album.updated_at}</span>
                </label>
                {album.is_private && (
                  <label className="album-info-label">
                    <img
                      src={require('../../../assets/images/admin/album/album-details/passcode-icon.png')}
                      className="info-icon"
                      alt=""
                    />
                    <span
                      className="information album-passcode text-green passcode-text"
                      onClick={event => {
                        this.handlePasscodeClick(event, album.passcode);
                      }}
                    >
                      View Passcode
                    </span>
                  </label>
                )}
                <Col xs={12} className="p-none detail-separator">
                  <hr />
                </Col>
                <Col xs={12} className="p-none">
                  <h4 className="album-delivery-details">selection process</h4>
                  {album.delivery_status === 'Submitted' ||
                  album.delivery_status === 'Delivered' ? (
                    <Col>
                      <span className="album-delivery-status text-yellow">
                        {album.delivery_status === 'Delivered'
                          ? 'Album Delivered'
                          : 'Selection Process Completed'}
                      </span>
                      <div className="already-shared-with minimum-photo-selection">
                        Photos Selected:
                        <button
                          className="share-count minimum-photo-selection-count"
                          onClick={() => this.getSelectedPhotos()}
                        >
                          {album.selected_photo_count}
                        </button>
                      </div>
                      <div className="already-shared-with commented-photo-count-wrapper">
                        Comments:
                        {album.commented_photo_count > 0 ? (
                          <button
                            className="share-count minimum-photo-selection-count"
                            onClick={() => this.getCommentedPhotos()}
                          >
                            {album.commented_photo_count}
                          </button>
                        ) : (
                          <span className="share-count minimum-photo-selection-count">
                            {album.commented_photo_count}
                          </span>
                        )}
                      </div>
                      {album.delivery_status === 'Submitted' && (
                        <Button
                          className="btn btn-orange share-album-btn album-deliverd-btn"
                          onClick={() => this.deliveredAlbum()}
                        >
                          Album Deliverd
                        </Button>
                      )}
                    </Col>
                  ) : (
                    <Col>
                      <a
                        className={
                          album.delivery_status === 'Stoped_selection'
                            ? 'album-delivery-status text-yellow photo-selection-count-with-progress stoped-selection-album'
                            : 'album-delivery-status text-yellow selection-album-link'
                        }
                        onClick={() =>
                          album.delivery_status !== 'Stoped_selection'
                            ? this.getAdminAlbumRecipients(album)
                            : ''}
                      >
                        {album.delivery_status === 'Stoped_selection'
                          ? 'Client Selection Is Stopped'
                          : album.album_recipients &&
                            (!isObjectEmpty(album.album_recipients) &&
                              album.album_recipients.length > 0)
                            ? 'Client Selection In Progress'
                            : 'Invite For Selection Album'}
                      </a>
                      <div className="already-shared-with minimum-photo-selection">
                        Minimum Photo
                        <button className="share-count minimum-photo-selection-count photo-selection-count-with-progress">
                          {' '}
                          {album.album_recipients &&
                          (!isObjectEmpty(album.album_recipients) &&
                            album.album_recipients.length > 0 &&
                            album.album_recipients[0] !== null)
                            ? album.album_recipients[0].minimum_photo_selection
                            : 0}{' '}
                        </button>
                      </div>
                      <div className="already-shared-with">
                        Comments Allowed:
                        <span className="comment-allowed">
                          {album.album_recipients &&
                          (!isObjectEmpty(album.album_recipients) &&
                            album.album_recipients.length > 0 &&
                            album.album_recipients[0] !== null)
                            ? album.album_recipients[0].allow_comments
                              ? ' Yes'
                              : ' No'
                            : '     -'}
                        </span>
                      </div>
                      {album.album_recipients &&
                      (!isObjectEmpty(album.album_recipients) &&
                        album.album_recipients.length > 0) ? (
                        <Button
                          className="btn-orange share-album-btn album-deliverd-btn text-lowercase"
                          onClick={event => this.showActionDialogueBox(event)}
                        >
                          Reset Selection
                        </Button>
                      ) : (
                        ''
                      )}
                      {album.album_recipients &&
                      (!isObjectEmpty(album.album_recipients) &&
                        album.album_recipients.length > 0) ? (
                        <Button
                          className="btn-orange share-album-btn album-deliverd-btn text-lowercase"
                          onClick={event => this.showActionDialogueBox(event)}
                        >
                          {album.delivery_status === 'Stoped_selection'
                            ? 'Re-Allow Photo Selection'
                            : 'Stop Allowing Selection'}
                        </Button>
                      ) : (
                        ''
                      )}
                    </Col>
                  )}
                </Col>
                <Col xs={12} className="p-none detail-separator">
                  <hr />
                </Col>
                <Col xs={12} className="p-none">
                  <h4 className="album-delivery-details">
                    album sharing details
                  </h4>
                  {/* <h4
                    className={
                      'album-delivery-status ' +
                      getStatusClass(album.delivery_status)
                    }
                  >
                    {album.delivery_status} album
                  </h4> */}
                  <Button
                    className="btn btn-orange share-album-btn"
                    onClick={() =>
                      this.setState({
                        shareAlbum: true,
                        shareAlbumObject: album
                      })}
                  >
                    <img
                      src={require('../../../assets/images/admin/album/album-details/share-icon.png')}
                      alt=""
                    />Share album
                  </Button>
                  <br />
                  {album.recipients_count > 0 && (
                    <div className="already-shared-with">
                      Already shared with
                      <button
                        className="share-count"
                        onClick={() =>
                          this.setState({ alreadySharedAlbum: true })}
                      >
                        {' '}
                        {album.recipients_count}{' '}
                      </button>
                    </div>
                  )}
                </Col>
                <Col xs={12} className="p-none detail-separator">
                  <hr />
                </Col>
                <Col xs={12} className="p-none album-badges-wrap">
                  {album.categories &&
                    album.categories.map(category => (
                      <span className="album-badge" key={category.id}>
                        {category.category_name}
                      </span>
                    ))}
                </Col>
                {isOpenLightbox &&
                  photos &&
                  album.cover_photo && (
                    <LightBoxModule
                      isOpenLightbox={isOpenLightbox}
                      photos={photos}
                      photoIndex={photoIndex}
                      album={album}
                      closeLightBox={this.closeLightBox}
                    />
                  )}
              </Col>
            </Col>
            <Col sm={9} xs={12}>
              <PaginationModule
                pagination={album.photo_pagination}
                paginationClick={this.handlePaginationClick}
              />
            </Col>
          </Col>
        </Col>
      </div>
    );
  }
}

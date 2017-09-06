import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Checkbox } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
import Lightbox from 'react-image-lightbox';

// Import component
import ShareAlbum from './ShareAlbum';
import AlreadyShared from './AlreadyShared';
import AddPhoto from './AddPhoto';
import AlbumPopup from './AlbumPopup';

// Import services
import { deleteSelectedPhotos } from '../../../services/admin/Photo';
import { setCoverPhoto } from '../../../services/admin/Photo';

// Import helper
import { getStatusClass } from '../../Helper';

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
      add_photo: '',
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

  showDialogueBox() {
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

  hideDialogueBox() {
    this.setState({ alert: { show: false } });
  }

  hideCreatePopup = () => {
    this.setState({ showCreatePopup: false, editObject: {} });
  };
  componentWillMount() {
    // const params = new URLSearchParams(this.props.location.search);
    // if (params.get('add_photo') !== this.state.add_photo) {
    //   self.setState({ add_photo: params.get('add_photo') });
    // }
    console.log(this.props.location);
    if (this.props.location.search) {
      this.setState({ addPhoto: true });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.album.id !== this.props.album.id) {
      this.setState({ album: this.props.album });
    }
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

    deleteSelectedPhotos({ photo: { ids: ids } })
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
        title: response.data.message,
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
    setCoverPhoto(id)
      .then(function(response) {
        self.handleCoverPicSuccessResponse(response, index);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  handleCoverPicSuccessResponse(response, index) {
    var data = response.data;
    if (response.status === 201) {
      const { cover_photo, photos } = this.state.album;
      photos.splice(index, 1, cover_photo);
      const newAlbum = Object.assign({}, this.state.album);
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

  renderShareAlbum = count => {
    const newAlbum = Object.assign({}, this.state.album);
    newAlbum.delivery_status = 'Shared';
    this.setState({ album: newAlbum });
    this.renderRecipientsCount('add', count);
  };

  renderAlbum = album => {
    const newAlbum = Object.assign({}, this.state.album);
    newAlbum.is_private = album.is_private;
    newAlbum.portfolio_visibility = album.portfolio_visibility;
    newAlbum.categories = album.categories;
    this.setState({ album: newAlbum });
  };

  closeAddPhoto = () => {
    this.setState({ addPhoto: false });
  };
  closeShareAlbum = () => this.setState({ shareAlbum: false });
  closeAlreadySharedAlbum = () => this.setState({ alreadySharedAlbum: false });

  render() {
    const { album, alert, albumSlug, isOpenLightbox, photoIndex } = this.state;
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
            />
          )}
          {this.state.shareAlbum && (
            <ShareAlbum
              albumId={album.id}
              shareAlbum={this.state.shareAlbum}
              closeShareAlbum={this.closeShareAlbum}
              renderShareAlbum={this.renderShareAlbum}
              shareAlbumObject={this.state.shareAlbumObject}
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
                    album.is_private ? (
                      '/shared_album_login/' + albumSlug
                    ) : (
                      '/shared_album/' + albumSlug
                    )
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
              </div>

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
            </Col>
            <Col
              xs={12}
              className={
                this.state.openDetailsBar ? (
                  'album-details-page-wrap p-none open-detail'
                ) : (
                  'album-details-page-wrap p-none'
                )
              }
            >
              <span
                className="detail-toggle-btn"
                onClick={() =>
                  this.setState({ openDetailsBar: !this.state.openDetailsBar })}
              >
                <i
                  className={
                    this.state.openDetailsBar ? (
                      'fa fa-close'
                    ) : (
                      'fa fa-snowflake-o wobble-fix fa-spin'
                    )
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
                {album.cover_photo && (
                  <Col
                    xs={6}
                    sm={4}
                    md={4}
                    lg={3}
                    className="album-image-wrap cover-pic no-m-l-r album-photo-thumbs-wrap portfolio-album-thub-wrap"
                  >
                    <Col xs={12} className="album-photo-thumbs p-none">
                      <img
                        className="img-responsive album-image"
                        src={album.cover_photo.image}
                        alt={album.cover_photo.image_file_name}
                      />
                      {album.cover_photo.is_cover_photo && (
                        <a
                          onClick={() => this.openLightbox(album.cover_photo)}
                          className="overlay"
                        >
                          <i
                            className="fa fa-search-plus overlay-search"
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </Col>
                    {/* <Checkbox className="pic-selection-check">
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Checkbox> */}
                  </Col>
                )}

                {album.photos &&
                  album.photos.map((photo, index) => (
                    <Col
                      xs={6}
                      sm={4}
                      md={4}
                      lg={3}
                      className="album-image-wrap no-m-l-r album-photo-thumbs-wrap portfolio-album-thub-wrap"
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
                      <span
                        className="set-cover-pic custom-cover-pic"
                        onClick={event => {
                          this.handleSetCoverPicClick(photo.id, index);
                        }}
                      >
                        {' '}
                        Set as Cover Pic{' '}
                      </span>
                      <Checkbox
                        name="photo-checkbox"
                        id={photo.id}
                        className="pic-selection-check photo-selection-checkbox"
                      >
                        <div className="check">
                          <div className="inside" />
                        </div>
                      </Checkbox>
                    </Col>
                  ))}
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
                    {album.portfolio_visibility ? (
                      'Visible in portfolio'
                    ) : (
                      'Hidden in portfolio'
                    )}
                  </span>
                </label>
                <label className="album-info-label">
                  <img
                    src={require('../../../assets/images/admin/album/album-details/public-icon.png')}
                    className="info-icon"
                    alt=""
                  />
                  <span className="information">
                    {album.is_private ? (
                      'Marked as private'
                    ) : (
                      'Marked as public'
                    )}
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
                  <h4 className="album-delivery-details">
                    album delivery details
                  </h4>
                  <h4
                    className={
                      'album-delivery-status ' +
                      getStatusClass(album.delivery_status)
                    }
                  >
                    {album.delivery_status} album
                  </h4>
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
                  <Lightbox
                    mainSrc={
                      album.cover_photo.image && !photos[photoIndex] ? (
                        album.cover_photo.original_image
                      ) : (
                        photos[photoIndex].original_image
                      )
                    }
                    nextSrc={
                      photos[(photoIndex + 1) % photos.length].original_image
                    }
                    prevSrc={
                      photos[(photoIndex + photos.length - 1) % photos.length]
                        .original_image
                    }
                    onCloseRequest={() =>
                      this.setState({ isOpenLightbox: false })}
                    onMovePrevRequest={() =>
                      this.setState({
                        photoIndex:
                          (photoIndex + photos.length - 1) % photos.length
                      })}
                    onMoveNextRequest={() =>
                      this.setState({
                        photoIndex: (photoIndex + 1) % photos.length
                      })}
                    imageTitle={
                      album.cover_photo.image && !photos[photoIndex] ? (
                        album.cover_photo.image_file_name
                      ) : (
                        photos[photoIndex].image_file_name
                      )
                    }
                    imageCaption={'From Album ' + album.album_name}
                  />
                )}
              </Col>
            </Col>
          </Col>
        </Col>
      </div>
    );
  }
}

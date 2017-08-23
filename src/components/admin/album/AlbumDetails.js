import React, { Component } from 'react';
import { Col, Button, Checkbox } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';

// Import component
import ShareAlbum from './ShareAlbum';
import AlreadyShared from './AlreadyShared';
import AddPhoto from './AddPhoto';

// Import services
import { showAlbum } from '../../../services/admin/Album';
import { deleteSelectedPhotos } from '../../../services/admin/Photo';

// Import css
import '../../../assets/css/admin/album/album-details/album-details.css';

export default class AlbumDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDetailsBar: false,
      addPhoto: false,
      shareAlbum: false,
      alreadySharedAlbum: false,
      albumSlug: this.props.match.params.slug,
      album: {},
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

  componentWillMount() {
    var self = this;

    showAlbum(self.state.albumSlug)
      .then(function(response) {
        self.handleAlbumSuccessResponse(response);
      })
      .catch(function(error) {
        console.log(error.response);
      });
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
    Object.keys(checkboxes).map(key => (checkboxes[key].checked = action));
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
    console.log(response);
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

  handleAlbumSuccessResponse(response) {
    var data = response.data;
    if (response.status === 200) {
      this.setState({ album: data.data.album });
    } else {
      console.log(data);
    }
  }

  handlePasscodeClick(event, passcode) {
    const innerHtml = event.target.innerHTML;
    if (innerHtml === passcode) {
      event.target.innerHTML = 'View Passcode';
    } else {
      event.target.innerHTML = passcode;
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

  closeAddPhoto = () => {
    this.setState({ addPhoto: false });
  };
  closeShareAlbum = () => this.setState({ shareAlbum: false });
  closeAlreadySharedAlbum = () => this.setState({ alreadySharedAlbum: false });

  render() {
    const { album, alert } = this.state;
    return (
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
        {this.state.addPhoto &&
          <AddPhoto
            addPhoto={this.state.addPhoto}
            closeOn={this.closeAddPhoto}
            renderNewPhotos={this.renderNewPhotos}
            deletePhotos={this.deletePhotos}
            albumId={album.id}
          />}
        {this.state.shareAlbum &&
          <ShareAlbum
            shareAlbum={this.state.shareAlbum}
            closeOn={this.closeShareAlbum}
          />}
        {this.state.alreadySharedAlbum &&
          <AlreadyShared
            alreadySharedAlbum={this.state.alreadySharedAlbum}
            closeOn={this.closeAlreadySharedAlbum}
          />}

        <Col xs={12} className="album-details-outer-wrap p-none">
          <Col xs={12} className="action-wrap">
            <div className="select-delete">
              <Checkbox
                className="all-selection-check"
                onClick={event => this.selectAll(event)}
              >
                {' '}Select All
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
            </div>

            <Button
              className="add-photoes-btn btn btn-orange"
              onClick={() => this.setState({ addPhoto: true })}
            >
              <img
                src={require('../../../assets/images/admin/album/album-details/add-icon.png')}
                alt=""
              />{' '}
              Add photos
            </Button>
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

            <Col xs={12} sm={12} md={8} lg={9} className="photo-selection-wrap">
              {album.cover_photo &&
                <Col
                  xs={6}
                  sm={4}
                  md={4}
                  lg={3}
                  className="album-image-wrap cover-pic"
                >
                  <img
                    className="img-responsive album-image"
                    src={album.cover_photo.image}
                    alt={album.cover_photo.image_file_name}
                  />
                  {/* <Checkbox className="pic-selection-check">
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Checkbox> */}
                </Col>}
              {album.photos &&
                album.photos.map(photo =>
                  <Col
                    xs={6}
                    sm={4}
                    md={4}
                    lg={3}
                    className="album-image-wrap"
                    key={photo.id}
                  >
                    <img
                      className="img-responsive album-image"
                      src={photo.image}
                      alt={photo.image_file_name}
                    />
                    <Checkbox
                      name="photo-checkbox"
                      id={photo.id}
                      className="pic-selection-check"
                    >
                      <div className="check">
                        <div className="inside" />
                      </div>
                    </Checkbox>
                  </Col>
                )}
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
                  {album.is_private ? 'Marked as private' : 'Marked as public'}
                </span>
              </label>
              <label className="album-info-label">
                <img
                  src={require('../../../assets/images/admin/album/album-details/calandar-icon.png')}
                  className="info-icon"
                  alt=""
                />
                <span className="information">
                  {album.updated_at}
                </span>
              </label>
              <label className="album-info-label">
                <img
                  src={require('../../../assets/images/admin/album/album-details/passcode-icon.png')}
                  className="info-icon"
                  alt=""
                />
                <span
                  className="information album-passcode"
                  onClick={event => {
                    this.handlePasscodeClick(event, album.passcode);
                  }}
                >
                  view passcode
                </span>
              </label>

              <Col xs={12} className="p-none detail-separator">
                <hr />
              </Col>

              <Col xs={12} className="p-none">
                <h4 className="album-delivery-details">
                  album delivery details
                </h4>
                <h4 className="album-delivery-status">
                  {album.delivery_status} album
                </h4>
                <Button
                  className="btn btn-orange share-album-btn"
                  onClick={() => this.setState({ shareAlbum: true })}
                >
                  <img
                    src={require('../../../assets/images/admin/album/album-details/share-icon.png')}
                    alt=""
                  />Share album
                </Button>
                <br />
                <div className="already-shared-with">
                  Aleady shared with
                  <button
                    className="share-count"
                    onClick={() => this.setState({ alreadySharedAlbum: true })}
                  >
                    {' '}0{' '}
                  </button>
                </div>
              </Col>

              <Col xs={12} className="p-none detail-separator">
                <hr />
              </Col>

              <Col xs={12} className="p-none album-badges-wrap">
                {album.categories &&
                  album.categories.map(category =>
                    <span className="album-badge" key={category.id}>
                      {category.category_name}
                    </span>
                  )}
              </Col>
            </Col>
          </Col>
        </Col>
      </Col>
    );
  }
}
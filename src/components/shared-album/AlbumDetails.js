import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PageHeader, Grid, Col, Row, Checkbox, Button } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';

// Import component
import PaginationModule from '../common/PaginationModule';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LightBoxModule from '../common/LightBoxModule';
import CommentPopup from './CommentPopup';

// Import services
import { AlbumService, PhotoService } from '../../services/Index';

// Import helper
import { getIndexUsingLodash, currentUser } from '../Helper';

// Import css
import '../../assets/css/portfolio.css';

const paginationPerPage = 24;

export default class AlbumDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenLightbox: false,
      photoIndex: 0,
      album: {},
      albumSlug: this.props.match.params.slug,
      token: '',
      passcodeLoginState: {},
      createComment: false,
      //showComment: false,
      photo: [],
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

  componentWillMount() {
    var self = this;
    const { search, state } = self.props.location;
    const params = new URLSearchParams(search);
    // const newToken = search.split('=')[1];
    self.setState({ passcodeLoginState: state });
    const token = params.get('token');
    if (token !== self.state.token) {
      self.setState({ token: token });
    }
    self.showAlbum(token);
  }

  showAlbum(token, page = 1) {
    var self = this;
    var user = self.props.match.params.user
    var userId = currentUser() === null ? "" : currentUser().id
    AlbumService.showAlbum(self.state.albumSlug, {
      page: page,
      per_page: paginationPerPage,
      token: token,
      user: user,
      is_track: true,
      user_id: userId
      // token: token
    })
      .then(function(response) {
        var data = response.data;
        if (response.status === 200) {
          self.setState({ album: data.data.album });
        }
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  handlePaginationClick = eventKey => {
    if (eventKey !== this.state.album.photo_pagination.current_page)
      this.showAlbum(this.state.token, eventKey);
  };

  showDialogueBox() {
    var alert = {};
    if (this.state.album.selected_photo_count < 1) {
      alert = {
        show: true,
        title: 'Ooops',
        text: 'Please select photos',
        type: 'warning',
        confirmAction: () => this.setState({ alert: { show: false } })
      };
    } else {
      if (
        this.state.album.selected_photo_count <
        this.state.album.album_recipients[0].minimum_photo_selection
      ) {
        alert = {
          show: true,
          title: 'Ooops',
          text:
            'Please select minimum ' +
            this.state.album.album_recipients[0].minimum_photo_selection +
            ' photos',
          type: 'warning',
          confirmAction: () => this.setState({ alert: { show: false } })
        };
      } else {
        alert = {
          show: true,
          title: 'Are you sure you want to send photos to Sagar?',
          btnText: 'Yes, submit it!',
          type: 'warning',
          confirmAction: () => this.handleSubmitPhotos(),
          cancelBtn: true
        };
      }
    }
    this.setState({
      alert: alert
    });
  }

  handleSubmitPhotos() {
    var self = this;
    AlbumService.submitAlbum(this.state.albumSlug)
      .then(function(response) {
        self.handleSubmitSuccessResponse(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getSelectedCheckboxIds() {
    var ids = [];
    var selected_photo_ids = [];
    var is_checked = document.querySelector('.all-selection-check input')
      .checked;
    const photos = this.state.album.photos;
    photos.map(photo => {
      if (photo.is_selected === true) selected_photo_ids.push(photo.id);
      return selected_photo_ids;
    });
    Object.keys(photos).map(key => ids.push(photos[key].id));
    if (is_checked === true)
      ids = ids.filter(val => !selected_photo_ids.includes(val));
    return ids;
  }

  selectPhoto(index, photoId) {
    var self = this;
    photoId = photoId || self.getSelectedCheckboxIds().map(Number);
    PhotoService.selectPhoto({ photo: { ids: photoId } })
      .then(function(response) {
        if (response.status === 201) {
          self.handlePhotoSuccessResponse(index, response);
        }
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  handleSubmitSuccessResponse(response) {
    var alert = {};
    const newALbum = Object.assign({}, this.state.album);
    newALbum.delivery_status = 'Submitted';
    if (response.status === 201) {
      alert = {
        show: true,
        title: 'Success',
        text: response.data.message,
        type: 'success',
        confirmAction: () => this.setState({ alert: { show: false } })
      };
    } else if (response.status === 208) {
      alert = {
        show: true,
        title: 'Ooops',
        text: response.data.message,
        type: 'warning',
        confirmAction: () => this.setState({ alert: { show: false } })
      };
    }
    this.setState({
      album: newALbum,
      alert: alert
    });
  }

  handlePhotoSuccessResponse(index, response) {
    var photos = response.data.data.photos;
    var newAlbum = Object.assign({}, this.state.album);
    var newPhotos = newAlbum.photos;
    var album = this.state.album;
    photos.map(photo => {
      if (index === undefined) {
        var new_photo_index = getIndexUsingLodash(album.photos, photo.id);
      }
      newPhotos.splice(index ? index : new_photo_index, 1, photo);
      photo.is_selected
        ? (newAlbum.selected_photo_count += 1)
        : (newAlbum.selected_photo_count -= 1);
      return true;
    });
    this.setState({ album: newAlbum });
  }

  openLightbox(photo) {
    const allPhotos = this.state.album.photos;
    const photoIndex = allPhotos.indexOf(photo);
    this.setState({ isOpenLightbox: true, photoIndex: photoIndex });
  }

  closeLightBox = () => {
    this.setState({ isOpenLightbox: false });
  };

  hideCreatePopup = () => {
    // this.setState({ createComment: false, showComment: false });
    this.setState({ createComment: false });
  };
  renderComment = (id, photo) => {
    photo.comment_id = id;
    this.setState({ photo: photo });
  };

  //   getComment(photo) {
  //     var self = this;
  //     if (photo.comment_id) {
  //       CommentService.showComment(photo.id, photo.comment_id).then(function(
  //         response
  //       ) {
  //         if (response.status === 200) {
  //           self.setState({
  //             showComment: true,
  //             comment: response.data.data.comment
  //           });
  //         }
  //       });
  //     }
  //   }
  selectAll(event) {
    if (event.target.checked) {
      this.checkboxCheckUncheck(true);
    } else {
      this.checkboxCheckUncheck(false);
    }
    this.selectPhoto();
  }
  checkboxCheckUncheck(action) {
    var checkboxes = document.getElementsByName('photo-checkbox');
    document.querySelector('.all-selection-check input').checked = action;
    Object.keys(checkboxes).map(key => (checkboxes[key].checked = action));
  }
  render() {
    const {
      album,
      isOpenLightbox,
      photoIndex,
      token,
      albumSlug,
      passcodeLoginState,
      alert
    } = this.state;
    const photos = album.photos;
    if (album.is_private && passcodeLoginState === undefined) {
      return (
        <Redirect to={'/'+this.props.match.params.user+`/shared_album_login/${albumSlug}?token=${token}`} />
      );
    }
    return (
      <div className="page-wrap portfolio-wrap">
        <SweetAlert
          show={alert.show || false}
          title={alert.title || ''}
          text={alert.text || ''}
          type={alert.type || 'success'}
          showCancelButton={alert.cancelBtn}
          confirmButtonText={alert.btnText}
          onConfirm={alert.confirmAction}
          onCancel={() => this.setState({ alert: { show: false } })}
        />
        {(this.state.createComment || this.state.showComment) && (
          <CommentPopup
            createComment={this.state.createComment}
            hideCreatePopup={this.hideCreatePopup}
            //showComment={this.state.showComment}
            renderComment={this.renderComment}
            //comment={this.state.comment}
            photo={this.state.photo}
          />
        )}
        <Grid>
          <PageHeader className="page-title page-main-title text-center portfolio-main-title">
            <label>{album.album_name}</label>
          </PageHeader>
          <Col xs={12} className="p-none">
            <Col xs={6} className="photo-count-detail selected-photo-count">
              {album.album_recipients &&
                album.album_recipients.length > 0 &&
                album.selected_photo_count +
                  '/' +
                  album.photo_count +
                  ' photos selected'}
            </Col>
            <Col xs={6} className="photo-count-detail">
              Total Photos: {album.photo_count}
            </Col>
          </Col>
          <Col xs={12} className="p-none">
            <Row className="clearfix">
              <Col sm={12} className="portfolio-content">
                <Col xs={12} className="shared-album-wrap">
                  <ReactCSSTransitionGroup
                    transitionName="page-animation"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeave={false}
                  >
                    {photos &&
                      photos.map((photo, index) => (
                        <Col
                          xs={4}
                          sm={3}
                          md={2}
                          className="no-m-l-r portfolio-thumbs-wrap portfolio-album-thub-wrap"
                          key={photo.id}
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt={photo.image_file_name}
                              src={photo.image}
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
                          {album.delivery_status === 'Shared' &&
                          album.album_recipients.length > 0 &&
                          album.can_moderate_album ? (
                            <div>
                              <Checkbox
                                name="photo-checkbox"
                                id={photo.id}
                                onChange={event =>
                                  this.selectPhoto(index, photo.id)}
                                checked={photo.is_selected}
                                className={
                                  photo.is_selected
                                    ? 'pic-selection-check photo-selection-checkbox'
                                    : 'pic-selection-check photo-selection-checkbox custom-pic-selection'
                                }
                              >
                                <div className="check">
                                  <div className="inside" />
                                </div>
                              </Checkbox>
                              {album.album_recipients[0].allow_comments && (
                                <span className="photo-count custom-comment-wrapper">
                                  <a
                                    className={
                                      photo.comment_id
                                        ? 'comment-disabled'
                                        : 'add-comment'
                                    }
                                    title={
                                      photo.comment_id ? '' : 'Add comment'
                                    }
                                    onClick={() =>
                                      this.setState({
                                        createComment: photo.comment_id
                                          ? false
                                          : true,
                                        photo: photo
                                      })}
                                  >
                                    <img
                                      src={require('../../assets/images/admin/album/testimonial-icon.png')}
                                      className="link-icons custom-add-comment-icon"
                                      alt=""
                                    />
                                  </a>

                                  {/* <a
                                  className={
                                    photo.comment_id ? (
                                      'add-comment'
                                    ) : (
                                      'comment-disabled'
                                    )
                                  }
                                  title={photo.comment_id ? 'View comment' : ''}
                                  onClick={() => this.getComment(photo)}
                                >
                                  <img
                                    src={require('../../assets/images/admin/album/white-eye.png')}
                                    className="link-icons custom-view-comment-icon"
                                    alt=""
                                  />
                                </a> */}
                                </span>
                              )}
                            </div>
                          ) : (
                            <div
                              className={
                                photo.is_selected ? 'pic-selected' : ''
                              }
                            />
                          )}
                        </Col>
                      ))}
                  </ReactCSSTransitionGroup>
                  {isOpenLightbox &&
                    photos && (
                      <LightBoxModule
                        isOpenLightbox={isOpenLightbox}
                        photos={photos}
                        photoIndex={photoIndex}
                        album={album}
                        closeLightBox={this.closeLightBox}
                      />
                    )}
                </Col>
                <Col>
                  {album.delivery_status === 'Shared' &&
                    album.can_moderate_album &&
                    album.album_recipients &&
                    album.album_recipients.length > 0 && (
                      <Col sm={6} xs={12} className="custom-submit-photos-wrap">
                        <Col className="footer-photo-selection-count">
                          {album.selected_photo_count +
                            '/' +
                            album.photo_count +
                            ' photos selected'}
                        </Col>
                        <Button
                          className="btn-orange contact-submit-btn text-center btn btn-default submit-photos-btn"
                          onClick={() => this.showDialogueBox()}
                        >
                          Submit photos
                        </Button>
                        <Checkbox
                          className="all-selection-check shared-album-select-all"
                          onChange={event => this.selectAll(event)}
                          checked={
                            album.selected_photo_count === album.photo_count
                              ? true
                              : false
                          }
                        >
                          {' '}
                          Select All
                          <div className="check">
                            <div className="inside" />
                          </div>
                        </Checkbox>
                      </Col>
                    )}
                  <Col sm={6} xs={12} className="p-none pull-right">
                    <PaginationModule
                      pagination={album.photo_pagination}
                      paginationClick={this.handlePaginationClick}
                    />
                  </Col>
                </Col>
              </Col>
            </Row>
          </Col>
        </Grid>
      </div>
    );
  }
}

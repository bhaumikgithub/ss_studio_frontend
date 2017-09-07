import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PageHeader, Grid, Col, Row, Checkbox, Button } from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';
import SweetAlert from 'sweetalert-react';

// Import services
import { showAlbum, submitAlbum } from '../../services/admin/Album';
import { selectPhoto } from '../../services/admin/Photo';

// Import css
import '../../assets/css/portfolio.css';

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
    const { search, state } = this.props.location;
    const params = new URLSearchParams(search);
    self.setState({ passcodeLoginState: state });
    if (params.get('token') !== this.state.token) {
      self.setState({ token: params.get('token') });
    }

    showAlbum(self.state.albumSlug)
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
      alert = {
        show: true,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        btnText: 'Yes, submit it!',
        type: 'warning',
        confirmAction: () => this.handleSubmitPhotos(),
        cancelBtn: true
      };
    }
    this.setState({
      alert: alert
    });
  }

  handleSubmitPhotos() {
    var self = this;
    submitAlbum(this.state.albumSlug)
      .then(function(response) {
        self.handleSubmitSuccessResponse(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  selectPhoto(index, photoId) {
    var self = this;
    selectPhoto(photoId)
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
    var photo = response.data.data.photo;
    var newAlbum = Object.assign({}, this.state.album);
    var newPhotos = newAlbum.photos;

    newPhotos.splice(index, 1, photo);
    photo.is_selected
      ? (newAlbum.selected_photo_count += 1)
      : (newAlbum.selected_photo_count -= 1);
    newPhotos.photos = newPhotos;
    this.setState({ album: newAlbum });
  }

  openLightbox(photo) {
    const allPhotos = this.state.album.photos;
    const photoIndex = allPhotos.indexOf(photo);
    this.setState({ isOpenLightbox: true, photoIndex: photoIndex });
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
        <Redirect to={`/shared_album_login/${albumSlug}?token=${token}`} />
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
        <Grid>
          <Col xs={12} className="p-none">
            <Col className="photo-count-detail left-15">
              {album.selected_photo_count +
                '/' +
                album.photo_count +
                ' photos selected'}
            </Col>
            <Col className="photo-count-detail">
              Total Photos: {album.photo_count}
            </Col>
            <PageHeader className="page-title page-main-title text-center">
              <label>{album.album_name}</label>
            </PageHeader>
          </Col>
          <Col xs={12} className="p-none">
            <Row className="clearfix">
              <Col sm={12} className="portfolio-content">
                <Col xs={12} className="p-none">
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
                          <img alt={photo.image_file_name} src={photo.image} />
                          <a
                            onClick={() => this.openLightbox(photo)}
                            className="overlay"
                          >
                            <i
                              className="fa fa-search-plus overlay-search"
                              aria-hidden="true"
                            />
                          </a>
                          {album.delivery_status !== 'Submitted' && (
                            <Checkbox
                              onChange={event =>
                                this.selectPhoto(index, photo.id)}
                              checked={photo.is_selected}
                              className="pic-selection-check photo-selection-checkbox"
                            >
                              <div className="check">
                                <div className="inside" />
                              </div>
                            </Checkbox>
                          )}
                        </Col>
                      </Col>
                    ))}
                  {isOpenLightbox &&
                  photos && (
                    <Lightbox
                      mainSrc={photos[photoIndex].original_image}
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
                      imageTitle={photos[photoIndex].image_file_name}
                      imageCaption={'From Album ' + album.album_name}
                    />
                  )}
                </Col>
                {album.delivery_status !== 'Submitted' && (
                  <Col xs={12} className="text-center p-t-40">
                    <Button
                      className="btn-orange contact-submit-btn text-center btn btn-default"
                      onClick={() => this.showDialogueBox()}
                    >
                      Submit photos
                    </Button>
                  </Col>
                )}
              </Col>
            </Row>
          </Col>
        </Grid>
      </div>
    );
  }
}

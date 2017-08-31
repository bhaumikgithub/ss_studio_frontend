import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PageHeader, Grid, Col, Row, Checkbox } from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';

// Import services
import { showAlbum } from '../../services/admin/Album';

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
      passcodeLoginState: {}
    };
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillMount() {
    var self = this;
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const passcodeLoginState = this.props.location.state;
    self.setState({ passcodeLoginState: passcodeLoginState });
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
      passcodeLoginState
    } = this.state;
    const photos = album.photos;
    if (album.is_private === true && passcodeLoginState === undefined) {
      return (
        <Redirect
          to={`/shared_album_login?album=${albumSlug}&token=${token}`}
        />
      );
    }
    return (
      <div className="page-wrap portfolio-wrap">
        <Grid>
          <Col xs={12} className="p-none">
            <PageHeader className="page-title page-main-title text-center">
              <label>{album.album_name}</label>
            </PageHeader>
          </Col>
          <Col xs={12} className="p-none">
            <Row className="clearfix">
              <Col sm={12} className="portfolio-content">
                <Col xs={12} className="p-none">
                  {photos &&
                    photos.map(photo => (
                      <Col
                        xs={4}
                        sm={3}
                        md={2}
                        className="no-m-l-r portfolio-thumbs-wrap portfolio-album-thub-wrap"
                        key={photo.id}
                      >
                        <Col xs={12} className="portfolio-thumbs p-none">
                          <img alt={photo.image_file_name} src={photo.image} />
                          <Checkbox className="pic-selection-check">
                            <div className="check">
                              <div className="inside" />
                            </div>
                          </Checkbox>
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
              </Col>
            </Row>
          </Col>
        </Grid>
      </div>
    );
  }
}

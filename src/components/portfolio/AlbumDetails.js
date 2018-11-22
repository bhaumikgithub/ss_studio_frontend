import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Grid, Col, Row } from 'react-bootstrap';

// Import component
import LightBoxModule from '../common/LightBoxModule';

// Import component
import PaginationModule from '../common/PaginationModule';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Import services
import { AlbumService } from '../../services/Index';

// Import css
import '../../assets/css/portfolio.css';

// Import helper
import { isObjectEmpty } from '../Helper';

const paginationPerPage = 24;

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenLightbox: false,
      photoIndex: 0,
      album: {},
      albumSlug: this.props.match.params.slug
    };
  }

  componentWillMount() {
    this.showAlbum();
  }

  showAlbum(page = 1) {
    var self = this;
    var user = this.props.match.params.user;
    AlbumService.showAlbum(self.state.albumSlug, {
      page: page,
      per_page: 32,
      user: user
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
      this.showAlbum(eventKey);
  };

  openLightbox(photo) {
    const allPhotos = this.state.album.photos;
    const photoIndex = allPhotos.indexOf(photo);
    this.setState({ isOpenLightbox: true, photoIndex: photoIndex });
  }

  closeLightBox = () => {
    this.setState({ isOpenLightbox: false });
  };

  render() {
    const { album, isOpenLightbox, photoIndex } = this.state;
    const photos = album.photos;
    return (
      <div className="page-wrap portfolio-wrap">
        <Grid>
        <PageHeader className="page-title page-main-title text-center portfolio-main-title portfolio-album-title">
          <label>{album.album_name}</label>
        </PageHeader>
        <div className="text-center">
          {!isObjectEmpty(album) && album.categories.map(category => (
            <span
              className="album-badge"portfolio-title
              key={category.category_name}
            >
              {album.categories[album.categories.length-1] === category ? ' '+category.category_name  : ' '+category.category_name + ','}
            </span>
          ))}
        </div>
        <Row className="back-album-wrap">
            <Col xs={6}>
              <Link to={"/"+this.props.match.params.user+"/portfolio"} className="back-link">
                <i className="fa fa-arrow-left" />Back to Albums
              </Link>
            </Col>
            <Col xs={6} className="photo-count-detail">
              Total Photos: {album.photo_count}
            </Col>
          </Row>
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
                      photos.map(photo => (
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

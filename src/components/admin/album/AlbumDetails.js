import React, { Component } from 'react';
import { Col, Button, Checkbox } from 'react-bootstrap';

// Import component
import ShareAlbum from './ShareAlbum';
import AlreadyShared from './AlreadyShared';

// Import services
import { showAlbum } from '../../../services/admin/Album';

// Import css
import '../../../assets/css/admin/album/album-details/album-details.css';

export default class AlbumDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDetailsBar: false,
      shareAlbum: false,
      alreadySharedAlbum: false,
      albumId: this.props.match.params.id,
      album: {}
    };
  }

  componentWillMount() {
    var self = this;

    showAlbum(self.state.albumId)
      .then(function(response) {
        self.handleAlbumSuccessResponse(response);
      })
      .catch(function(error) {
        console.log(error.response);
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

  closeShareAlbum = () => this.setState({ shareAlbum: false });
  closeAlreadySharedAlbum = () => this.setState({ alreadySharedAlbum: false });

  render() {
    const { album } = this.state;
    console.log(album);
    return (
      <Col xs={12} className="album-details-main-wrap">
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
              <Checkbox className="all-selection-check">
                {' '}Select All
                <div className="check">
                  <div className="inside" />
                </div>
              </Checkbox>

              <Button className="delete-selected btn-link">
                <img
                  src={require('../../../assets/images/admin/album/album-details/delete-icon.png')}
                  alt="delete"
                />{' '}
                Delete Selected
              </Button>
            </div>

            <Button className="add-photoes-btn btn btn-orange">
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
              <Col
                xs={6}
                sm={4}
                md={4}
                lg={3}
                className="album-image-wrap cover-pic"
              >
                <img
                  className="img-responsive album-image"
                  src={require('../../../assets/images/admin/album/album-details/album-thumb-1.png')}
                  alt=""
                />
                <Checkbox className="pic-selection-check">
                  <div className="check">
                    <div className="inside" />
                  </div>
                </Checkbox>
              </Col>
              <Col xs={6} sm={4} md={4} lg={3} className="album-image-wrap">
                <img
                  className="img-responsive album-image"
                  src={require('../../../assets/images/admin/album/album-details/album-thumb-2.png')}
                  alt=""
                />
                <Checkbox className="pic-selection-check">
                  <div className="check">
                    <div className="inside" />
                  </div>
                </Checkbox>
              </Col>
              <Col xs={6} sm={4} md={4} lg={3} className="album-image-wrap">
                <img
                  className="img-responsive album-image"
                  src={require('../../../assets/images/admin/album/album-details/album-thumb-3.png')}
                  alt=""
                />
                <Checkbox className="pic-selection-check">
                  <div className="check">
                    <div className="inside" />
                  </div>
                </Checkbox>
              </Col>
              <Col xs={6} sm={4} md={4} lg={3} className="album-image-wrap">
                <img
                  className="img-responsive album-image"
                  src={require('../../../assets/images/admin/album/album-details/album-thumb-4.png')}
                  alt=""
                />
                <Checkbox className="pic-selection-check">
                  <div className="check">
                    <div className="inside" />
                  </div>
                </Checkbox>
              </Col>
              <Col xs={6} sm={4} md={4} lg={3} className="album-image-wrap">
                <img
                  className="img-responsive album-image"
                  src={require('../../../assets/images/admin/album/album-details/album-thumb-5.png')}
                  alt=""
                />
                <Checkbox className="pic-selection-check">
                  <div className="check">
                    <div className="inside" />
                  </div>
                </Checkbox>
              </Col>
              <Col xs={6} sm={4} md={4} lg={3} className="album-image-wrap">
                <img
                  className="img-responsive album-image"
                  src={require('../../../assets/images/admin/album/album-details/album-thumb-6.png')}
                  alt=""
                />
                <Checkbox className="pic-selection-check">
                  <div className="check">
                    <div className="inside" />
                  </div>
                </Checkbox>
              </Col>
              <Col xs={6} sm={4} md={4} lg={3} className="album-image-wrap">
                <img
                  className="img-responsive album-image"
                  src={require('../../../assets/images/admin/album/album-details/album-thumb-7.png')}
                  alt=""
                />
                <Checkbox className="pic-selection-check">
                  <div className="check">
                    <div className="inside" />
                  </div>
                </Checkbox>
              </Col>
              <Col xs={6} sm={4} md={4} lg={3} className="album-image-wrap">
                <img
                  className="img-responsive album-image"
                  src={require('../../../assets/images/admin/album/album-details/album-thumb-8.png')}
                  alt=""
                />
                <Checkbox className="pic-selection-check">
                  <div className="check">
                    <div className="inside" />
                  </div>
                </Checkbox>
              </Col>
              <Col xs={6} sm={4} md={4} lg={3} className="album-image-wrap">
                <img
                  className="img-responsive album-image"
                  src={require('../../../assets/images/admin/album/album-details/album-thumb-1.png')}
                  alt=""
                />
                <Checkbox className="pic-selection-check">
                  <div className="check">
                    <div className="inside" />
                  </div>
                </Checkbox>
              </Col>
              <Col xs={6} sm={4} md={4} lg={3} className="album-image-wrap">
                <img
                  className="img-responsive album-image"
                  src={require('../../../assets/images/admin/album/album-details/album-thumb-2.png')}
                  alt=""
                />
                <Checkbox className="pic-selection-check">
                  <div className="check">
                    <div className="inside" />
                  </div>
                </Checkbox>
              </Col>
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
                <span className="information">Visible In portfolio</span>
              </label>
              <label className="album-info-label">
                <img
                  src={require('../../../assets/images/admin/album/album-details/public-icon.png')}
                  className="info-icon"
                  alt=""
                />
                <span className="information">marked as public</span>
              </label>
              <label className="album-info-label">
                <img
                  src={require('../../../assets/images/admin/album/album-details/calandar-icon.png')}
                  className="info-icon"
                  alt=""
                />
                <span className="information">1st may, 2015</span>
              </label>
              <label className="album-info-label">
                <img
                  src={require('../../../assets/images/admin/album/album-details/passcode-icon.png')}
                  className="info-icon"
                  alt=""
                />
                <span className="information">view passcode</span>
              </label>

              <Col xs={12} className="p-none detail-separator">
                <hr />
              </Col>

              <Col xs={12} className="p-none">
                <h4 className="album-delivery-details">
                  album delivery details
                </h4>
                <h4 className="album-delivery-status">New album</h4>
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
                    {' '}3{' '}
                  </button>
                </div>
              </Col>

              <Col xs={12} className="p-none detail-separator">
                <hr />
              </Col>

              <Col xs={12} className="p-none album-badges-wrap">
                <span className="album-badge">birthday</span>
                <span className="album-badge">kids</span>
                <span className="album-badge">fashion</span>
              </Col>
            </Col>
          </Col>
        </Col>
      </Col>
    );
  }
}

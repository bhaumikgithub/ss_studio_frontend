import React, { Component } from 'react';
import { Col, Button, Media, Pagination } from 'react-bootstrap';
// import CreateAlbum from './create-album';

// Import css
import '../../../assets/css/admin/album/albums.css';

export default class AlbumsListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activePage: 3,
      CreateShow: false
    };
  }

  CreateClose = () => this.setState({ CreateShow: false });

  handleSelect(eventKey, e) {
    this.setState({
      activePage: eventKey
    });
  }

  render() {
    return (
      <Col xs={12} className="albums-page-wrap">
        {/* <CreateAlbum
          showCreate={this.state.CreateShow}
          closeOn={this.CreateClose}
        /> */}
        <Col xs={12} className="filter-wrap p-none">
          <Col xs={12} className="p-none">
            <span className="total-album pull-left">
              Total : <span>30</span> albums
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
          <Col xs={12} className="albums-list-wrap p-none">
            <Col xs={12} className="album-wrap">
              <Media>
                <Media.Left align="top" className="album-img-wrap">
                  <img
                    className="album-thumb"
                    width={190}
                    height={190}
                    src={require('../../../assets/images/admin/album/album-thumb-1.png')}
                    alt="Joy Bday thumb"
                  />
                  <span className="lock-icon">
                    <i className="fa fa-lock" />
                  </span>
                </Media.Left>
                <Media.Body className="album-detail-wrap">
                  <Media.Heading className="album-title">
                    Joy birthday
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
                    <span className="album-badge">birthday</span>
                    <span className="album-badge">kids</span>
                    <span className="album-badge">fashion</span>
                  </Col>

                  <Col xs={12} className="p-none updated-info">
                    <span className="fa fa-clock-o updated-icon" /> Last updated
                    on 5th may,2017.
                  </Col>
                  <Col xs={12} className="p-none album-separator">
                    <hr />
                  </Col>
                </Media.Body>
              </Media>
              <Col xs={12} className="p-none count-main-wrap">
                <Col xs={12} className="p-none">
                  <Col lg={3} sm={6} xs={12} className="count-wrap photo-wrap">
                    <span className="count-detail">Total photos</span>
                    <span className="count-detail count-num">750</span>
                  </Col>
                  <Col
                    lg={3}
                    sm={6}
                    xs={12}
                    className="count-wrap view-count-wrap"
                  >
                    <span className="count-detail">View count</span>
                    <span className="count-detail count-num">15</span>
                  </Col>
                  <Col lg={2} sm={6} xs={12} className="count-wrap status-wrap">
                    <span className="count-detail">status</span>
                    <span className="count-detail count-num text-yellow">
                      Shared
                    </span>
                  </Col>
                  <Col
                    lg={4}
                    sm={6}
                    xs={12}
                    className="count-wrap visible-wrap"
                  >
                    <span className="count-detail">visible in portfolio ?</span>
                    <span className="count-detail count-num">
                      <span className="fa fa-eye visible-icon text-green" /> Yes
                    </span>
                  </Col>
                </Col>
                <Button className="btn-link p-none album-action-btn album-delete-btn">
                  <img
                    src={require('../../../assets/images/admin/album/delete-icon.png')}
                    alt=""
                  />
                </Button>
              </Col>
            </Col>
          </Col>
          <Col xs={12} className="albums-list-wrap p-none">
            <Col xs={12} className="album-wrap">
              <Media>
                <Media.Left align="top" className="album-img-wrap">
                  <img
                    className="album-thumb"
                    width={190}
                    height={190}
                    src={require('../../../assets/images/admin/album/album-thumb-2.png')}
                    alt="Joy Bday thumb"
                  />
                </Media.Left>
                <Media.Body className="album-detail-wrap">
                  <Media.Heading className="album-title">
                    lokesh and surbhi prewedding
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
                    <span className="album-badge">prewedding</span>
                    <span className="album-badge">fashion</span>
                  </Col>
                  <Col xs={12} className="p-none updated-info">
                    <span className="fa fa-clock-o updated-icon" /> Last updated
                    3 hours ago.
                  </Col>

                  <Col xs={12} className="p-none album-separator">
                    <hr />
                  </Col>
                </Media.Body>
                <Col xs={12} className="p-none count-main-wrap">
                  <Col xs={12} className="p-none">
                    <Col
                      lg={3}
                      sm={6}
                      xs={12}
                      className="count-wrap photo-wrap"
                    >
                      <span className="count-detail">Total photos</span>
                      <span className="count-detail count-num">1200</span>
                    </Col>
                    <Col
                      lg={3}
                      sm={6}
                      xs={12}
                      className="count-wrap view-count-wrap"
                    >
                      <span className="count-detail">View count</span>
                      <span className="count-detail count-num">50</span>
                    </Col>
                    <Col
                      lg={2}
                      sm={6}
                      xs={12}
                      className="count-wrap status-wrap"
                    >
                      <span className="count-detail">status</span>
                      <span className="count-detail count-num text-red">
                        New
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
                        <span className="fa fa-eye-slash visible-icon text-red" />{' '}
                        No
                      </span>
                    </Col>
                  </Col>

                  <Button className="btn-link p-none album-action-btn album-delete-btn">
                    <img
                      src={require('../../../assets/images/admin/album/delete-icon.png')}
                      alt=""
                    />
                  </Button>
                </Col>
              </Media>
            </Col>
          </Col>
          <Col xs={12} className="albums-list-wrap p-none">
            <Col xs={12} className="album-wrap">
              <Media>
                <Media.Left align="top" className="album-img-wrap">
                  <img
                    className="album-thumb"
                    width={190}
                    height={190}
                    src={require('../../../assets/images/admin/album/album-thumb-3.png')}
                    alt="Joy Bday thumb"
                  />
                </Media.Left>
                <Media.Body className="album-detail-wrap">
                  <Media.Heading className="album-title">
                    Bhavik and krisha wedding
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
                    <span className="album-badge">wedding</span>
                    <span className="album-badge">fashion</span>
                  </Col>
                  <Col xs={12} className="p-none updated-info">
                    <span className="fa fa-clock-o updated-icon" /> Last updated
                    on 5th may,2017.
                  </Col>
                  <Col xs={12} className="p-none album-separator">
                    <hr />
                  </Col>
                </Media.Body>
                <Col xs={12} className="p-none count-main-wrap">
                  <Col xs={12} className="p-none">
                    <Col
                      lg={3}
                      sm={6}
                      xs={12}
                      className="count-wrap photo-wrap"
                    >
                      <span className="count-detail">Total photos</span>
                      <span className="count-detail count-num">750</span>
                    </Col>
                    <Col
                      lg={3}
                      sm={6}
                      xs={12}
                      className="count-wrap view-count-wrap"
                    >
                      <span className="count-detail">View count</span>
                      <span className="count-detail count-num">15</span>
                    </Col>
                    <Col
                      lg={2}
                      sm={6}
                      xs={12}
                      className="count-wrap status-wrap"
                    >
                      <span className="count-detail">status</span>
                      <span className="count-detail count-num text-green">
                        Delivered
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
                        <span className="fa fa-eye visible-icon text-green" />{' '}
                        yes
                      </span>
                    </Col>
                  </Col>
                  <Button className="btn-link p-none album-action-btn album-delete-btn">
                    <img
                      src={require('../../../assets/images/admin/album/delete-icon.png')}
                      alt=""
                    />
                  </Button>
                </Col>
              </Media>
            </Col>
          </Col>
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

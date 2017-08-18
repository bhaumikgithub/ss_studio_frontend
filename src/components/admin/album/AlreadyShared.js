import React, { Component } from 'react';
import { Col, Modal } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';

// Import css
import '../../../assets/css/admin/album/already-shared/already-shared.css';

export default class AlreadyShared extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }
  updateState(element) {
    this.setState({ value: element });
  }

  render() {
    return (
      <Modal
        show={this.props.alreadySharedAlbum}
        className="shared-album-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="shared-album-body p-none">
          <span className="close-modal-icon" onClick={this.props.closeOn}>
            <img
              src={require('../../../assets/images/admin/album/already-shared/close-icon.png')}
              alt=""
              className="hidden-xs"
            />
            <img
              src={require('../../../assets/images/admin/album/already-shared/close-icon-white.png')}
              alt=""
              className="visible-xs"
            />
          </span>
          <Col className="shared-title-wrap p-none" sm={5}>
            <Col xs={12} className="p-none shared-album-title-details">
              <img
                src={require('../../../assets/images/admin/album/already-shared/already-shared-icon.png')}
                alt=""
                className="shared-album-icon img-responsive"
              />
              <h4 className="shared-album-text text-white">
                Already Shared With
              </h4>
            </Col>
          </Col>
          <Col className="shared-content-wrap" sm={7}>
            <Scrollbars style={{ height: '220px' }}>
              <div className="shared-contact-list">
                <div className="shared-contact-block">
                  <div className="img-wrap">
                    <img
                      src={require('../../../assets/images/admin/album/already-shared/user-thumb.png')}
                      alt=""
                    />
                  </div>
                  <div className="content-wrap">
                    <div className="title-wrap">
                      <h5 className="shared-user">Hemali G.</h5>
                      <span className="shared-mail">
                        hemaligadani@gmail.com
                      </span>
                    </div>
                    <div className="icon-block">
                      <div className="icon-wrap resend">
                        <img
                          src={require('../../../assets/images/admin/album/already-shared/send-again-icon.png')}
                          alt=""
                        />
                        Resend
                      </div>
                      <div className="icon-wrap delete">
                        <img
                          src={require('../../../assets/images/admin/album/already-shared/delete-access-icon.png')}
                          alt=""
                        />
                        Delete Access
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shared-contact-block">
                  <div className="img-wrap">
                    <img
                      src={require('../../../assets/images/admin/album/already-shared/user-thumb.png')}
                      alt=""
                    />
                  </div>
                  <div className="content-wrap">
                    <div className="title-wrap">
                      <h5 className="shared-user">Bhaumik G.</h5>
                      <span className="shared-mail">
                        bhaumikgadani@gmail.com
                      </span>
                    </div>
                    <div className="icon-block">
                      <div className="icon-wrap resend">
                        <img
                          src={require('../../../assets/images/admin/album/already-shared/send-again-icon.png')}
                          alt=""
                        />
                        Resend
                      </div>
                      <div className="icon-wrap delete">
                        <img
                          src={require('../../../assets/images/admin/album/already-shared/delete-access-icon.png')}
                          alt=""
                        />
                        Delete Access
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shared-contact-block">
                  <div className="img-wrap">
                    <img
                      src={require('../../../assets/images/admin/album/already-shared/user-thumb.png')}
                      alt=""
                    />
                  </div>
                  <div className="content-wrap">
                    <div className="title-wrap">
                      <h5 className="shared-user">Paresh G.</h5>
                      <span className="shared-mail">
                        pareshgandhi@gmail.com
                      </span>
                    </div>
                    <div className="icon-block">
                      <div className="icon-wrap resend">
                        <img
                          src={require('../../../assets/images/admin/album/already-shared/send-again-icon.png')}
                          alt=""
                        />
                        Resend
                      </div>
                      <div className="icon-wrap delete">
                        <img
                          src={require('../../../assets/images/admin/album/already-shared/delete-access-icon.png')}
                          alt=""
                        />
                        Delete Access
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shared-contact-block">
                  <div className="img-wrap">
                    <img
                      src={require('../../../assets/images/admin/album/already-shared/user-thumb.png')}
                      alt=""
                    />
                  </div>
                  <div className="content-wrap">
                    <div className="title-wrap">
                      <h5 className="shared-user">Hemali G.</h5>
                      <span className="shared-mail">
                        hemaligadani@gmail.com
                      </span>
                    </div>
                    <div className="icon-block">
                      <div className="icon-wrap resend">
                        <img
                          src={require('../../../assets/images/admin/album/already-shared/send-again-icon.png')}
                          alt=""
                        />
                        Resend
                      </div>
                      <div className="icon-wrap delete">
                        <img
                          src={require('../../../assets/images/admin/album/already-shared/delete-access-icon.png')}
                          alt=""
                        />
                        Delete Access
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Scrollbars>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

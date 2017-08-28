import React, { Component } from 'react';
import { Col, Modal } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import SweetAlert from 'sweetalert-react';

// Import services
import {
  getAlbumRecipients,
  deleteAlbumRecipient,
  resendAlbumToRecipient
} from '../../../services/admin/AlbumRecipient';

// Import css
import '../../../assets/css/admin/album/already-shared/already-shared.css';

export default class AlreadyShared extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumId: props.albumId,
      recipients: [],
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
    getAlbumRecipients(self.state.albumId)
      .then(function(response) {
        self.setState({ recipients: response.data.data.album_recipients });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  deleteRecipient(id) {
    var self = this;

    deleteAlbumRecipient(self.state.albumId, id)
      .then(function(response) {
        self.handleDeleteSuccessResponse(response, id);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  resendAlbum(event, id) {
    var self = this;
    event.preventDefault();

    resendAlbumToRecipient(self.state.albumId, id)
      .then(function(response) {
        self.handleResendSuccessResponse(response);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  handleDeleteSuccessResponse(response, id) {
    if (response.status === 200) {
      const recipients = this.state.recipients.filter(
        recipient => recipient.id !== id
      );
      this.setState({
        recipients: recipients,
        alert: {
          show: true,
          title: 'Success',
          text: response.data.message,
          type: 'success',
          confirmAction: () => this.hideDialogueBox()
        }
      });
      this.props.renderRecipientsCount('delete');
    }
  }

  handleResendSuccessResponse(response) {
    if (response.status === 201) {
      this.setState({
        alert: {
          show: true,
          title: 'Success',
          text: response.data.message,
          type: 'success',
          confirmAction: () => this.hideDialogueBox()
        }
      });
    }
  }

  showDeleteDialogueBox(event, id) {
    event.preventDefault();
    this.setState({
      alert: {
        show: true,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        btnText: 'Yes, delete it!',
        type: 'warning',
        confirmAction: () => this.deleteRecipient(id),
        cancelBtn: true
      }
    });
  }

  hideDialogueBox() {
    this.setState({ alert: { show: false } });
  }

  render() {
    const { recipients, alert } = this.state;
    return (
      <Modal
        show={this.props.alreadySharedAlbum}
        className="shared-album-modal"
        aria-labelledby="contained-modal-title-lg"
      >
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
                {recipients.length === 0 && <h4>No recipients available</h4>}
                {recipients.map((recipient, index) =>
                  <div className="shared-contact-block" key={recipient.id}>
                    <div className="img-wrap">
                      <img
                        src={require('../../../assets/images/admin/album/already-shared/user-thumb.png')}
                        alt=""
                      />
                    </div>
                    <div className="content-wrap">
                      <div className="title-wrap">
                        <h5 className="shared-user">
                          {recipient.contact.full_name}
                        </h5>
                        <span className="shared-mail">
                          {recipient.contact.email}
                        </span>
                      </div>
                      <div className="icon-block">
                        <div className="icon-wrap resend">
                          <a
                            href=""
                            className="text-green"
                            onClick={event =>
                              this.resendAlbum(event, recipient.id)}
                          >
                            <img
                              src={require('../../../assets/images/admin/album/already-shared/send-again-icon.png')}
                              alt=""
                            />
                            Resend
                          </a>
                        </div>
                        <div className="icon-wrap delete">
                          <a
                            href=""
                            className="text-red"
                            onClick={event =>
                              this.showDeleteDialogueBox(event, recipient.id)}
                          >
                            <img
                              src={require('../../../assets/images/admin/album/already-shared/delete-access-icon.png')}
                              alt=""
                            />
                            Delete Access
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Scrollbars>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

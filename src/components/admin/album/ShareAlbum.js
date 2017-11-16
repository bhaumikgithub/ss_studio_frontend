import React, { Component } from 'react';
import {
  Col,
  Button,
  Modal,
  FormGroup,
  FormControl,
  Checkbox
} from 'react-bootstrap';
import { Creatable } from 'react-select';

// Import services
import { AlbumRecipientService } from '../../../services/Index';

// Import css
import '../../../assets/css/admin/album/share-album/share-album.css';
import 'react-select/dist/react-select.min.css';

// Import helper
import { isObjectEmpty } from '../../Helper';

export default class ShareAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      shareAlbumForm: {
        custom_message: '',
        emails: [],
        contact_options: [],
        minimum_photo_selection: 1,
        allow_comments: false
      },
      emails_error: '',
      contacts: [],
      albumId: this.props.albumId,
      albumRecipientObject: this.props.selectionAlbumObject
    };

    return initialState;
  }

  resetShareAlbumForm() {
    this.setState({ shareAlbumForm: this.getInitialState().shareAlbumForm });
  }

  componentWillMount() {
    var self = this;
    const { albumRecipientObject, albumId } = self.state;
    if (
      !isObjectEmpty(albumRecipientObject) &&
      albumRecipientObject.length > 0 &&
      self.props.albumSelection
    ) {
      self.editSharedAlbum(albumRecipientObject);
    }
    AlbumRecipientService.getNotInvitedContact(albumId)
      .then(function(response) {
        var data = response.data;
        self.setState({ contacts: data.data.contacts });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  editSharedAlbum(albumRecipients) {
    var self = this;
    const {
      custom_message,
      minimum_photo_selection,
      allow_comments,
      // contacts,
      emails
    } = albumRecipients[0];

    self.setState({
      shareAlbumForm: {
        custom_message: custom_message || '',
        minimum_photo_selection: minimum_photo_selection || '',
        allow_comments: allow_comments || '',
        contact_options: self.contactOptions(albumRecipients),
        email: emails || ''
      }
    });
  }
  contactOptions(albumRecipients = this.state.contacts) {
    var options = [];

    albumRecipients.map(albumRecipient => {
      return options.push({
        value: albumRecipient.contact
          ? albumRecipient.contact.email
          : albumRecipient.email,
        label: albumRecipient.contact
          ? albumRecipient.contact.email
          : albumRecipient.email
      });
    });
    return options;
  }

  handleChange(e) {
    const shareAlbumForm = this.state.shareAlbumForm;
    var key = e.target.name;
    if (key === 'allow_comments') {
      shareAlbumForm[key] = e.target.checked;
    } else {
      shareAlbumForm[key] = e.target.value;
    }
    this.setState({
      shareAlbumForm
    });
  }

  handleMultiSelectChange(value) {
    const shareAlbumForm = this.state.shareAlbumForm;
    shareAlbumForm['contact_options'] = value;
    shareAlbumForm['emails'] = [];
    value.map(value => shareAlbumForm['emails'].push(value.value));
    this.setState({
      shareAlbumForm
    });
  }

  handleSubmit(e) {
    var self = this;
    var { shareAlbumForm } = self.state;
    var recipientTypeData = { recipient_type: 1 };
    var AlbumRecipients = self.props.selectionAlbumObject;
    var ids = [];

    if (
      shareAlbumForm.contact_options.length > 0 &&
      shareAlbumForm.emails === undefined
    ) {
      this.handleMultiSelectChange(shareAlbumForm.contact_options);
    }
    if (shareAlbumForm.contact_options.length < 1) {
      return self.setState({ emails_error: "Emails can't be blank." });
    }
    if (AlbumRecipients.length > 0) {
      AlbumRecipients.map(albumRecipient => {
        ids.push(albumRecipient.id);
        return ids;
      });
    }
    var albumRecipientIds = { ids: ids };
    if (self.props.albumSelection) {
      var obj = Object.assign(
        {},
        shareAlbumForm,
        recipientTypeData,
        albumRecipientIds
      );
      shareAlbumForm = obj;
    }
    var createParams = {
      album_id: self.props.shareAlbumObject.id,
      album_recipient: shareAlbumForm
    };
    AlbumRecipientService.createAlbumRecipient(createParams)
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  handelResponse(response) {
    var responseData = response.data;
    if (response.status === 201) {
      this.resetShareAlbumForm();
      this.props.renderShareAlbum(
        this.props.shareAlbumAction === 'albumsListing'
          ? this.props.shareAlbumObject
          : responseData.data.album_recipients.length,
        responseData.data.album_recipients[0].admin_album_recipients,
        this.props.albumSelection ? responseData.data.album_recipients : ''
      );
      this.props.closeShareAlbum();
    } else {
      console.log(responseData.errors);
    }
  }

  render() {
    const { shareAlbumForm, emails_error } = this.state;
    const album = this.props.shareAlbumObject;
    return (
      <Modal
        show={this.props.shareAlbum || this.props.albumSelection}
        className="share-album-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="share-album-body p-none">
          <span
            className="close-modal-icon"
            onClick={this.props.closeShareAlbum}
          >
            <img
              src={require('../../../assets/images/admin/album/share-album/close-icon.png')}
              alt=""
              className="hidden-xs"
            />
            <img
              src={require('../../../assets/images/admin/album/share-album/close-icon-white.png')}
              alt=""
              className="visible-xs"
            />
          </span>
          <Col className="share-title-wrap p-none" sm={5}>
            <Col xs={12} className="p-none share-album-title-details">
              <img
                src={require('../../../assets/images/admin/album/share-album/share-album-icon.png')}
                alt=""
                className="share-album-icon img-responsive"
              />
              <h4 className="create-album-text text-white">Share Album</h4>
            </Col>
          </Col>
          <Col className="modal-share-content-wrap" sm={7}>
            <div className="header-wrap">
              <div className="thumb-wrap">
                <img
                  src={album.cover_photo.image}
                  className="link-icons img-responsive"
                  alt={album.cover_photo.image_file_name}
                />
              </div>
              <div className="text-wrap">
                <h3 className="title">{album.album_name}</h3>
                <p>{album.photo_count} photos</p>
              </div>
            </div>
            {this.props.albumSelection &&
              !isObjectEmpty(this.state.albumRecipientObject) && (
                <div>
                  {this.props.selectionAlbumObject.map(albumRecipient => (
                    <span key={albumRecipient.id} className="view-album-url">
                      Url for {albumRecipient.contact.email} : <br />
                      {albumRecipient.view_album_url}
                      <hr />
                    </span>
                  ))}
                  {album.is_private && (
                    <span className="view-album-url">
                      Password: {album.passcode} <hr />
                    </span>
                  )}
                </div>
              )}
            <form className="admin-side share-album-form custom-form">
              <FormGroup className="custom-form-group">
                <Creatable
                  className="custom-form-control"
                  placeholder="Enter a name or email address"
                  name="contact_options"
                  value={shareAlbumForm.contact_options}
                  options={this.contactOptions()}
                  multi={true}
                  onChange={this.handleMultiSelectChange.bind(this)}
                />
                {emails_error && (
                  <span className="input-error text-red">{emails_error}</span>
                )}
              </FormGroup>
              <FormGroup className="custom-form-group">
                <FormControl
                  className="custom-form-control"
                  componentClass="textarea"
                  type="text"
                  placeholder="Type a message (Optional)"
                  name="custom_message"
                  value={shareAlbumForm.custom_message}
                  onChange={this.handleChange.bind(this)}
                />
              </FormGroup>
              {this.props.albumSelection && (
                <Col>
                  <FormGroup className="custom-form-group">
                    <FormControl
                      className="custom-form-control"
                      value={shareAlbumForm.minimum_photo_selection}
                      type="number"
                      name="minimum_photo_selection"
                      min="1"
                      max={album.photo_count}
                      onChange={this.handleChange.bind(this)}
                    />
                  </FormGroup>
                  <FormGroup className="custom-form-group">
                    <Checkbox
                      className=""
                      name="allow_comments"
                      value={shareAlbumForm.allow_comments}
                      onClick={this.handleChange.bind(this)}
                      defaultChecked={shareAlbumForm.allow_comments}
                    >
                      {' '}
                      Allow Comments
                      <div className="check">
                        <div className="inside" />
                      </div>
                    </Checkbox>
                  </FormGroup>
                </Col>
              )}
              <Button
                className="btn btn-orange share-submit"
                onClick={event => this.handleSubmit(event)}
              >
                Save
              </Button>
            </form>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

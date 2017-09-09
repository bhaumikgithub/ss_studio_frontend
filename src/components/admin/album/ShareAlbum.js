import React, { Component } from 'react';
import { Col, Button, Modal, FormGroup, FormControl } from 'react-bootstrap';
import { Creatable } from 'react-select';

// Import services
import {
  createAlbumRecipient,
  getNotInvitedContact
} from '../../../services/admin/AlbumRecipient';

// Import css
import '../../../assets/css/admin/album/share-album/share-album.css';
import 'react-select/dist/react-select.min.css';

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
        contact_options: []
      },
      emails_error: '',
      contacts: [],
      albumId: this.props.albumId
    };

    return initialState;
  }

  resetShareAlbumForm() {
    this.setState({ shareAlbumForm: this.getInitialState().shareAlbumForm });
  }

  componentWillMount() {
    var self = this;
    getNotInvitedContact(self.state.albumId)
      .then(function(response) {
        var data = response.data;
        self.setState({ contacts: data.data.contacts });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  contactOptions() {
    var options = [];
    this.state.contacts.map(contact => {
      return options.push({
        value: contact.email,
        label: contact.email
      });
    });
    return options;
  }

  handleChange(e) {
    const shareAlbumForm = this.state.shareAlbumForm;
    var key = e.target.name;
    shareAlbumForm[key] = e.target.value;
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
    const shareAlbumForm = self.state.shareAlbumForm;
    var createParams = {
      album_id: self.props.shareAlbumObject.id,
      album_recipient: shareAlbumForm
    };

    if (shareAlbumForm.emails.length < 1) {
      return self.setState({ emails_error: "Emails can't be blank." });
    }

    createAlbumRecipient(createParams)
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
          : responseData.data.album_recipients.length
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
        show={this.props.shareAlbum}
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

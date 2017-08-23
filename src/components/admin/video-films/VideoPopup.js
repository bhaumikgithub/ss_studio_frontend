import React, { Component } from 'react';
import {
  Col,
  Button,
  Modal,
  Row,
  HelpBlock,
  Checkbox,
  Radio,
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap';

// Import css
import '../../../assets/css/admin/video-films/add-video/add-video.css';

export default class AddVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      urlChecked: false,
      urlSelected: '',
      statusSelected: ''
    };
    this.changeHandle = this.changeHandle.bind(this);
    this.statusChange = this.statusChange.bind(this);
  }
  updateState(element) {
    this.setState({ value: element });
  }
  changeHandle(event) {
    this.setState({ urlChecked: true, urlSelected: event.target.value });
  }
  statusChange(event) {
    this.setState({ statusSelected: event.target.value });
  }

  render() {
    return (
      <Modal
        show={this.props.showCreate}
        className="add-videofilms-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="add-videofilms-body p-none">
          <span className="close-modal-icon" onClick={this.props.closeOn}>
            <img
              src={require('../../images/admin-share-album/close-icon.png')}
              alt=""
              className="hidden-xs"
            />
            <img
              src={require('../../images/admin-share-album/close-icon-white.png')}
              alt=""
              className="visible-xs"
            />
          </span>
          <Col className="add-videofilms-title-wrap p-none" sm={5}>
            <Col xs={12} className="p-none add-videofilms-title-details">
              <img
                src={require('../../../assets/images/admin/video-films/add-video-icon.png')}
                alt=""
                className="add-videofilms-icon img-responsive"
              />
              <h4 className="add-videofilms-text text-white">Add New Video</h4>
            </Col>
          </Col>
          <Col className="add-videofilms-content-wrap" sm={7}>
            <form className="add-videofilms-form custom-form">
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Video Title
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  placeholder="Baby Shoot"
                />
              </FormGroup>

              <FormGroup className="custom-form-group radio-wrapper">
                <ControlLabel className="custom-form-control-label">
                  Video Type
                </ControlLabel>
                <br />
                <span className="custom-radio-wrap videotype-radio-wrap">
                  <Radio
                    name="videotypeRadio"
                    inline
                    value="youtube"
                    checked={this.state.urlSelected === 'youtube'}
                    onChange={this.changeHandle}
                  >
                    YouTube
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Radio>
                </span>{' '}
                <span className="custom-radio-wrap videotype-radio-wrap">
                  <Radio
                    name="videotypeRadio"
                    inline
                    value="vimeo"
                    checked={this.state.urlSelected === 'vimeo'}
                    onChange={this.changeHandle}
                  >
                    Vimeo
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Radio>
                </span>
                <span className="custom-radio-wrap videotype-radio-wrap">
                  <Radio
                    name="videotypeRadio"
                    inline
                    value="other"
                    checked={this.state.urlSelected === 'other'}
                    onChange={this.changeHandle}
                  >
                    other
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Radio>
                </span>
              </FormGroup>
              {this.state.urlChecked
                ? <FormGroup className="custom-form-group required hide-show-group">
                    <FormControl
                      className="custom-form-control"
                      type="text"
                      placeholder={'Enter ' + this.state.urlSelected + ' Url'}
                    />
                  </FormGroup>
                : ''}

              <FormGroup className="custom-form-group radio-wrapper">
                <ControlLabel className="custom-form-control-label">
                  Status
                </ControlLabel>
                <br />
                <span className="custom-radio-wrap">
                  <Radio
                    name="statusRadio"
                    inline
                    value="publish"
                    checked={this.state.statusSelected === 'publish'}
                    onChange={this.statusChange}
                  >
                    publish
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Radio>
                </span>{' '}
                <span className="custom-radio-wrap">
                  <Radio
                    name="statusRadio"
                    inline
                    value="unpublish"
                    checked={this.state.statusSelected === 'unpublish'}
                    onChange={this.statusChange}
                  >
                    unpublish
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Radio>
                </span>
              </FormGroup>

              <Button
                type="submit"
                className="btn btn-orange create-album-submit"
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={this.props.closeOn}
                className="btn btn-grey create-album-cancel"
              >
                Cancel
              </Button>
            </form>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

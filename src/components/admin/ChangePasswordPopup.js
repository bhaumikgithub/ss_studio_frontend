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
import createTitle from '../../assets/images/admin/album/create-album/add-album-icon.png';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';

import '../../assets/css/admin/album/create-album/create-album.css';

export default class ChangePasswordPopup extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }
  updateState(element) {
    this.setState({ value: element });
  }

  render() {
    var Select = require('react-select'); //only for server-side
    var options = [
      { value: 'kids', label: 'Kids' },
      { value: 'wedding', label: 'Wedding' },
      { value: 'prevedding', label: 'Pre-Wedding' },
      { value: 'fashion', label: 'Fashion' },
      { value: 'art', label: 'Art' }
    ];
    return (
      <Modal
        show={this.props.showChangePasswordPopup}
        bsSize="large"
        className="create-new-album-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="create-album-body p-none">
          <span
            className="close-modal-icon"
            onClick={this.props.hideChangePasswordPopup}
          >
            <img
              src={require('../../assets/images/admin/album/create-album/close-icon.png')}
              alt=""
              className="hidden-xs"
            />
            <img
              src={require('../../assets/images/admin/album/create-album/close-icon.png')}
              alt=""
              className="visible-xs"
            />
          </span>
          <Col className="create-title-wrap p-none" sm={4}>
            <Col xs={12} className="p-none create-album-title-details">
              <img
                src={createTitle}
                alt=""
                className="create-album-icon img-responsive"
              />
              <h4 className="create-album-text text-white">Change Password</h4>
            </Col>
          </Col>
          <Col className="create-content-wrap" sm={8}>
            <form className="create-album-form custom-form">
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Current Password
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="password"
                  placeholder="Current Password"
                />
              </FormGroup>

              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  New Password
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="password"
                  placeholder="New Password"
                />
              </FormGroup>

              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Confirm Password
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="password"
                  placeholder="Confirm Password"
                />
              </FormGroup>

              <Button
                type="submit"
                className="btn btn-orange create-album-submit"
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={this.props.hideChangePasswordPopup}
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

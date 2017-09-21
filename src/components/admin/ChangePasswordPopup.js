import React, { Component } from 'react';
import {
  Col,
  Button,
  Modal,
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import createTitle from '../../assets/images/admin/album/create-album/add-album-icon.png';
import 'react-select/dist/react-select.min.css';

// Import components
import validationHandler from '../common/ValidationHandler';

// Import services
import { UserService } from '../../services/Index';

// Import css
import '../../assets/css/admin/album/create-album/create-album.css';

export default class ChangePasswordPopup extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState() {
    const initialState = {
      changePasswordForm: {
        current_password: '',
        password: '',
        password_confirmation: ''
      },
      errors: {}
    };
    return initialState;
  }

  resetchangePasswordForm() {
    this.setState({
      changePasswordForm: this.getInitialState().changePasswordForm
    });
  }

  handleChange(e) {
    const changePasswordForm = this.state.changePasswordForm;
    var key = e.target.name;
    changePasswordForm[key] = e.target.value;
    this.setState({
      changePasswordForm
    });
  }

  updateState(element) {
    this.setState({ value: element });
  }

  handleSubmit(e) {
    var self = this;
    var callChangePasswordApi = () => {};
    var changePasswordParams = {
      changePasswordForm: { user: self.state.changePasswordForm }
    };
    callChangePasswordApi = UserService.changePassword(changePasswordParams);

    callChangePasswordApi
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        const errors = error.response.data.errors;
        if (errors.length > 0) {
          self.setState({ errors: validationHandler(errors) });
        } else {
          console.log(error.response);
        }
      });
  }

  handelResponse(response) {
    var responseData = response.data;
    if (response.status === 201) {
      this.resetchangePasswordForm();
      this.props.hideChangePasswordPopup();
    } else {
      console.log(responseData.errors);
    }
  }

  render() {
    const { changePasswordForm, errors } = this.state;
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
            <form className="admin-side create-album-form custom-form">
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Current Password
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="password"
                  placeholder="Current Password"
                  name="current_password"
                  value={changePasswordForm.current_password}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['current_password'] && (
                  <span className="input-error text-red">
                    {errors['current_password']}
                  </span>
                )}
              </FormGroup>

              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  New Password
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="password"
                  placeholder="New Password"
                  name="password"
                  value={changePasswordForm.password}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['password'] && (
                  <span className="input-error text-red">
                    {errors['password']}
                  </span>
                )}
              </FormGroup>

              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Confirm Password
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="password"
                  placeholder="Confirm Password"
                  name="password_confirmation"
                  value={changePasswordForm.password_confirmation}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['password_confirmation'] && (
                  <span className="input-error text-red">
                    {errors['password_confirmation']}
                  </span>
                )}
              </FormGroup>

              <Button
                className="btn btn-orange create-album-submit"
                onClick={event => this.handleSubmit(event)}
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

import React, { Component } from 'react';
import {
    Col,
    Button,
    Modal,
    ControlLabel,
    FormGroup,
    FormControl
  } from 'react-bootstrap';
import Select from 'react-select';
import editTitle from '../../../assets/images/admin/contact/admin-add-contact/edit-contact-icon.png';

// Import components
import validationHandler from '../../common/ValidationHandler';
// Import css
import 'react-select/dist/react-select.min.css';
import '../../../assets/css/admin/video-films/add-video/add-video.css';

// Import services
import { UserService } from '../../../services/Index';

// Import helper
import { toCapitalize } from '../../Helper';

export default class UserPopup extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      userForm: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: {},
        alias: '',
        country_id: '',
        country_option: '',
        created_by: 'super_admin',
        package_option: '',
        user_type_option: '',
        user_type_id: '',
        user_type: ''
      },
      packages: [],
      countries: [],
      errors: {}
    };

    return initialState;
  }

  resetuserForm() {
    this.setState({ userForm: this.getInitialState().userForm });
  }

  componentWillMount() {
    var self = this;
    self.getCountries();
    self.getPackages();
  }

  getCountries(){
    var self = this;
    UserService.getCountries()
      .then(function(response) {
        var data = response.data;
        self.setState({ countries: data.data.countries });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  getPackages(){
    var self = this;
    UserService.getPackages()
      .then(function(response) {
        var data = response.data;
        self.setState({ packages: data.data.packages });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }
  
  countryOptions(countries = this.state.countries) {
    var options = [];
    countries.map(country => {
      return options.push({
        value: country.id,
        label: toCapitalize(country.name)
      });
    });
    return options;
  }

  userTypeOptions(user_type = []) {
    var options = [];
    var user_type_options = [];
    if(user_type.length === 0){
      user_type_options = [{id: 0,value: 'Regular User'},{id: 1, value: 'Premium User'},{id: 2, value: 'Test User'}];
    }
    else{
      user_type_options = user_type
    }
    user_type_options.map(status => {
      return options.push({
        value: status.id,
        label: toCapitalize(status.value)
      });
    });
    return options;
  }

  packageOptions(packages = this.state.packages) {
    var options = [];
    packages.map(subscription_package => {
      return options.push({
        value: subscription_package.id,
        label: toCapitalize(subscription_package.name)
      });
    });
    return options;
  }

  handleCountrySelectChange(value) {
    const userForm = this.state.userForm;
    userForm['country_option'] = value;
    userForm['country_id'] = value.value;
    this.setState({
      userForm
    });
  }

  handleUserTypeSelectChange(value) {
    const userForm = this.state.userForm;
    if (value !== null) {
      userForm['user_type'] = value.value
      userForm['user_type_option'] = value;
      userForm['user_type_id'] = value.value;
    }
    this.setState({
      userForm
    });
  }

  handlePackageSelectChange(value) {
    const userForm = this.state.userForm;
    if (value !== null) {
      userForm['package_option'] = value;
      userForm['package_id'] = value.value;
    }
    this.setState({
      userForm
    });
  }

  handleChange(e) {
    const userForm = this.state.userForm;
    var key = e.target.name;
    userForm[key] = e.target.value;
    this.setState({
      userForm
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    UserService.createUser({user: self.state.userForm})
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
    if (response.status === 200) {
      this.props.renderUser(
        responseData.data.users,
        'insert'
      );
      this.props.closeOn();
    } else {
      console.log(responseData.errors);
    }
  }
  render() {
    const { userForm, errors } = this.state;
    return (
      <Modal
        show={this.props.createPopup}
        className="add-videofilms-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="add-videofilms-body p-none">
          <span className="close-modal-icon" onClick={this.props.closeOn}>
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
          <Col className="add-videofilms-title-wrap p-none" sm={5}>
            <Col xs={12} className="p-none add-videofilms-title-details">
              <img
                src={editTitle}
                alt=""
                className="add-videofilms-icon img-responsive"
              />
              <h4 className="add-videofilms-text text-white">Add User</h4>
            </Col>
          </Col>
          <Col className="add-videofilms-content-wrap" sm={7}>
            <form className="admin-side add-videofilms-form custom-form">
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  First Name
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={this.handleChange.bind(this)}
                />
                {errors['first_name'] && (
                  <span className="input-error text-red">
                    {errors['first_name']}
                  </span>
                )}
              </FormGroup>
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Last Name
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={this.handleChange.bind(this)}
                />
                {errors['last_name'] && (
                  <span className="input-error text-red">
                    {errors['last_name']}
                  </span>
                )}
              </FormGroup>
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Email
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  onChange={this.handleChange.bind(this)}
                />
                {errors['email'] && (
                  <span className="input-error text-red">
                    {errors['email']}
                  </span>
                )}
              </FormGroup>
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Password
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="password"
                  name="password"
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
                Password Confirmation
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="password"
                  name="password_confirmation"
                  onChange={this.handleChange.bind(this)}
                />
                {errors['password_confirmation'] && (
                  <span className="input-error text-red">
                    {errors['password_confirmation']}
                  </span>
                )}
              </FormGroup>
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Phone
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="number"
                  name="phone"
                  placeholder="9999999999"
                  onChange={this.handleChange.bind(this)}
                />
                {errors['phone'] && (
                  <span className="input-error text-red">
                    {errors['phone']}
                  </span>
                )}
              </FormGroup>
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Alias
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  name="alias"
                  placeholder="Alias"
                  onChange={this.handleChange.bind(this)}
                />
                {errors['alias'] && (
                  <span className="input-error text-red">
                    {errors['alias']}
                  </span>
                )}
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel className="custom-form-control-label">
                  Country
                </ControlLabel>
                <Select
                  className="custom-form-control"
                  name="country_option"
                  value={userForm.country_option}
                  options={this.countryOptions()}
                  onChange={this.handleCountrySelectChange.bind(this)}
                />
                {errors['country_id'] && (
                  <span className="input-error text-red">
                    {errors['country_id']}
                  </span>
                )}
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel className="custom-form-control-label">
                  User Type
                </ControlLabel>
                <Select
                  className="custom-form-control"
                  name="user_type"
                  value={userForm.user_type_option.length > 0 ? userForm.user_type_option[0] : userForm.user_type_option}
                  options={this.userTypeOptions()}
                  onChange={this.handleUserTypeSelectChange.bind(this)}
                />
                {errors['user_type'] && (
                  <span className="input-error text-red">
                    {errors['user_type']}
                  </span>
                )}
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel className="custom-form-control-label">
                  Package
                </ControlLabel>
                <Select
                  className="custom-form-control"
                  name="package_option"
                  value={userForm.package_option}
                  options={this.packageOptions()}
                  onChange={this.handlePackageSelectChange.bind(this)}
                />
                {errors['package_id'] && (
                  <span className="input-error text-red">
                    {errors['package_id']}
                  </span>
                )}
              </FormGroup>
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                    Captcha
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="number"
                  name="captcha"
                  placeholder="What is answer of 4x7?"
                  onChange={this.handleChange.bind(this)}
                />
                {errors['captcha'] && (
                  <span className="input-error text-red">
                    {errors['captcha']}
                  </span>
                )}
              </FormGroup>
             
              <Button
                type="submit"
                className="btn btn-orange create-video-submit"
                onClick={event => this.handleSubmit(event)}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={this.props.closeOn}
                className="btn btn-grey create-video-cancel"
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

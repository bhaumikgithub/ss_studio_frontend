import React, { Component } from 'react';
import { Col, FormControl, FormGroup, ControlLabel, Button, Table } from 'react-bootstrap';
import Select from 'react-select';

// Import components
import validationHandler from '../../common/ValidationHandler';

// Import services
import { UserService } from '../../../services/Index';

// Import css
import '../../../assets/css/admin/album/albums.css';
import '../../../assets/css/admin/album/album-details/album-details.css';
import '../../../assets/css/admin/category/categories.css';

// Import helper
import { isObjectEmpty, toCapitalize } from '../../Helper';

export default class ProfilePlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userForm: {
        first_name: '',
        last_name: '',
        email: '',
        alias: '',
        phone: '',
        country_id: '',
        country_option: ''
      },
      countries: [],
      userPackages: [],
      user: {},
      errors: {}
    };
  }

  componentWillMount() {
    var self = this;
    self.getUser()
    self.getCountries()
    self.getUserPackages()
  }

  getUser(){
    var self = this
    UserService.getCurrentUser()
    .then(function(response) {
      if (response.status === 200) {
        var data = response.data;
        self.setState({
          user: data.data.user
        },()=>self.editUser());
      }
    })
    .catch(function(error) {
      console.log(error.response);
    });
  }

  getCountries(){
    var self = this
    UserService.getCountries()
      .then(function(response) {
        var data = response.data;
        self.setState({ countries: data.data.countries });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  getUserPackages(){
    var self = this
    UserService.getUserPackages()
      .then(function(response) {
        if (response.status === 200) {
          var data = response.data
          self.setState({userPackages: data.data.users})
        }
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  editUser(){
    var self = this;
    const { first_name, last_name, email, alias, phone, country } = self.state.user;
    self.setState({
      userForm: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        alias: alias,
        phone: phone,
        country_option: self.countryOptions([country])
      }
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

  handleSelectChange(value) {
    const userForm = this.state.userForm;
    userForm['country_option'] = value;
    userForm['country_id'] = value.value;
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
    var callUserApi = () => {};
    var editParams = {
      id: self.state.user.id,
      userForm: { user: self.state.userForm }
    };
    callUserApi = UserService.editUser(editParams);
    callUserApi
      .then(function(response) {
        if (response.status === 201) {
          var data = response.data
          self.setState({user: data.data.user})
        }
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

  render() {
    const { user, userForm, userPackages } = this.state;
    return (
      <Col xs={12} className="albums-page-wrap">
        <Col xs={12} className="filter-wrap p-none album-listing-title-wrap">
        </Col>
        <Col xs={12} className="p-none">
          <Col xs={12} className="p-none album-list">
            {!isObjectEmpty(user) &&
              <Col xs={12} className="albums-list-wrap p-none">
                <Col
                  xs={12}
                  className={
                    'album-wrap'
                  }
                >
                  <form className="admin-side create-album-form custom-form horizontal">
                    <FormGroup controlId="formHorizontalEmail" className="profile-form-group">
                      <Col componentClass={ControlLabel} sm={2} className="custom-form-control-label">
                        First Name
                      </Col>
                      <Col sm={10}>
                        <FormControl
                          className="custom-form-control col-xs-6"
                          type="text"
                          name="first_name"
                          value={userForm.first_name}
                          onChange={this.handleChange.bind(this)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalEmail" className="profile-form-group">
                      <Col componentClass={ControlLabel} sm={2} className="custom-form-control-label">
                        Last Name
                      </Col>
                      <Col sm={10}>
                        <FormControl
                          className="custom-form-control col-xs-6"
                          type="text"
                          name="last_name"
                          value={userForm.last_name}
                          onChange={this.handleChange.bind(this)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalEmail" className="profile-form-group">
                      <Col componentClass={ControlLabel} sm={2} className="custom-form-control-label">
                        Email
                      </Col>
                      <Col sm={10}>
                        <FormControl
                          className="custom-form-control col-xs-6"
                          type="text"
                          name="email"
                          value={userForm.email}
                          disabled={true}
                          onChange={this.handleChange.bind(this)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalEmail" className="profile-form-group">
                      <Col componentClass={ControlLabel} sm={2} className="custom-form-control-label">
                        Alias
                      </Col>
                      <Col sm={10}>
                        <FormControl
                          className="custom-form-control col-xs-6"
                          type="text"
                          name="alias"
                          value={userForm.alias}
                          disabled={true}
                          onChange={this.handleChange.bind(this)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalEmail" className="profile-form-group">
                      <Col componentClass={ControlLabel} sm={2} className="custom-form-control-label">
                        Phone
                      </Col>
                      <Col sm={10}>
                        <FormControl
                          className="custom-form-control col-xs-6"
                          type="number"
                          name="phone"
                          value={userForm.phone}
                          onChange={this.handleChange.bind(this)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalEmail" className="profile-form-group">
                      <Col componentClass={ControlLabel} sm={2} className="custom-form-control-label">
                        Country
                      </Col>
                      <Col sm={10}>
                        <Select
                          className="custom-form-control country_select col-xs-6 p-none"
                          name="country_option"
                          value={userForm.country_option.length > 0 ? userForm.country_option[0] : userForm.country_option}
                          options={this.countryOptions()}
                          placeholder="Country"
                          onChange={this.handleSelectChange.bind(this)}
                        />
                      </Col>
                    </FormGroup>
                    <div className="text-center">
                      <Button
                        type="submit"
                        className="btn btn-orange create-video-submit"
                        onClick={event => this.handleSubmit(event)}
                      >
                        Save
                      </Button>
                    </div>
                  </form>
                </Col>
              </Col>
            }

            <Col xs={12} className="albums-list-wrap p-none">
              <div className="categories-table-wrap">
                <Table responsive className="categories-table">
                  <thead>
                    <tr>
                      <th>Membership Plan</th>
                      <th>Started Date</th>
                      <th>End Date</th>
                      <th>Transaction Date</th>
                      <th>Amount Paid</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userPackages.map(userPackage => (
                      <tr key={userPackage.id}>
                        <td>{toCapitalize(userPackage.plan)}</td>
                        <td>{userPackage.package_start_date}</td>
                        <td>{userPackage.package_end_date}</td>
                        <td className="text-center">{userPackage.transaction_date === null ? "-" : userPackage.transaction_date}</td>
                        <td>{userPackage.amount + " Rs"}</td>
                        <td
                          className={userPackage.package_status === "active" ? "text-green" : "text-red"}
                        >{toCapitalize(userPackage.package_status)}</td>
                        {userPackage.package_status === "active" ?
                          <td>
                            <Button
                              className="btn btn-green create-video-submit renew-plan-btn"
                              href="#"
                            >
                              Renew
                            </Button>
                            <Button
                              className="btn btn-orange create-video-submit cancel-plan-btn"
                              href="#"
                            >
                              cancel
                            </Button>
                          </td>
                          :
                          <td>-</td>
                        }
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Col>
        </Col>
      </Col>
    );
  }
}

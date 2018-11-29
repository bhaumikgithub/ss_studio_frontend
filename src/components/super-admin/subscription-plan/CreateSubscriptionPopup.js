import React, { Component } from 'react';
import {
    Col,
    Button,
    Modal,
    Radio,
    ControlLabel,
    FormGroup,
    FormControl
  } from 'react-bootstrap';
import Select from 'react-select';
import addTitle from '../../../assets/images/admin/contact/admin-add-contact/add-contact-icon.png';
import editTitle from '../../../assets/images/admin/contact/admin-add-contact/edit-contact-icon.png';

// Import components
import validationHandler from '../../common/ValidationHandler';
// Import css
import 'react-select/dist/react-select.min.css';
import '../../../assets/css/admin/video-films/add-video/add-video.css';

// Import services
import { PackageService } from '../../../services/Index';

// Import helper
import { toCapitalize, str2bool, isObjectEmpty } from '../../Helper';

export default class UserPopup extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      packageForm: {
        name: '',
        duration: '',
        status: '',
        price: '',
        is_default: false,
        duration_id: '',
        duration_option: '',
        status_id: '',
        status_option: '',
      },
      errors: {}
    };

    return initialState;
  }

  resetuserForm() {
    this.setState({ packageForm: this.getInitialState().packageForm });
  }

  componentWillMount() {
    var self = this;
    if (!isObjectEmpty(self.props.editObject)) {
      self.editPackage(self.props.editObject);
    }
  }

  editPackage(pkg) {
    var self = this;
    const {
      name,
      duration,
      status,
      price,
      is_default
    } = pkg;

    self.setState({
      packageForm: {
        name: name,
        duration: duration,
        status: status,
        duration_option: self.packageOptions(duration === null ? [] : [duration]),
        status_option: self.statusOptions(status === null ? [] : [{id: status === "active" ? 0 : 1,value: toCapitalize(status)}]),
        price: price,
        is_default: is_default
        
      }
    });
  }

  packageOptions(duration = []) {
    var options = [];
    var package_options = [];
    if(duration.length === 0){
      package_options = ['1 Day','2 Days','3 Days', '5 Days', '15 Days', '1 Month', '3 Months', '6 Months', '1 Year', '2 Years', '3 Years'];
    }else{
      package_options = duration
    }
    package_options.map(pkg => {
      return options.push({
        value: pkg,
        label: pkg
      });
    });
    return options;

  }

  handlePackageSelectChange(value) {
    const packageForm = this.state.packageForm;
    if (value !== null) {
      packageForm['duration'] = value.value
      packageForm['duration_option'] = value;
      packageForm['duration_id'] = value.value;
    }
    this.setState({
      packageForm
    });
  }

  statusOptions(status_optn = []){
    var options = [];
    var status_options = [];
    if(status_optn.length === 0){
      status_options = [{id: 0,value: 'Active'},{id: 1, value: 'Deactive'}];
    }
    else{
      status_options = status_optn
    }
    status_options.map(status => {
      return options.push({
        value: status.id,
        label: status.value
      });
    });
    return options;
  }

  handleStatusSelectChange(value) {
    const packageForm = this.state.packageForm;
    if (value !== null) {
      packageForm['status'] = value.value
      packageForm['status_option'] = value;
      packageForm['status_id'] = value.value;
    }
    this.setState({
      packageForm
    });
  }

  handleChange(e) {
    const packageForm = this.state.packageForm;
    var key = e.target.name;
    packageForm[key] = str2bool(e.target.value);
    this.setState({
      packageForm
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    var callPackageApi = () => {};

    if (isObjectEmpty(self.props.editObject)) {
      var createParams = { package: self.state.packageForm };
      callPackageApi = PackageService.createPackage(createParams);
    } else {
      var editParams = {
        id: self.props.editObject.id,
        packageForm: { package: self.state.packageForm }
      };
      callPackageApi = PackageService.updatePackage(editParams);
    }

    callPackageApi
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
      this.resetuserForm()
      this.props.renderPackage(
        responseData.data.package,
        isObjectEmpty(this.props.editObject) ? 'insert' : 'replace'
      );
      this.props.closeOn();
    } else {
      console.log(responseData.errors);
    }
  }
  render() {
    const { packageForm, errors } = this.state;
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
                src={
                  isObjectEmpty(this.props.editObject)
                    ? addTitle
                    : editTitle
                }
                alt=""
                className="add-videofilms-icon img-responsive"
              />
              <h4 className="add-videofilms-text text-white">
              {isObjectEmpty(this.props.editObject)
                  ? 'Add Plan'
                  : 'Edit Plan'}
              </h4>
            </Col>
          </Col>
          <Col className="add-videofilms-content-wrap" sm={7}>
            <form className="admin-side add-videofilms-form custom-form">
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Name
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={packageForm.name}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['name'] && (
                  <span className="input-error text-red">
                    {errors['name']}
                  </span>
                )}
              </FormGroup>
              {/* <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Duration
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  name="duration"
                  placeholder="Duration"
                  onChange={this.handleChange.bind(this)}
                />
                {errors['duration'] && (
                  <span className="input-error text-red">
                    {errors['duration']}
                  </span>
                )}
              </FormGroup> */}
               <FormGroup controlId="formControlsSelect">
                <ControlLabel className="custom-form-control-label">
                  Duration
                </ControlLabel>
                <Select
                  className="custom-form-control"
                  name="duration"
                  value={packageForm.duration_option.length > 0 ? packageForm.duration_option[0] : packageForm.duration_option}
                  options={this.packageOptions()}
                  onChange={this.handlePackageSelectChange.bind(this)}
                />
                {errors['duration'] && (
                  <span className="input-error text-red">
                    {errors['duration']}
                  </span>
                )}
              </FormGroup>
              {/* <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Status
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  name="status"
                  placeholder="status"
                  onChange={this.handleChange.bind(this)}
                />
                {errors['status'] && (
                  <span className="input-error text-red">
                    {errors['status']}
                  </span>
                )}
              </FormGroup> */}
              <FormGroup controlId="formControlsSelect">
                <ControlLabel className="custom-form-control-label">
                  Status
                </ControlLabel>
                <Select
                  className="custom-form-control"
                  name="status"
                  value={packageForm.status_option.length > 0 ? packageForm.status_option[0] : packageForm.status_option}
                  options={this.statusOptions()}
                  onChange={this.handleStatusSelectChange.bind(this)}
                />
                {errors['status'] && (
                  <span className="input-error text-red">
                    {errors['status']}
                  </span>
                )}
              </FormGroup>
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Amount
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  name="price"
                  value={packageForm.price}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['price'] && (
                  <span className="input-error text-red">
                    {errors['price']}
                  </span>
                )}
              </FormGroup>
              {/* <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                Default
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  name="is_default"
                  onChange={this.handleChange.bind(this)}
                />
                {errors['is_default'] && (
                  <span className="input-error text-red">
                    {errors['is_default']}
                  </span>
                )}
              </FormGroup> */}
              <FormGroup className="custom-form-group">
                <ControlLabel className="custom-form-control-label">
                  Default
                </ControlLabel>
                <br />
                <span className="custom-radio-wrap">
                  <Radio
                    name="is_default"
                    inline
                    value={true}
                    checked={packageForm.is_default}
                    onChange={this.handleChange.bind(this)}
                  >
                    Yes
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Radio>
                </span>{' '}
                <span className="custom-radio-wrap">
                  <Radio
                    name="is_default"
                    inline
                    value={false}
                    checked={!packageForm.is_default}
                    onChange={this.handleChange.bind(this)}
                  >
                    No
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Radio>
                </span>
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

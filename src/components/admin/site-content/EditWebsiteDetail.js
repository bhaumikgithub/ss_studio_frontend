import React, { Component } from 'react';
import {
  Col,
  Button,
  Modal,
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import EditTitle from '../../../assets/images/admin/site-content/about-site-content-icon.png';

// Import components
import validationHandler from '../../common/ValidationHandler';

// Import services
import { WebsiteDetailService } from '../../../services/Index';

// Import helper
import { str2bool, isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/site-content/edit-about-content.css';

export default class EditContactDetail extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      EditWebsiteForm: {
        title: '',
        copyright_text: ''
      },
      errors: {}
    };

    return initialState;
  }

  resetWebsiteDetailForm() {
    this.setState({ EditWebsiteForm: this.getInitialState().EditWebsiteForm });
  }

  componentWillMount() {
    var self = this;
    if (!isObjectEmpty(self.props.editObject)) {
      self.editWebsiteDetail(self.props.editObject);
    }
  }

  editWebsiteDetail(websiteDetail) {
    var self = this;
    const { title, copyright_text } = websiteDetail;

    self.setState({
        EditWebsiteForm: {
        title: title,
        copyright_text: copyright_text
      }
    });
  }

  handleChange(e) {
    const EditWebsiteForm = this.state.EditWebsiteForm;
    var key = e.target.name;
    EditWebsiteForm[key] = str2bool(e.target.value);
    this.setState({
        EditWebsiteForm
    });
  }

  handleSubmit(e) {
    var self = this;
    var callWebsiteDetailApi = () => {};
    var editParams = {
      id: self.props.editObject.id,
      EditWebsiteForm: { website_detail: self.state.EditWebsiteForm }
    };
    if(isObjectEmpty(self.props.editObject)){
    //     WebsiteDetailService.createWebsiteDetail(editParams).then(function(response) {
    //     self.handelResponse(response);
    //   })
    //   .catch(function(error) {
    //     const errors = error.response.data.errors;
    //     if (errors.length > 0) {
    //       self.setState({ errors: validationHandler(errors) });
    //     } else {
    //       console.log(error.response);
    //     }
    //   });
    }
    else{
      callWebsiteDetailApi = WebsiteDetailService.updateWebsiteDetail(editParams);

      callWebsiteDetailApi
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
  }

  handelResponse(response) {
    var responseData = response.data;
    if (response.status === 201) {
      this.resetWebsiteDetailForm();
      this.props.renderWebsiteDetail(responseData.data.website_detail);
      this.props.EditWebsiteClose();
    } else {
      console.log(responseData.errors);
    }
  }

  render() {
    const { EditWebsiteForm, errors } = this.state;

    return (
      <Modal
        show={this.props.EditWebsiteDetailShow}
        bsSize="large"
        className="edit-about-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="edit-about-body p-none">
          <span
            className="close-modal-icon"
            onClick={this.props.EditWebsiteClose}
          >
            <img
              src={require('../../../assets/images/admin/site-content/close-icon.png')}
              alt=""
              className="hidden-xs"
            />
            <img
              src={require('../../../assets/images/admin/site-content/close-icon-white.png')}
              alt=""
              className="visible-xs"
            />
          </span>

          <Col className="edit-about-title-wrap p-none" sm={4}>
            <Col xs={12} className="p-none edit-about-title-details">
              <img
                src={EditTitle}
                alt=""
                className="edit-about-icon img-responsive"
              />
              <h4 className="edit-about-text text-white">Website Details</h4>
            </Col>
          </Col>
          <Col className="edit-about-content-wrap" sm={8}>
            <form className="admin-side edit-about-form custom-form">
              <FormGroup className="custom-form-group required">
                <FormGroup className="custom-form-group required">
                  <ControlLabel className="custom-form-control-label">
                    Title
                  </ControlLabel>
                  <FormControl
                    className="custom-form-control"
                    type="text"
                    name="title"
                    value={EditWebsiteForm.title}
                    onChange={this.handleChange.bind(this)}
                  />
                  {errors['title'] && (
                    <span className="input-error text-red">
                      {errors['title']}
                    </span>
                  )}
                </FormGroup>
                <ControlLabel className="custom-form-control-label">
                    Copyright Text
                </ControlLabel>
                <FormControl
                  className="custom-form-control num-input"
                  type="text"
                  name="copyright_text"
                  value={EditWebsiteForm.copyright_text}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['copyright_text'] && (
                  <span className="input-error text-red">
                    {errors['copyright_text']}
                  </span>
                )}
              </FormGroup>
              <Button
                className="btn btn-orange edit-about-submit"
                onClick={event => this.handleSubmit(event)}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={this.props.EditWebsiteClose}
                className="btn btn-grey edit-about-cancel"
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

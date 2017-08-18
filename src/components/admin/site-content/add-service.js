import React, { Component } from 'react';
import { Col, Button, Modal,ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import { Scrollbars } from 'react-custom-scrollbars';

// Import icon
import AddTitle from '../../../assets/images/admin/site-content/add-service-icon.png';
import EditTitle from '../../../assets/images/admin/site-content/edit-contact-icon.png'

// Import css
import '../../../assets/css/admin/site-content/add-service.css';

// Import services
import { getServiceIcons, createService, updateService } from '../../../services/admin/SiteContent';

// Import helper
import { toCapitalize, str2bool, isObjectEmpty } from '../../Helper';

export default class AddService extends Component {
    constructor(props){
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
    const initialState = {
      ServiceForm: {
        service_name: '',
        description: '',
        status: 'active',
        service_icon_options: []
      },
      service_icons: []
    };

    return initialState;
  }


  componentWillMount() {
    var self = this;

    getServiceIcons()
      .then(function(response) {
        var data = response.data;
        self.setState({ service_icons: data.data.service_icons });
      })
      .catch(function(error) {
        console.log(error.response);
      });

    if (!isObjectEmpty(self.props.editObject)) {
      self.editService(self.props.editObject);
    }
  }


  editService(service) {
    var self = this;
    const {
      service_name,
      description,
      status,
      service_icons
    } = service;

    self.setState({
      ServiceForm: {
        service_name: service_name,
        description: description,
        status: status,
        service_icon_options: self.serviceIconOptions(service_icons)
      }
    });
  }

  serviceIconOptions(service_icons = this.state.service_icons) {
    var options = [];
    service_icons.map(service_icon => {
      return options.push({
        value: service_icon.id,
        label: service_icon.icon_image
      });
    });
    return options;
  }

  handleChange(e) {
    const ServiceForm = this.state.ServiceForm;
    var key = e.target.name;
    ServiceForm[key] = str2bool(e.target.value);
    this.setState({
      ServiceForm
    });
  }


  handleSubmit(e) {
    var self = this;
    var callServiceApi = () => {};

    if (isObjectEmpty(self.props.editObject)) {
      var createParams = { service: self.state.ServiceForm };
      callServiceApi = createService(createParams);
    } else {
      var editParams = {
        id: self.props.editObject.id,
        ServiceForm: { service: self.state.ServiceForm }
      };
      callServiceApi = updateService(editParams);
    }

    callServiceApi
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }


  handelResponse(response) {
    var responseData = response.data;
    console.log(responseData)
    if (response.status === 201) {
      this.resetServiceForm();
      this.props.renderService(
        responseData.data.service,
        isObjectEmpty(this.props.editObject) ? 'insert' : 'replace'
      );
      this.props.hideCreatePopup();
    } else {
      console.log(responseData.errors);
    }
  }


  resetServiceForm() {
    this.setState({ ServiceForm: this.getInitialState().ServiceForm });
  }

    updateState(element) {
        this.setState({value: element});
    }

    render() {
        const { ServiceForm } = this.state;
            // var serviceSelect = require('react-select'); //only for server-side
            // var options = [
            //     { value: 'Fashion', label: 'Fashion icon',inputProps :'<img src={require("../../images/admin-site-cotent/fashion-icon.png")} alt=""/>' },
            //     { value: 'wedding', label: 'Wedding' },
            //     { value: 'prevedding', label: 'Pre-Wedding' },
            //     { value: 'fashion', label: 'Fashion' },
            //     { value: 'art', label: 'Art' },
            // ];
     return (           
       <Modal 
        show={this.props.AddServiceShow} 
        bsSize="large" 
        className="add-category-modal" 
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="add-category-body p-none">
        
          <span 
            className="close-modal-icon" 
            onClick={this.props.ServiceCloseModal}
          >
             <img src={require('../../../assets/images/admin/site-content/close-icon.png')} className="hidden-xs" alt=""/> 
             <img src={require('../../../assets/images/admin/site-content/close-icon-white.png')} className="visible-xs" alt=""/>              
          </span>
          <Col className="add-title-wrap p-none" sm={4}>
            <Col xs={12} className="p-none add-category-title-details">
                <img  
                  src={
                  isObjectEmpty(this.props.editObject)
                    ? AddTitle
                    : EditTitle
                  } 
                  alt="" className="add-category-icon img-responsive" 
                />
                <h4 className="add-category-text text-white">
                  {/* Add New Service */}
                  {isObjectEmpty(this.props.editObject)
                    ? 'Add New Service'
                    : 'Edit Service'
                  }
                </h4>
            </Col>
          </Col>
          <Col className="add-content-wrap" sm={8}>
            
            <form className="create-album-form custom-form">
                <FormGroup className="custom-form-group required">
                    <ControlLabel className="custom-form-control-label">
                      Service name
                    </ControlLabel>
                    <FormControl 
                      className="custom-form-control" 
                      type="text" 
                      placeholder="Service Name"
                      name="service_name"
                      value={ServiceForm.service_name}
                      onChange={this.handleChange.bind(this)}
                    />
                </FormGroup>               

                <FormGroup className="custom-form-group">
                    <ControlLabel className="custom-form-control-label">
                      Description
                    </ControlLabel>
                    
                    <Scrollbars style={{height: "40px"}}>
                        <FormControl 
                          id="modalServicedesc" 
                          className="custom-form-control custom-textarea" 
                          componentClass="textarea" 
                          placeholder="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
                          name="description"
                          value={ServiceForm.description}
                          onChange={this.handleChange.bind(this)}
                        />
                    </Scrollbars>

                </FormGroup>

                 <FormGroup className="custom-form-group" controlId="formControlsSelect">
                    <ControlLabel className="custom-form-control-label">
                      Select Icon
                    </ControlLabel>
                    <Select 
                      className="custom-form-control" 
                      placeholder="Select Icon" 
                      name="form-field-name" 
                      value={ServiceForm.service_icon_options} 
                      options={this.serviceIconOptions()} 
                      onChange={this.updateState.bind(this)} 
                    /> 
                </FormGroup>          
                
                <Button 
                  className="btn btn-orange add-category-submit"
                  onClick={event => this.handleSubmit(event)}
                >
                  Save
                </Button>
                <Button type="button" onClick={this.props.ServiceCloseModal} className="btn btn-grey add-category-cancel">
                    Cancel
                </Button>
            </form>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

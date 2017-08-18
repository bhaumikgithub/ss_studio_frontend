import React, { Component } from 'react';
import { Col, Button, Modal,ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import { Scrollbars } from 'react-custom-scrollbars';
import AddTitle from '../../../assets/images/admin/site-content/add-service-icon.png';

// Import css
import '../../../assets/css/admin/site-content/add-service.css';


export default class AddService extends Component {
    constructor(props){
        super(props);
        this.state = {value:""};
    }
    
    updateState(element) {
        this.setState({value: element});
    }

    render() {
            var serviceSelect = require('react-select'); //only for server-side
            var options = [
                { value: 'Fashion', label: 'Fashion icon',inputProps :'<img src={require("../../images/admin-site-cotent/fashion-icon.png")} alt=""/>' },
                { value: 'wedding', label: 'Wedding' },
                { value: 'prevedding', label: 'Pre-Wedding' },
                { value: 'fashion', label: 'Fashion' },
                { value: 'art', label: 'Art' },
            ];
     return (           
       <Modal show={this.props.AddServiceShow} bsSize="large" className="add-category-modal" aria-labelledby="contained-modal-title-lg">
        <Modal.Body className="add-category-body p-none">
        
          <span className="close-modal-icon" onClick={this.props.ServiceCloseModal}>
             <img src={require('../../../assets/images/admin/site-content/close-icon.png')} className="hidden-xs" alt=""/> 
             <img src={require('../../../assets/images/admin/site-content/close-icon-white.png')} className="visible-xs" alt=""/>              
          </span>
          <Col className="add-title-wrap p-none" sm={4}>
                <Col xs={12} className="p-none add-category-title-details">
                    <img src={AddTitle} alt="" className="add-category-icon img-responsive" />
                    <h4 className="add-category-text text-white">Add New Service</h4>
                </Col>
          </Col>
          <Col className="add-content-wrap" sm={8}>
            
            <form className="create-album-form custom-form">
                <FormGroup className="custom-form-group required">
                    <ControlLabel className="custom-form-control-label">Service name</ControlLabel>
                    <FormControl className="custom-form-control" type="text" placeholder="Fashion Photography" />
                </FormGroup>               

                <FormGroup className="custom-form-group">
                    <ControlLabel className="custom-form-control-label">Description</ControlLabel>
                    
                    <Scrollbars style={{height: "40px"}}>
                        <FormControl id="modalServicedesc" className="custom-form-control custom-textarea" componentClass="textarea" placeholder="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged" />
                    </Scrollbars>

                </FormGroup>

                 <FormGroup className="custom-form-group" controlId="formControlsSelect">
                    <ControlLabel className="custom-form-control-label">Select Icon</ControlLabel>
                     <Select className="custom-form-control" placeholder="Select Icon" name="form-field-name" value={this.state.value} options={options} onChange={this.updateState.bind(this)} /> 
                </FormGroup>          
                
                <Button type="submit" className="btn btn-orange add-category-submit">
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

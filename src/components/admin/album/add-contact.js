import React, { Component } from 'react';
import { Col, Button, Modal,Row, HelpBlock, Checkbox, Radio,ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import createTitle from '../../../assets/images/admin/album/admin-add-contact/add-contact-icon.png';
// import './add-contact.css';
import '../../../assets/css/admin/album/add-contact.css'

export default class AddContact extends Component {
constructor(props){
    super(props);
    this.state = {value:""};
  }
  updateState(element) {
    this.setState({value: element});
  }

  render() {      
    return (
       <Modal show={this.props.showCreate} className="add-contact-modal" aria-labelledby="contained-modal-title-lg">
        <Modal.Body className="create-album-body p-none">
        
          <span className="close-modal-icon" onClick={this.props.closeOn}>
            <img src={require('../../../assets/images/admin/album/close-icon.png')} alt="" className="hidden-xs"/>
            <img src={require('../../../assets/images/admin/album/close-icon-white.png')} alt="" className="visible-xs" />            
          </span>
          <Col className="add-contact-title-wrap p-none" sm={5}>
                <Col xs={12} className="p-none add-contact-title-details">
                    <img src={createTitle} alt="" className="add-contact-icon img-responsive" />
                    <h4 className="add-contact-text text-white">Create New Contact</h4>
                </Col>
          </Col>
          <Col className="add-contact-wrap" sm={7}>            
            <form className="add-contact-form custom-form">
                <FormGroup className="custom-form-group required">
                    <ControlLabel className="custom-form-control-label">First Name</ControlLabel>
                    <FormControl className="custom-form-control" type="text" placeholder="Paresh" />
                </FormGroup>    
                <FormGroup className="custom-form-group required">
                    <ControlLabel className="custom-form-control-label">Last Name</ControlLabel>
                    <FormControl className="custom-form-control" type="text" placeholder="Gandhi" />
                </FormGroup>    
                 <FormGroup className="<custom-form-group></custom-form-group>">
                    <ControlLabel className="custom-form-control-label">Upload Image</ControlLabel>
                   
                    <div className="upload-img-wrap">
                        <div className="upload-thumb">
                            {/*<img src={require('../../images/admin/album/admin-add-contact/contact-thumb.png')} alt="" />                          */}
                        </div>
                        <div className="upload-img-btn">
                            <span>Upload</span>
                            <FormControl accept="image/*" type="file" label="File" title="" className="upload-img-control"/>
                        </div>
                    </div>

                </FormGroup>    
                <FormGroup className="custom-form-group required">
                    <ControlLabel className="custom-form-control-label">Email</ControlLabel>
                    <FormControl className="custom-form-control" type="text" placeholder="pareshgandhi@gmail.com" />
                </FormGroup>   
                <FormGroup className="custom-form-group required">
                    <ControlLabel className="custom-form-control-label">Phone</ControlLabel>
                    <FormControl className="custom-form-control contact-input" type="text" placeholder="0987654321" />
                </FormGroup>     

                <Button type="submit" className="btn btn-orange add-contact-submit">
                    Save
                </Button>
                <Button type="button" onClick={this.props.closeOn} className="btn btn-grey add-contact-cancel">
                    Cancel
                </Button>
            </form>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

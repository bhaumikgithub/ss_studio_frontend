import React, { Component } from 'react';
import { Col, Button, Modal, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import EditTitle from '../../../assets/images/admin/site-content/about-site-content-icon.png';

// Import css
import '../../../assets/css/admin/site-content/edit-about-content.css';


export default class EditContactDetail extends Component {
constructor(props){
    super(props);        
  }   

  render() {   
    // const { EditContactForm } = this.state; 
    return (
       <Modal show={this.props.EditContactShow} bsSize="large" className="edit-about-modal" aria-labelledby="contained-modal-title-lg" >
        
        <Modal.Body className="edit-about-body p-none">        
          <span className="close-modal-icon" onClick={this.props.EditContactClose}>
            <img src={require('../../../assets/images/admin/site-content/close-icon.png')} alt="" className="hidden-xs"/>
            <img src={require('../../../assets/images/admin/site-content/close-icon-white.png')} alt="" className="visible-xs" />            
          </span>
          <Col className="edit-about-title-wrap p-none" sm={4}>
                <Col xs={12} className="p-none edit-about-title-details">
                    <img src={EditTitle} alt="" className="edit-about-icon img-responsive" />
                    <h4 className="edit-about-text text-white">Contact Us Details</h4>
                </Col>
          </Col>
          <Col className="edit-about-content-wrap" sm={8}>            
            <form className="edit-about-form custom-form">
                <FormGroup className="custom-form-group required">
                    <FormGroup className="custom-form-group required">
                    <ControlLabel className="custom-form-control-label">Email</ControlLabel>
                    <FormControl className="custom-form-control" type="text" placeholder="johndoe@gmail.com" />
                </FormGroup>
                    <ControlLabel className="custom-form-control-label">Phone</ControlLabel>
                    <FormControl className="custom-form-control num-input" type="text" placeholder="+91-9876543210" />
                </FormGroup>   
                <FormGroup className="custom-form-group required">
                    <ControlLabel className="custom-form-control-label">Address</ControlLabel>
                   
                    <Scrollbars style={{height: "45px"}}>                       
                        <FormControl id="modalAboutDesc" className="custom-form-control editabouttxtarea" componentClass="textarea" placeholder="2nd Floor, Tulsi Complex, Nr Azad Society, Behind Sahajanand College, Ambavadi, Ahmedabad - 380 015, Gujarat, India. " />
                    </Scrollbars>

                </FormGroup>   
  
                <Button type="submit" className="btn btn-orange edit-about-submit">
                    Save
                </Button>
                <Button type="button" onClick={this.props.EditContactClose} className="btn btn-grey edit-about-cancel">
                    Cancel
                </Button>
            </form>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

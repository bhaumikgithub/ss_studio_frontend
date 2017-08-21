import React, { Component } from 'react';
import { Col, Button, Modal, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import EditTitle from '../../../assets/images/admin/site-content/about-site-content-icon.png';

// Import css
import '../../../assets/css/admin/site-content/edit-about-content.css';

// Import services
// import { updateAboutUs } from '../../../services/admin/SiteContent';

export default class EditAboutContent extends Component {
constructor(props){
    super(props);        
  }  

  render() {
    // const { EditAboutForm } = this.state; 
    return (
       <Modal show={this.props.EditAboutShow} bsSize="large" className="edit-about-modal" aria-labelledby="contained-modal-title-lg" >
        <Modal.Body className="edit-about-body p-none">
        
          <span className="close-modal-icon" onClick={this.props.EditAboutClose}>
            <img src={require('../../../assets/images/admin/site-content/close-icon.png')} alt="" className="hidden-xs"/>
            <img src={require('../../../assets/images/admin/site-content/close-icon-white.png')} alt="" className="visible-xs" />            
          </span>
          <Col className="edit-about-title-wrap p-none" sm={4}>
                <Col xs={12} className="p-none edit-about-title-details">
                    <img src={EditTitle} alt="" className="edit-about-icon img-responsive" />
                    <h4 className="edit-about-text text-white">About Us Details</h4>
                </Col>
          </Col>
          <Col className="edit-about-content-wrap" sm={8}>            
            <form className="edit-about-form custom-form">
                <FormGroup className="custom-form-group required">
                    <ControlLabel className="custom-form-control-label">Title</ControlLabel>
                    <FormControl className="custom-form-control" type="text" placeholder="A young photographer taking lovely shots." />
                </FormGroup>   
                <FormGroup className="custom-form-group">
                    <ControlLabel className="custom-form-control-label">Description</ControlLabel>
                   
                    <Scrollbars style={{height: "40px"}}>                       
                        <FormControl id="modalAboutDesc" className="custom-form-control editabouttxtarea" componentClass="textarea" placeholder="We are Capture Best Moments which is impossible to recapture.. Wedding Photography, Wedding Videography , Candid Photography, Birthday Party, Candid Video, Short Film, Wedding Highlights , Portrait Songs , Pre Wedding Songs , Model Photography , Indoor/outdoor Photography , Product Photography , Making Brochure Design , etc..." />
                    </Scrollbars>

                </FormGroup>            
                <FormGroup className="custom-form-group">
                    <ControlLabel className="custom-form-control-label">Facebook Profile</ControlLabel>
                    <FormControl className="custom-form-control" type="text" placeholder="https://www.facebook.com/sagarphotocam/?pnref=lhc" />
                </FormGroup> 
                <FormGroup className="custom-form-group">
                    <ControlLabel className="custom-form-control-label">Twitter Profile</ControlLabel>
                    <FormControl className="custom-form-control" type="text" placeholder="https://www.twitter.com/sagarphotocam/" />
                </FormGroup> 
  
                <Button type="submit" className="btn btn-orange edit-about-submit">
                    Save
                </Button>
                <Button type="button" onClick={this.props.EditAboutClose} className="btn btn-grey edit-about-cancel">
                    Cancel
                </Button>
            </form>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

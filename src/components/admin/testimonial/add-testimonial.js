import React, { Component } from 'react';
import { Col, Button, Modal, Row,ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import addTitle from '../../../assets/images/admin/testimonial/add-testimonial-icon.png';
import './add-testimonial.css';

export default class AddTestimonial extends Component {
constructor(props){
    super(props);
    this.state = {value:""};
  }
  getInitialState() {
    const initialState = {
      testimonialForm: {
        client_name: '',
        message: '',
        status: 'active'
      }
    };

    return initialState;
  }

  resetTestimonialForm() {
    this.setState({ testimonialForm: this.getInitialState().testimonialForm });
  }

  updateState(element) {
    this.setState({value: element});
  }

  render() { 
    const { testimonialForm } = this.state;
    var Rating = require('react-rating');
     
    return (
       <Modal show={this.props.showCreate} className="add-testimonial-modal" aria-labelledby="contained-modal-title-lg">
        <Modal.Body className="add-testimonial-body p-none">
        
          <span className="close-modal-icon" onClick={this.props.closeOn}>
            <img src={require('../../../assets/images/admin/album/close-icon.png')} alt="" className="hidden-xs"/>
            <img src={require('../../../assets/images/admin/album/close-icon-white.png')} alt="" className="visible-xs" />            
          </span>
          <Col className="add-testimonial-title-wrap p-none" sm={5}>
                <Col xs={12} className="p-none add-testimonial-title-details">
                    <img src={addTitle} alt="" className="add-testimonial-icon img-responsive" />
                    <h4 className="add-testimonial-text text-white">Add New Testimonial</h4>
                </Col>
          </Col>
          <Col className="add-testimonial-wrap" sm={7}>            
            <form className="add-contact-form custom-form">
                <FormGroup className="custom-form-group required">
                    <ControlLabel className="custom-form-control-label">Client Name</ControlLabel>
                    <FormControl className="custom-form-control" type="text" placeholder="Bhaumik Gadani" />
                </FormGroup>    
                <FormGroup className="custom-form-group">
                    <ControlLabel className="custom-form-control-label">Description</ControlLabel>
                    <Scrollbars style={{height: "40px"}}>
                        <FormControl id="modalTestimonialDesc" className="custom-form-control custom-textarea" componentClass="textarea" placeholder="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged" />
                    </Scrollbars>
                </FormGroup> 
                <FormGroup className="custom-form-group">
                    <ControlLabel className="custom-form-control-label">Rating</ControlLabel>
                    <Rating className="testimonial-rating"
                        empty="fa fa-star-o"
                        full="fa fa-star"
                        fractions={2}
                        initialRate={2}
                    />
                </FormGroup>   
                <FormGroup className="<custom-form-group></custom-form-group>">
                    <ControlLabel className="custom-form-control-label">Upload Image</ControlLabel>  
                    <div className="upload-img-wrap testimonial-upload">
                        <div className="upload-thumb">
                            <img src={require('../../../assets/images/admin/contact/admin-add-contact/contact-thumb.png')} alt="" /> 
                        </div>
                        <div className="upload-img-btn">
                            <span>Upload</span>
                            <FormControl accept="image/*" type="file" label="File" title="" className="upload-img-control"/>
                        </div>
                    </div>
                </FormGroup>  
                <Button type="submit" className="btn btn-orange add-testimonial-submit">
                    Save
                </Button>
                <Button type="button" onClick={this.props.closeOn} className="btn btn-grey add-testimonial-cancel">
                    Cancel
                </Button>
            </form>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

import React, { Component } from 'react';
import { Col, Button, Modal, Row,ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';

// Import icon
import createTestimonialIcon from '../../../assets/images/admin/testimonial/add-testimonial-icon.png';
import editTestimonialIcon from '../../../assets/images/admin/testimonial/edit-testimonial-icon.png';

// Import helper
import { isObjectEmpty } from '../../Helper';

// Import services
import { createTestimonial, updateTestimonial } from '../../../services/admin/Testimonial';

// Import css
import '../../../assets/css/admin/testimonial/add-testimonial.css';

export default class TestimonialPopup extends Component {
constructor(props){
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState() {
    const initialState = {
      testimonialForm: {
        client_name: '',
        message: '',
        status: 'active',
        rating: 0,
        photo_attributes: {
          image: ''
        }
      }
    };

    return initialState;
  }

  resetTestimonialForm() {
    this.setState({ testimonialForm: this.getInitialState().testimonialForm });
  }

  componentWillMount() {
    var self = this;
    if (!isObjectEmpty(self.props.editObject)) {
      self.setState({ testimonialForm: self.props.editObject })
    }
  }

  updateState(element) {
    this.setState({value: element});
  }

  handleChange(e, rate = undefined) {
    const testimonialForm = this.state.testimonialForm;
    var key = e.target.name;
    testimonialForm[key] = key === "rating" ? rate : e.target.value;
    this.setState({
      testimonialForm
    });
  }

  handleSubmit(e) {
    var self = this;
    var callTestimonialApi = () => {};

    if (isObjectEmpty(self.props.editObject)) {
      var createParams = { testimonial: self.state.testimonialForm };
      callTestimonialApi = createTestimonial(createParams);
    } else {
      var editParams = {
        id: self.props.editObject.id,
        testimonialForm: { testimonial: self.state.testimonialForm }
      };
      callTestimonialApi = updateTestimonial(editParams);
    }
    callTestimonialApi
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  handelResponse(response) {
    var responseData = response.data;
    if (response.status === 201) {
      this.resetTestimonialForm();
      this.props.renderTestimonial(
        responseData.data.testimonial,
        isObjectEmpty(this.props.editObject) ? 'insert' : 'replace'
      );
      this.props.hideCreatePopup();
    } else {
      console.log(responseData.errors);
    }
  }

  render() { 
    const { testimonialForm } = this.state;
    var Rating = require('react-rating');
     
    return (
       <Modal show={this.props.CreateShow} className="add-testimonial-modal" aria-labelledby="contained-modal-title-lg">
        <Modal.Body className="add-testimonial-body p-none">
        
          <span className="close-modal-icon" onClick={this.props.hideCreatePopup}>
            <img src={require('../../../assets/images/admin/album/close-icon.png')} alt="" className="hidden-xs"/>
            <img src={require('../../../assets/images/admin/album/close-icon-white.png')} alt="" className="visible-xs" />            
          </span>
          <Col className="add-testimonial-title-wrap p-none" sm={5}>
                <Col xs={12} className="p-none add-testimonial-title-details">
                    <img src={ 
                   isObjectEmpty(this.props.editObject)
                    ? createTestimonialIcon
                    : editTestimonialIcon
                  }  
                  
                  alt="" className="add-testimonial-icon img-responsive" />
                    <h4 className="add-testimonial-text text-white">
                    {isObjectEmpty(this.props.editObject)
                  ? 'Add New Testimonial'
                  : 'Edit Testimonial'}
              </h4>
                </Col>
          </Col>
          <Col className="add-testimonial-wrap" sm={7}>            
            <form className="add-contact-form custom-form">
                <FormGroup className="custom-form-group required">
                    <ControlLabel className="custom-form-control-label">Client Name</ControlLabel>
                    <FormControl 
                    className="custom-form-control" 
                    type="text" 
                    placeholder="Bhaumik Gadani"
                    name="client_name"
                    value={testimonialForm.client_name}
                    onChange={this.handleChange.bind(this)}
                    />
                </FormGroup>    
                <FormGroup className="custom-form-group">
                    <ControlLabel className="custom-form-control-label">Description</ControlLabel>
                    <Scrollbars style={{height: "40px"}}>
                        <FormControl 
                          id="modalTestimonialDesc" 
                          className="custom-form-control custom-textarea" 
                          componentClass="textarea" 
                          placeholder="Message"
                          name="message"
                          value={testimonialForm.message}
                          onChange={this.handleChange.bind(this)}
                           />
                    </Scrollbars>
                </FormGroup> 
                <FormGroup className="custom-form-group">
                    <ControlLabel className="custom-form-control-label">Rating</ControlLabel>
                    <Rating className="testimonial-rating"
                        empty="fa fa-star-o"
                        full={<button name="rating" className="rating-button fa fa-star" type="button"></button>}
                        fractions={1}
                        initialRate={testimonialForm.rating}
                        onClick={(rate, event) => this.handleChange(event, rate)}
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
                            <FormControl 
                              accept="image/*"
                            /*  ref={testimonialForm.photo_attributes}*/
                              name="image"
                              type="file" 
                              label="File" 
                              title="" 
                              className="upload-img-control"
                              /* onChange={(e) => console.log(e.target.files)} */
                              
                              />
                        </div>
                    </div>
                </FormGroup>  
                <Button 
                  className="btn btn-orange add-testimonial-submit"
                  onClick={event => this.handleSubmit(event)}>
                    Save
                </Button>
                <Button type="button" onClick={this.props.hideCreatePopup} className="btn btn-grey add-testimonial-cancel">
                    Cancel
                </Button>
            </form>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

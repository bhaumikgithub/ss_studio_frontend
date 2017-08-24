import React, { Component } from 'react';
import { Col, Button, Media, Pagination } from 'react-bootstrap';
import AddTestimonial from './add-testimonial';
import './testimonial.css';

// Import services
import { getTestimonials } from '../../../services/admin/Testimonial';

export default class Testmonials extends Component {
constructor(props){
    super(props);
    this.state = {
      testimonials: [],
      meta: [],
      alert: {
        objectId: '',
        show: false,
        cancelBtn: true,
        confirmAction: () => {},
        title: '',
        text: '',
        btnText: '',
        type: ''
      }
    }
    this.handleModal = this.handleModal.bind(this);
  } 
  
  componentWillMount() {
    var self = this;

    getTestimonials()
      .then(function(response) {
        var data = response.data;
        debugger;
        self.setState({ testimonials: data.data.testimonials, meta: data.meta });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }
    CreateClose = () => this.setState({ CreateShow: false });  

    handleModal(){
        this.setState({ CreateShow: true });
        setTimeout(function(){
            document.getElementById("modalTestimonialDesc").style.height = document.getElementById("modalTestimonialDesc").scrollHeight + "px";
        },1000);
        document.body.style.overflow = "hidden";
    }

    
    
  render() {
    const { testimonials } = this.state;
    var Rating = require('react-rating');
    return (
      <Col xs={12} className="testimonial-page-wrap">
      
        <AddTestimonial showCreate={this.state.CreateShow} closeOn={this.CreateClose}/>   

        <Col xs={12} className="filter-wrap p-none">                        
            <Button className="btn btn-orange pull-right add-testimonial-btn" onClick={this.handleModal}> 
                <i className="add-testmonial-icon">
                    <img src={require('../../../assets/images/admin/album/add-icon.png')} alt=""/> 
                </i>Add New
            </Button>  
        </Col>
        <Col xs={12} className="p-none testimonial-list">
            <Col xs={12} className="testimonial-list-wrap p-none">
            {testimonials.map(testimonial =>
                <Col xs={12} className="testimonial-wrap" key={testimonial.id}>
                    <Media>
                        <Media.Left align="top" className="testimonial-img-wrap">
                            <img className="testimonial-thumb" width={130} height={130} src={testimonial.photo.image} alt={testimonial.photo.image_file_name}/>
                        </Media.Left>
                        <Media.Body className="testimonial-detail-wrap">
                            <Media.Heading className="testimonial-title">
                                {testimonial.contact.full_name}
                            </Media.Heading>
                            <Button className="btn-link p-none edit-testimonial-btn">
                                <img src={require('../../../assets/images/admin/testimonial/edit-icon.png')} alt=""/>
                            </Button>  
                            <div className="testimonial-detail">
                                {testimonial.message}
                            </div>
                             <Rating className="testimonial-rating"
                                empty="fa fa-star-o"
                                full="fa fa-star"
                                fractions={2}
                                initialRate={2}
                                readonly={true}
                            />
                        </Media.Body>
                    </Media>                    
                </Col>
              )}
            </Col> 
        </Col>
        
        <Col xs={12} className="p-none custom-pagination-wrap">
            <Pagination prev next ellipsis boundaryLinks items={10} maxButtons={3} activePage={this.state.activePage} onSelect={this.handleSelect} className="custom-pagination"/>
        </Col>
      </Col>
    );
  }
}

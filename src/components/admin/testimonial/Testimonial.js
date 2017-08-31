import React, { Component } from 'react';
import { Col, Button, Media, Pagination } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';

// Import component
import TestimonialPopup from './TestimonialPopup';

// Import services
import {
  getTestimonials,
  deleteTestimonial
} from '../../../services/admin/Testimonial';

// Import helper
import { isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/testimonial/testimonial.css';

export default class Testmonials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editObject: {},
      CreateShow: false,
      testimonials: [],
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
    };
    this.handleModal = this.handleModal.bind(this);
  }

  hideCreatePopup = () => {
    this.setState({ CreateShow: false, editObject: {} });
  };

  renderTestimonial = (testimonial, action) => {
    const newTestimonials = this.state.testimonials.slice();
    if (action === 'insert') {
      newTestimonials.splice(0, 0, testimonial);
    } else if (action === 'replace' && !isObjectEmpty(this.state.editObject)) {
      newTestimonials.splice(
        newTestimonials.indexOf(this.state.editObject),
        1,
        testimonial
      );
    }

    this.setState({
      testimonials: newTestimonials
    });
  };

  componentWillMount() {
    var self = this;

    getTestimonials()
      .then(function(response) {
        var data = response.data;
        self.setState({
          testimonials: data.data.testimonials,
          meta: data.meta
        });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }
  CreateClose = () => this.setState({ CreateShow: false });

  showDialogueBox(id) {
    this.setState({
      alert: {
        objectId: id,
        show: true,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        btnText: 'Yes, delete it!',
        type: 'warning',
        confirmAction: () => this.deleteTestimonial(),
        cancelBtn: true
      }
    });
  }

  hideDialogueBox() {
    this.setState({ alert: { show: false } });
  }

  deleteTestimonial() {
    var self = this;

    deleteTestimonial(self.state.alert.objectId)
      .then(function(response) {
        if (response.status === 200) {
          self.handleDeleteSuccessResponse(response);
        } else {
          self.handleDeleteErrorResponse(response);
        }
      })
      .catch(function(error) {
        self.handleDeleteErrorResponse(error.response);
      });
  }

  handleDeleteSuccessResponse(response) {
    var self = this;

    const testimonials = self.state.testimonials.filter(
      testimonial => testimonial.id !== self.state.alert.objectId
    );

    self.setState({
      testimonials: testimonials,
      alert: {
        show: true,
        title: 'Success',
        text: response.data.message,
        type: 'success',
        confirmAction: () => self.hideDialogueBox()
      }
    });
  }

  handleDeleteErrorResponse(response) {
    var self = this;

    self.setState({
      alert: {
        show: true,
        title: response.data.message,
        text: response.data.errors[0].detail,
        type: 'warning',
        confirmAction: () => self.hideDialogueBox()
      }
    });
  }

  handleModal() {
    this.setState({ CreateShow: true });
    setTimeout(function() {
      document.getElementById('modalTestimonialDesc').style.height =
        document.getElementById('modalTestimonialDesc').scrollHeight + 'px';
    }, 1000);
    document.body.style.overflow = 'hidden';
  }

  render() {
    const { testimonials, alert } = this.state;
    var Rating = require('react-rating');
    return (
      <Col xs={12} className="testimonial-page-wrap">
        <SweetAlert
          show={alert.show || false}
          title={alert.title || ''}
          text={alert.text || ''}
          type={alert.type || 'success'}
          showCancelButton={alert.cancelBtn}
          confirmButtonText={alert.btnText}
          onConfirm={alert.confirmAction}
          onCancel={() => this.hideDialogueBox()}
        />
        {this.state.CreateShow && (
          <TestimonialPopup
            CreateShow={this.state.CreateShow}
            hideCreatePopup={this.hideCreatePopup}
            editObject={this.state.editObject}
            renderTestimonial={this.renderTestimonial}
          />
        )}
        <Col xs={12} className="filter-wrap p-none">
          <Button
            className="btn btn-orange pull-right add-testimonial-btn"
            onClick={() => this.setState({ CreateShow: true })}
          >
            <i className="add-testmonial-icon">
              <img
                src={require('../../../assets/images/admin/album/add-icon.png')}
                alt=""
              />
            </i>Add New
          </Button>
        </Col>
        <Col xs={12} className="p-none testimonial-list">
          <Col xs={12} className="testimonial-list-wrap p-none">
            {testimonials.map(testimonial => (
              <Col xs={12} className="testimonial-wrap" key={testimonial.id}>
                <Media>
                  <Media.Left align="top" className="testimonial-img-wrap">
                    <img
                      className="testimonial-thumb"
                      width={130}
                      height={130}
                      src={testimonial.photo.image}
                      alt={testimonial.photo.image_file_name}
                    />
                  </Media.Left>
                  <Media.Body className="testimonial-detail-wrap">
                    <Media.Heading className="testimonial-title">
                      {testimonial.client_name}
                    </Media.Heading>
                    <Button
                      className="btn-link p-none edit-testimonial-btn"
                      onClick={() =>
                        this.setState({
                          CreateShow: true,
                          editObject: testimonial
                        })}
                    >
                      <img
                        src={require('../../../assets/images/admin/testimonial/edit-icon.png')}
                        alt=""
                      />
                    </Button>
                    <Button
                      className="btn-link p-none edit-testimonial-btn testimonial-delete-icon"
                      onClick={event => this.showDialogueBox(testimonial.id)}
                    >
                      <img
                        src={require('../../../assets/images/admin/album/delete-icon.png')}
                        alt=""
                      />
                    </Button>
                    <div className="testimonial-detail">
                      {testimonial.message}
                    </div>
                    <Rating
                      className="testimonial-rating"
                      empty="fa fa-star-o"
                      full="fa fa-star"
                      fractions={testimonial.rating}
                      initialRate={testimonial.rating}
                      readonly={true}
                    />
                  </Media.Body>
                </Media>
              </Col>
            ))}
          </Col>
        </Col>

        <Col xs={12} className="p-none custom-pagination-wrap">
          <Pagination
            prev
            next
            ellipsis
            boundaryLinks
            items={10}
            maxButtons={3}
            activePage={this.state.activePage}
            onSelect={this.handleSelect}
            className="custom-pagination"
          />
        </Col>
      </Col>
    );
  }
}

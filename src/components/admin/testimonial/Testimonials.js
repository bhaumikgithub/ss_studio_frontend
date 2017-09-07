import React, { Component } from 'react';
import { Col, Button, Media } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';

// Import component
import TestimonialPopup from './TestimonialPopup';
import PaginationModule from '../../common/PaginationModule';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
      sortingOrder: 'desc',
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
    };
    this.handleModal = this.handleModal.bind(this);
  }

  componentWillMount() {
    this.getAllTestimonials();
  }

  getAllTestimonials(sortingOrder = this.state.sortingOrder, page = 1) {
    var self = this;

    getTestimonials({
      sorting_order: sortingOrder,
      page: page,
      per_page: window.paginationPerPage
    })
      .then(function(response) {
        var data = response.data;
        self.setState({
          testimonials: data.data.testimonials,
          meta: data.meta,
          sortingOrder: sortingOrder
        });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  handleSorting(e) {
    e.preventDefault();
    const sortingOrder = this.state.sortingOrder === 'desc' ? 'asc' : 'desc';
    this.getAllTestimonials(sortingOrder);
  }

  handlePaginationClick = eventKey => {
    if (eventKey !== this.state.meta.pagination.current_page)
      this.getAllTestimonials(undefined, eventKey);
  };

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
    var pagination = Object.assign({}, self.state.meta.pagination);
    pagination.total_count -= 1;

    if (testimonials.length === 0 && pagination.total_count > 0) {
      this.getAllTestimonials();
    }

    self.setState({
      testimonials: testimonials,
      meta: { pagination: pagination },
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

  hideCreatePopup = () => {
    this.setState({ CreateShow: false, editObject: {} });
  };

  renderTestimonial = (testimonial, action) => {
    const newTestimonials = this.state.testimonials.slice();
    var totalCount = this.state.meta.pagination.total_count;
    if (action === 'insert') {
      newTestimonials.splice(0, 0, testimonial);
      totalCount = totalCount + 1;
    } else if (action === 'replace' && !isObjectEmpty(this.state.editObject)) {
      newTestimonials.splice(
        newTestimonials.indexOf(this.state.editObject),
        1,
        testimonial
      );
    }

    this.setState({
      testimonials: newTestimonials,
      meta: { pagination: { total_count: totalCount } }
    });
  };

  handleModal() {
    this.setState({ CreateShow: true });
    setTimeout(function() {
      document.getElementById('modalTestimonialDesc').style.height =
        document.getElementById('modalTestimonialDesc').scrollHeight + 'px';
    }, 1000);
    document.body.style.overflow = 'hidden';
  }

  render() {
    const { testimonials, alert, meta, sortingOrder } = this.state;
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
          <span className="total-records pull-left">
            Total :{' '}
            <span>
              {testimonials.length + '/'}
              {meta.pagination && meta.pagination.total_count}
            </span>{' '}
            testimonials
          </span>
          <h5 className="pull-left sortBy-records">
            <a
              href=""
              title={
                sortingOrder === 'desc' ? (
                  'Sort By Ascending'
                ) : (
                  'Sort By Descending'
                )
              }
              onClick={event => this.handleSorting(event)}
            >
              Sort By :{' '}
              <span
                className={
                  sortingOrder === 'desc' ? 'fa fa-sort-asc' : 'fa fa-sort-desc'
                }
              />
            </a>
          </h5>
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
          {testimonials.length === 0 && (
            <h4 className="text-center">No testimonials available</h4>
          )}
          <ReactCSSTransitionGroup
            transitionName="page-animation"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeave={false}
          >
            {testimonials.map(testimonial => (
              <Col
                xs={12}
                className="testimonial-list-wrap p-none"
                key={testimonial.id}
              >
                <Col xs={12} className="testimonial-wrap">
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
              </Col>
            ))}
          </ReactCSSTransitionGroup>
        </Col>
        <PaginationModule
          pagination={meta.pagination}
          paginationClick={this.handlePaginationClick}
        />
      </Col>
    );
  }
}

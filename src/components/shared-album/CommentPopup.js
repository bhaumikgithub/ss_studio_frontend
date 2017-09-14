import React, { Component } from 'react';
import {
  Col,
  Button,
  Modal,
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';

// Import services
import { createComment } from '../../services/Comment';

// Import components
import validationHandler from '../common/ValidationHandler';

export default class CommentPopup extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState() {
    const initialState = {
      commentForm: {
        message: ''
      },
      comment: this.props.comment,
      photo: this.props.photo,
      errors: {}
    };
    return initialState;
  }

  resetCommentForm() {
    this.setState({ commentForm: this.getInitialState().commentForm });
  }

  handleChange(e) {
    const commentForm = this.state.commentForm;
    var key = e.target.name;
    commentForm[key] = e.target.value;
    this.setState({
      commentForm
    });
  }

  handleSubmit(e) {
    var self = this;
    const { commentForm, photo } = self.state;
    createComment({ comment: commentForm }, photo.id)
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        const errors = error.response.data.errors;
        if (errors.length > 0) {
          self.setState({ errors: validationHandler(errors) });
        } else {
          console.log(error.response);
        }
      });
  }

  handelResponse(response) {
    var responseData = response.data;
    if (response.status === 201) {
      this.resetCommentForm();
      this.props.renderComment(response.data.data.comment.id, this.state.photo);
      this.props.hideCreatePopup();
    } else {
      console.log(responseData.errors);
    }
  }

  render() {
    const { comment, errors } = this.state;
    return (
      <Modal
        show={this.props.createComment || this.props.showComment}
        className="add-comment-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="add-comment-body p-none">
          <span
            className="close-comment-modal-icon"
            onClick={this.props.hideCreatePopup}
          >
            <img
              src={require('../../assets/images/admin/album/close-icon.png')}
              alt=""
              className="hidden-xs"
            />
            <img
              src={require('../../assets/images/admin/album/close-icon-white.png')}
              alt=""
              className="visible-xs"
            />
          </span>
          <Col className="add-comment-title-wrap p-none" sm={5}>
            <Col xs={12} className="p-none add-comment-title-details">
              <img
                src={require('../../assets/images/admin/testimonial/add-testimonial-icon.png')}
                alt=""
                className="add-comment-icon img-responsive"
              />
              <h4 className="add-comment-text text-white">
                {this.props.createComment ? 'Add New Comment' : 'View Comment'}
              </h4>
            </Col>
          </Col>
          <Col className="add-comment-wrap" sm={7}>
            <form className="admin-side add-contact-form custom-form">
              {this.props.createComment && (
                <FormGroup className="custom-form-group comment-form-group">
                  <ControlLabel className="custom-form-control-label custom-label">
                    Message
                  </ControlLabel>
                  <Scrollbars style={{ height: '40px' }}>
                    <FormControl
                      id="modalTestimonialDesc"
                      className="custom-textarea"
                      componentClass="textarea"
                      placeholder="Message"
                      name="message"
                      onChange={this.handleChange.bind(this)}
                    />
                  </Scrollbars>
                  {errors['message'] && (
                    <span className="input-error text-red">
                      {errors['message']}
                    </span>
                  )}
                </FormGroup>
              )}
              {this.props.showComment && (
                <Col xs={12} className="custom-form-group comment-form-group">
                  <h3 className="custom-form-control-label custom-label">
                    Message
                  </h3>
                  <p>{comment.message}</p>
                </Col>
              )}
              {this.props.createComment && (
                <Button
                  className="btn btn-orange add-comment-submit"
                  onClick={event => this.handleSubmit(event)}
                >
                  Save
                </Button>
              )}
              <Button
                type="button"
                onClick={this.props.hideCreatePopup}
                className="btn btn-grey add-comment-cancel"
              >
                {this.props.createComment ? 'Cancel' : 'Okay'}
              </Button>
            </form>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

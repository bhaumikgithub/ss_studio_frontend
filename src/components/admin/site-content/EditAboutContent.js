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
import EditTitle from '../../../assets/images/admin/site-content/about-site-content-icon.png';
import AddTitle from '../../../assets/images/admin/site-content/add-service-icon.png';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// Import components
import validationHandler from '../../common/ValidationHandler';

// Import services
import { AboutService } from '../../../services/Index';

// Import helper
import { str2bool, isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/site-content/edit-about-content.css';

export default class EditAboutContent extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      editAboutForm: {
        title_text: '',
        description: ''
        // facebook_link: ''
        // twitter_link: '',
        // instagram_link: '',
      },
      editorState: EditorState.createEmpty(),
      errors: {}
    };
    return initialState;
  }

  resetAboutUsForm() {
    this.setState({ editAboutForm: this.getInitialState().editAboutForm });
  }

  editAboutUs(aboutUs) {
    var self = this;
    var editorState;
    const {
      title_text,
      description
      // facebook_link
      // twitter_link,
      // instagram_link,
    } = aboutUs;
    const contentBlock = htmlToDraft(description);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      editorState = EditorState.createWithContent(contentState);
    }
    self.setState({
      editAboutForm: {
        title_text: title_text,
        description: description
        // facebook_link: facebook_link
        // twitter_link: twitter_link
      },
      editorState: editorState
    });
  }

  componentWillMount() {
    var self = this;
    if (!isObjectEmpty(self.props.editObject)) {
      self.editAboutUs(self.props.editObject);
    }
  }

  handleChange(e) {
    const editAboutForm = this.state.editAboutForm;
    var key = e.target.name;
    editAboutForm[key] = str2bool(e.target.value);
    this.setState({
      editAboutForm
    });
  }
  onEditorStateChange = editorState => {
    const editAboutForm = this.state.editAboutForm;
    editAboutForm['description'] = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    this.setState({
      editorState,
      editAboutForm
    });
  };
  handleSubmit(e) {
    var self = this;
    if (self.state.editAboutForm.description === '<p></p>\n') {
      self.state.editAboutForm.description = '';
    }
    var editParams = {
      about: self.state.editAboutForm
    };
    if(isObjectEmpty(self.props.editObject))
    {
      AboutService.createAboutUs(editParams)
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
    else{
      AboutService.updateAboutUs(editParams)
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
  }

  handelResponse(response) {
    var responseData = response.data;
    console.log(responseData);
    if (response.status === 201) {
      this.resetAboutUsForm();
      this.props.renderAboutUs(responseData.data.about_us);
      this.props.EditAboutClose();
    } else {
      console.log(responseData.errors);
    }
  }

  render() {
    const { editAboutForm, errors, editorState } = this.state;
    return (
      <Modal
        show={this.props.EditAboutShow}
        bsSize="large"
        className="edit-about-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="edit-about-body p-none">
          <span
            className="close-modal-icon"
            onClick={this.props.EditAboutClose}
          >
            <img
              src={require('../../../assets/images/admin/site-content/close-icon.png')}
              alt=""
              className="hidden-xs"
            />
            <img
              src={require('../../../assets/images/admin/site-content/close-icon-white.png')}
              alt=""
              className="visible-xs"
            />
          </span>

          <Col className="edit-about-title-wrap p-none" sm={4}>
            <Col xs={12} className="p-none edit-about-title-details">
              <img
                src={isObjectEmpty(this.props.editObject) ? AddTitle : EditTitle}
                alt=""
                className="edit-about-icon img-responsive"
              />
              <h4 className="edit-about-text text-white">About Us Details</h4>
            </Col>
          </Col>
          <Col className="edit-about-content-wrap" sm={8}>
            <form className="admin-side edit-about-form custom-form">
              <FormGroup className="custom-form-group">
                <ControlLabel className="custom-form-control-label required">
                  Title
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  placeholder="Enter Title"
                  name="title_text"
                  value={editAboutForm.title_text}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['title_text'] && (
                  <span className="input-error text-red">
                    {errors['title_text']}
                  </span>
                )}
              </FormGroup>
              <FormGroup className="custom-form-group">
                <ControlLabel className="custom-form-control-label required">
                  Description
                </ControlLabel>
                <Editor
                  defaultEditorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
                  toolbar={{ options: ['inline', 'list', 'textAlign', 'link', 'remove'],
                  inline: {
                    options: ['bold', 'italic', 'underline', 'strikethrough'],
                  },
                  link: {
                    options: ['link']
                  },}}
                />
                <Scrollbars style={{ height: '40px' }}>
                  <FormControl
                    id="modalAboutDesc"
                    className="custom-form-control editabouttxtarea"
                    componentClass="hidden"
                    placeholder="We are Capture Best Moments which is impossible to recapture.. Wedding Photography, Wedding Videography , Candid Photography, Birthday Party, Candid Video, Short Film, Wedding Highlights , Portrait Songs , Pre Wedding Songs , Model Photography , Indoor/outdoor Photography , Product Photography , Making Brochure Design , etc..."
                    name="description"
                    value={editAboutForm.description}
                    onChange={this.handleChange.bind(this)}
                  />
                </Scrollbars>
                {errors['description'] && (
                  <span className="input-error text-red">
                    {errors['description']}
                  </span>
                )}
              </FormGroup>
              {/* <FormGroup className="custom-form-group">
                <ControlLabel className="custom-form-control-label">
                  Facebook Profile
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  placeholder="https://www.facebook.com/sagarphotocam/?pnref=lhc"
                  name="facebook_link"
                  value={editAboutForm.facebook_link}
                  onChange={this.handleChange.bind(this)}
                />
              </FormGroup> */}
              {/* <FormGroup className="custom-form-group">
                    <ControlLabel className="custom-form-control-label">Twitter Profile</ControlLabel>
                    <FormControl 
                      className="custom-form-control" 
                      type="text" 
                      placeholder="https://www.twitter.com/sagarphotocam/" 
                      name="twitter_link" 
                      value={editAboutForm.twitter_link}
                      onChange={this.handleChange.bind(this)} />
                </FormGroup>  */}

              <Button
                className="btn btn-orange edit-about-submit"
                onClick={event => this.handleSubmit(event)}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={this.props.EditAboutClose}
                className="btn btn-grey edit-about-cancel"
              >
                Cancel
              </Button>
            </form>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

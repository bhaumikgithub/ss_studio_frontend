import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Col,
  Button,
  Modal,
  Radio,
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import Select from 'react-select';

// Import icon
import createAlbumIcon from '../../../assets/images/admin/album/create-album/add-album-icon.png';
import editAlbumIcon from '../../../assets/images/admin/album/create-album/edit-album-icon.png';

// Import components
import validationHandler from '../../common/ValidationHandler';

// Import services
import { AlbumService, CategoryService } from '../../../services/Index';

// Import helper
import { toCapitalize, str2bool, isObjectEmpty } from '../../Helper';

// Import css
import 'react-select/dist/react-select.min.css';
import '../../../assets/css/admin/album/create-album/create-album.css';

export default class AlbumPopup extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      albumForm: {
        album_name: '',
        is_private: true,
        status: 'active',
        category_ids: [],
        category_options: [],
        portfolio_visibility: false
      },
      categories: [],
      errors: {}
    };

    return initialState;
  }

  resetAlbumForm() {
    this.setState({ albumForm: this.getInitialState().albumForm });
  }

  componentWillMount() {
    var self = this;

    CategoryService.getCategories()
      .then(function(response) {
        var data = response.data;
        self.setState({ categories: data.data.categories });
      })
      .catch(function(error) {
        console.log(error.response);
      });

    if (!isObjectEmpty(self.props.editObject)) {
      self.editAlbum(self.props.editObject);
    }
  }

  editAlbum(album) {
    var self = this;
    const {
      album_name,
      is_private,
      status,
      portfolio_visibility,
      categories
    } = album;

    self.setState({
      albumForm: {
        album_name: album_name,
        is_private: is_private,
        status: status,
        category_options: self.categoryOptions(categories),
        portfolio_visibility: portfolio_visibility
      }
    });
  }

  categoryOptions(categories = this.state.categories) {
    var options = [];
    categories.map(category => {
      return options.push({
        value: category.id,
        label: toCapitalize(category.category_name)
      });
    });
    return options;
  }

  handleChange(e) {
    const albumForm = this.state.albumForm;
    var key = e.target.name;
    albumForm[key] = str2bool(e.target.value);
    this.setState({
      albumForm
    });
  }

  handleMultiSelectChange(value) {
    const albumForm = this.state.albumForm;
    albumForm['category_options'] = value;
    albumForm['category_ids'] = [];
    value.map(value => albumForm['category_ids'].push(value.value));
    this.setState({
      albumForm
    });
  }

  handleSubmit(e) {
    var self = this;
    var callAlbumApi = () => {};

    if (isObjectEmpty(self.props.editObject)) {
      var createParams = { album: self.state.albumForm };
      callAlbumApi = AlbumService.createAlbum(createParams);
    } else {
      var editParams = {
        id: self.props.editObject.id,
        albumForm: { album: self.state.albumForm }
      };
      callAlbumApi = AlbumService.updateAlbum(editParams);
    }

    callAlbumApi
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
      this.resetAlbumForm();
      this.props.renderAlbum(
        responseData.data.album,
        isObjectEmpty(this.props.editObject) ? 'insert' : 'replace'
      );
      this.props.hideCreatePopup();
    } else {
      console.log(responseData.errors);
    }
  }

  render() {
    const { albumForm, errors } = this.state;
    return (
      <Modal
        show={this.props.showCreatePopup}
        bsSize="large"
        className="create-new-album-modal"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="create-album-body p-none">
          <span
            className="close-modal-icon"
            onClick={this.props.hideCreatePopup}
          >
            <img
              src={require('../../../assets/images/admin/album/create-album/close-icon.png')}
              alt=""
            />
          </span>
          <Col className="create-title-wrap p-none" sm={4}>
            <Col xs={12} className="p-none create-album-title-details">
              <img
                src={
                  isObjectEmpty(this.props.editObject)
                    ? createAlbumIcon
                    : editAlbumIcon
                }
                alt=""
                className="create-album-icon img-responsive"
              />
              <h4 className="create-album-text text-white">
                {isObjectEmpty(this.props.editObject)
                  ? 'Create new album'
                  : 'Edit album'}
              </h4>
            </Col>
          </Col>
          <Col className="create-content-wrap" sm={8}>
            <form className="admin-side create-album-form custom-form">
              <FormGroup className="custom-form-group">
                <ControlLabel className="custom-form-control-label required">
                  album name
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  name="album_name"
                  value={albumForm.album_name}
                  onChange={this.handleChange.bind(this)}
                />
                {errors['album_name'] && (
                  <span className="input-error text-red">
                    {errors['album_name']}
                  </span>
                )}
              </FormGroup>

              <FormGroup className="custom-form-group">
                <ControlLabel className="custom-form-control-label">
                  privacy level
                </ControlLabel>
                <br />
                <span className="custom-radio-wrap">
                  <Radio
                    name="is_private"
                    inline
                    value={false}
                    checked={!albumForm.is_private}
                    onChange={this.handleChange.bind(this)}
                  >
                    PUBLIC <small>( Without Password )</small>
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Radio>
                </span>{' '}
                <span className="custom-radio-wrap">
                  <Radio
                    name="is_private"
                    inline
                    value={true}
                    checked={albumForm.is_private}
                    onChange={this.handleChange.bind(this)}
                  >
                    PRIVATE <small>( Password Protected )</small>
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Radio>
                </span>
              </FormGroup>

              <FormGroup className="custom-form-group">
                <ControlLabel className="custom-form-control-label">
                  Activity level
                </ControlLabel>
                <br />
                <span className="custom-radio-wrap">
                  <Radio
                    name="status"
                    inline
                    value="active"
                    checked={albumForm.status === 'active'}
                    onChange={this.handleChange.bind(this)}
                  >
                    ACTIVE <small>( Will be published )</small>
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Radio>
                </span>{' '}
                <span className="custom-radio-wrap">
                  <Radio
                    name="status"
                    inline
                    value="inactive"
                    checked={albumForm.status === 'inactive'}
                    onChange={this.handleChange.bind(this)}
                  >
                    INACTIVE <small>( Will be Draft )</small>
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Radio>
                </span>
              </FormGroup>

              <FormGroup controlId="formControlsSelect" className="custom-form-group">
                <ControlLabel className="custom-form-control-label required">
                  Categories
                </ControlLabel>
                <Select
                  className="custom-form-control"
                  name="category_options"
                  value={albumForm.category_options}
                  options={this.categoryOptions()}
                  placeholder="Select categories"
                  multi={true}
                  onChange={this.handleMultiSelectChange.bind(this)}
                />
                {errors['category_ids'] && (
                  <span className="input-error text-red">
                    {errors['category_ids']}
                  </span>
                )}
              </FormGroup>
              <FormGroup className="custom-form-group">
                <Link to={'/categories'}>
                    {'Click here to add More Categories'}
                </Link>
              </FormGroup>
              {!albumForm.is_private && (
                <FormGroup className="custom-form-group">
                  <ControlLabel className="custom-form-control-label">
                    Should be visible on portfolio ?
                  </ControlLabel>
                  <br />
                  <span className="custom-radio-wrap">
                    <Radio
                      name="portfolio_visibility"
                      inline
                      value={true}
                      checked={albumForm.portfolio_visibility}
                      onChange={this.handleChange.bind(this)}
                    >
                      YES
                      <div className="check">
                        <div className="inside" />
                      </div>
                    </Radio>
                  </span>{' '}
                  <span className="custom-radio-wrap">
                    <Radio
                      name="portfolio_visibility"
                      inline
                      value={false}
                      checked={!albumForm.portfolio_visibility}
                      onChange={this.handleChange.bind(this)}
                    >
                      NO
                      <div className="check">
                        <div className="inside" />
                      </div>
                    </Radio>
                  </span>
                </FormGroup>
              )}

              <Button
                className="btn btn-orange create-album-submit"
                onClick={event => this.handleSubmit(event)}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={this.props.hideCreatePopup}
                className="btn btn-grey create-album-cancel"
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

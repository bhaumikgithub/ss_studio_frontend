import React, { Component } from 'react';
import { Col, Button, Modal, Radio,ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

// Import icon
import createTitle from '../../../assets/images/admin/category/add-category-icon.png';
import editTitle from '../../../assets/images/admin/category/edit-category-icon.png';

// Import services
import { createCategory, updateCategory } from '../../../services/admin/Category';

// Import helper
import { str2bool, isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/category/add-category/add-category.css';


export default class CategoryPopup extends Component {
  constructor(props){
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      categoryForm: {
        category_name: '',
        status: 'active'
      }

    };

    return initialState;
  }

  handleChange(e) {
    const categoryForm = this.state.categoryForm;
    var key = e.target.name;
    categoryForm[key] = str2bool(e.target.value);
    this.setState({
      categoryForm
    });
  }

  handleSubmit(e) {
    var self = this;
    var callCategoryApi = () => {};
    if (isObjectEmpty(self.props.editObject)) {
      var createParams = { category: self.state.categoryForm };
      callCategoryApi = createCategory(createParams);
    } else {
      var editParams = {
        id: self.props.editObject.id,
        categoryForm: { category: self.state.categoryForm }
      };
      callCategoryApi = updateCategory(editParams);
    }

    callCategoryApi
    .then(function(response) {
      self.handelResponse(response);
    })
    .catch(function(error) {
      console.log(error.response);
    });

  }

  handelResponse(response) {
    var responseData = response.data;
    console.log(responseData)
    if (response.status === 201) {
      this.resetcategoryForm();
      this.props.renderCategory(
        responseData.data.category,
        isObjectEmpty(this.props.editObject) ? 'insert' : 'replace'
      );
      this.props.closeOn();
    } else {
      console.log(responseData.errors);
    }
  }

  resetcategoryForm() {
    this.setState({ categoryForm: this.getInitialState().categoryForm });
  }

  editCategory(contact) {
    var self = this;
    console.log(self)
    const {
      category_name,
      status
    } = contact;

    self.setState({
      categoryForm: {
        category_name: category_name,
        status: status
      }
    });
  }

  componentWillMount() {
    var self = this;
    console.log(self)

    if (!isObjectEmpty(self.props.editObject)) {
      self.editCategory(self.props.editObject);
    }
  }

  updateState(element) {
    this.setState({value: element});
  }  

  render() {
    const { categoryForm } = this.state;
   
    return (
      <Modal show={this.props.showCreate}
              className="add-category-modal" 
              aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="add-category-body p-none">
        
          <span className="close-modal-icon" 
                onClick={this.props.closeOn}>
            <img src={require('../../../assets/images/admin/category/close-icon.png')} className="hidden-xs" alt=""/>
            <img src={require('../../../assets/images/admin/category/close-icon-white.png')} className="visible-xs" alt=""/>             
          </span>
          <Col className="add-title-wrap p-none" sm={5}>
                <Col xs={12} className="p-none add-category-title-details">
                  <img 
                    src={
                      isObjectEmpty(this.props.editObject)
                        ? createTitle
                        : editTitle
                    } 
                    alt="" 
                    className="add-category-icon img-responsive" 
                  />
                  <h4 
                    className="add-category-text text-white">
                    {isObjectEmpty(this.props.editObject)
                        ? 'Create New Category'
                        : 'Edit Category'}
                  </h4>
                </Col>
          </Col>
          <Col className="add-content-wrap" sm={7}>
            
            <form className="create-album-form custom-form">
                <FormGroup className="custom-form-group required">
                  <ControlLabel className="custom-form-control-label">
                    Category name
                  </ControlLabel>
                  <FormControl 
                    className="custom-form-control" 
                    type="text" 
                    name="category_name"
                    placeholder="category name"
                    value={categoryForm.category_name}
                    onChange={this.handleChange.bind(this)}
                   />
                </FormGroup>
                
                <FormGroup className="custom-form-group">
                    <ControlLabel className="custom-form-control-label">
                      Activity level
                    </ControlLabel>
                    <br/>
                    <span className="custom-radio-wrap">
                      <Radio 
                        name="status" 
                        inline 
                        value="active"
                        checked={categoryForm.status === 'active'}
                        onChange={this.handleChange.bind(this)}>
                        Active 
                        <div className="check">
                            <div className="inside"></div>
                        </div>
                      </Radio>
                    </span>  
                    {' '}
                    <span className="custom-radio-wrap">
                      <Radio 
                        name="status" 
                        inline 
                        value="inactive"
                        checked={categoryForm.status === 'inactive'}
                        onChange={this.handleChange.bind(this)}>
                        Inactive
                        <div className="check">
                            <div className="inside"></div>
                        </div>
                        </Radio>
                    </span>
                </FormGroup>

                <Button 
                  className="btn btn-orange add-category-submit"
                  onClick={event => this.handleSubmit(event)}
                >
                  Save
                </Button>
                <Button 
                  type="button" 
                  onClick={this.props.closeOn} 
                  className="btn btn-grey add-category-cancel"
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

import React, { Component } from 'react';
import { Col, Button, Table, Pagination } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';

// Import component
import CategoryPopup from './CategoryPopup';

// Import services
import { getCategories, deleteCategory } from '../../../services/admin/Category';

// Import helper
import { isObjectEmpty } from '../../Helper';

//import css
import '../../../assets/css/admin/category/categories.css';
import '../../../assets/css/developer.css';

export default class Categories extends Component {
  constructor(props){
    super(props);
    this.state = {
      editObject: {},
      open: false,
      activePage: 3,
      CreateShow:false,
      categories: [],
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
  }
  
  componentWillMount() {
    var self = this;
    
    getCategories()
    .then(function(response) {
      var data = response.data;
      self.setState({ categories: data.data.categories, meta: data.meta });
    })
    .catch(function(error) {
      console.log(error.response);
    });
  }

  showDialogueBox(id) {
    this.setState({
      alert: {
        objectId: id,
        show: true,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        btnText: 'Yes, delete it!',
        type: 'warning',
        confirmAction: () => this.deleteCategory(),
        cancelBtn: true
      }
    });
  }
  
  
  deleteCategory() {
    var self = this;

    deleteCategory(self.state.alert.objectId)
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
    const categories = self.state.categories.filter(
      album => album.id !== self.state.alert.objectId
    );
    
    self.setState({
      categories: categories,
      
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
  
  getStatusClass(status) {
    if (status === 'inactive') {
      return 'text-red';
    }else {
      return 'text-green';
    }
  }

  hideDialogueBox() {
    this.setState({ alert: { show: false } });
  }

  renderCategory = (category, action) => {
    const newcategories = this.state.categories.slice();
   
    if (action === 'insert') {
      newcategories.splice(0, 0, category);
     
    } else if (action === 'replace' && !isObjectEmpty(this.state.editObject)) {
      newcategories.splice(newcategories.indexOf(this.state.editObject), 1, category);
    }

    this.setState({
      categories: newcategories
    });
  };

  renderUpdateCategory = category => {};

  CreateClose = () => this.setState({ CreateShow: false, editObject: {} });


  handleSelect(eventKey, e) {      
    this.setState({
        activePage: eventKey
    });
  }

  render() {
    const { categories, alert } = this.state;
    return (
      <Col xs={12} className="categories-page-wrap">
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
        {this.state.CreateShow &&
          <CategoryPopup 
            showCreate={this.state.CreateShow} 
            closeOn={this.CreateClose}
            editObject={this.state.editObject}
            renderCategory={this.renderCategory}
          />
        }
     
        <Col xs={12} className="filter-wrap p-none">
            <Col xs={12} className="p-none">                
                {/* <Button className="btn pull-right btn-orange add-new-btn" onClick={()=>this.setState({ CreateShow: true })}> 
                    <i className="add-icon">
                        <img src={require('../../../assets/images/admin/album/add-icon.png')} alt=""/>       
                    </i>Add New
                </Button> */}
            </Col>
        </Col>
        <Col xs={12} className="p-none">
            <div className="categories-table-wrap">
            <Table responsive className="categories-table">
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {categories.map(category =>
                    <tr>
                        <td>{category.category_name}</td>
                        <td className={                          
                          this.getStatusClass(category.status)
                        }> 
                          {category.status}
                        </td>
                        <td>
                          <a className="edit-icon" onClick={() =>
                            this.setState({
                              CreateShow: true,
                              editObject: category
                            })}>
                                <img src={require('../../../assets/images/admin/category/edit-icon.png')} alt=""/>
                            </a>
                            <img className="seprator" src={require('../../../assets/images/admin/category/seprator.png')} alt=""/>                            
                            <a className="del_butn" onClick={event => this.showDialogueBox(category.id)}>                            
                                <img src={require('../../../assets/images/admin/category/delete-icon.png')} alt=""/>                            
                            </a>
                        </td>
                    </tr>
                )}

                                        
                </tbody>
            </Table>
            </div>
        </Col>
        
        <Col xs={12} className="p-none custom-pagination-wrap">
            <Pagination prev next ellipsis boundaryLinks items={10} maxButtons={3} activePage={this.state.activePage} onSelect={this.handleSelect} className="custom-pagination"/>
        </Col>
      </Col>
    );
  }
}

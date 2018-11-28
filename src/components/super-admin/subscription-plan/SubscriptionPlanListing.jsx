import React, { Component } from 'react';
import { Col, Table, Button } from 'react-bootstrap';

// Import component
import SweetAlert from 'sweetalert-react';
import PaginationModule from '../../common/PaginationModule';
// import UserPopup from './UserPopup';
import CreateSubscriptionPopup from './CreateSubscriptionPopup';
import FlashMassage from 'react-flash-message';
// Import services
import { UserService, PackageService } from '../../../services/Index';

// Import helper
import { isObjectEmpty, currentUserRole, fullName } from '../../Helper';

// Import css
import '../../../assets/css/admin/category/categories.css';

export default class UserListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editObject: {},
      open: false,
      activePage: 3,
      CreateShow: false,
      createPopup: false,
      showFlashMessage: false,
      users: [],
      packages: [],
      meta: [],
      current_page: '',
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
    this.getAllPackages();
    
  }

  getAllPackages(page = 1){
    var self = this;
    PackageService.getPackages({
      page: page,
      per_page: window.paginationPerPage
    }).then(function(response) {
      var data = response.data;
      self.setState({ packages: data.data.packages, meta: data.meta });
    })
    .catch(function(error) {
      console.log(error.response);
      if (error.response.status === 401)
      {
        self.props.history.push('albums')
      }
    });
  }
    getAllUsers(page = 1){
      var self = this;
      UserService.getUsers({
        page: page,
        per_page: window.paginationPerPage,
        role: currentUserRole()
      }).then(function(response) {
          var data = response.data;
          self.setState({ users: data.data.users, meta: data.meta });
        })
        .catch(function(error) {
          console.log(error.response);
          if (error.response.status === 401)
          {
            self.props.history.push('albums')
          }
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
        confirmAction: () => this.deleteUser(),
        cancelBtn: true
      }
    });
  }

  deleteUser() {
    var self = this;

    PackageService.deletePackage(self.state.alert.objectId)
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
    const packages = self.state.packages.filter(
      user => user.id !== self.state.alert.objectId
    );

    self.setState({
      packages: packages,

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
    } else if(status === 'active') {
      return 'text-green';
    }
    else{
      return 'text-blue'
    }
  }

  hideDialogueBox() {
    this.setState({ alert: { show: false } });
  }

  renderPackage = (pkg, action) => {
    debugger;
    const newPackages = this.state.packages.slice();
   if (action === 'replace' && !isObjectEmpty(this.state.editObject)) {
      newPackages.splice(
        newPackages.indexOf(this.state.editObject),
        1,
        pkg
      );
    }
    else if(action === 'insert'){
      newPackages.splice(
        0,
        0,
        pkg
      );
      this.setState({showFlashMessage: true})
    }

    this.setState({
      packages: newPackages
    });
  };

  renderUpdateCategory = category => {};

  CreateClose = () => this.setState({ CreateShow: false, editObject: {} });

  closeCreatePopup = () => this.setState({ createPopup: false, editObject: {} })

  handleSelect(eventKey, e) {
    this.setState({
      activePage: eventKey
    });
  }

  handlePaginationClick = eventKey => {
    if (eventKey !== this.state.meta.pagination.current_page)
      this.getAllUsers(eventKey);
  };
  render() {
    const { users, packages, meta, alert } = this.state;
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
        {/* {this.state.CreateShow && (
          <UserPopup 
            showCreate={this.state.CreateShow}
            closeOn={this.CreateClose}
            editObject={this.state.editObject}
            renderUser={this.renderUser}
          />
        )} */}
        {this.state.createPopup && (
          <CreateSubscriptionPopup
            createPopup={this.state.createPopup}
            closeOn={this.closeCreatePopup}
            renderPackage={this.renderPackage}
            editObject={this.state.editObject}
          />
        )}
        <Col xs={12} className="filter-wrap p-none">
          {this.state.showFlashMessage &&
            <span className="pull-left">
            <FlashMassage duration={5000} persistOnHover={true}>
              <p className="user-flash-message">Successfully package created.</p>
            </FlashMassage>
            </span>
          }
          <Button
            className="btn pull-right btn-orange add-new-btn"
            onClick={() => this.setState({ createPopup: true })}
          >
            <i className="add-icon">
              <img src={require('../../../assets/images/admin/album/add-icon.png')} alt=""/>
            </i>Add New
          </Button>
        </Col>
        <Col xs={12} className="p-none">
          <div className="categories-table-wrap">
            <Table responsive className="categories-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Duration</th>
                  <th>Amount</th>
                  <th>Default</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map(pkg => (
                  <tr key={pkg.id}>
                    <td>{pkg.name}</td>
                    <td>{pkg.duration}</td>
                    <td>{pkg.price}</td>
                    <td>{pkg.is_default? 'Yes' : 'No'}</td>
                    <td>{pkg.status}</td>
                    <td>
                      <a
                        className="edit-icon"
                        onClick={() =>
                          this.setState({
                            createPopup: true,
                            editObject: pkg
                          })}
                      >
                        <img
                          src={require('../../../assets/images/admin/category/edit-icon.png')}
                          alt=""
                        />
                      </a>
                      <a
                        className="edit-icon user-delete-icon"
                        onClick={() => this.showDialogueBox(pkg.id)}
                      >
                        <img
                          src={require('../../../assets/images/admin/album/delete-icon.png')}
                          alt=""
                        />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
        <PaginationModule
          pagination={meta.pagination}
          paginationClick={this.handlePaginationClick}
        />
      </Col>
    );
  }
}

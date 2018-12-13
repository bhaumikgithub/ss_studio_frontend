import React, { Component } from 'react';
import { Col, Table, Button } from 'react-bootstrap';

// Import component
import SweetAlert from 'sweetalert-react';
import PaginationModule from '../../common/PaginationModule';
import UserPopup from './UserPopup';
import CreateUserPopup from './CreateUserPopup';
import FlashMassage from 'react-flash-message';
// Import services
import { UserService } from '../../../services/Index';

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
    this.getAllUsers();
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

    UserService.deleteUser(self.state.alert.objectId)
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
    const users = self.state.users.filter(
      user => user.id !== self.state.alert.objectId
    );

    self.setState({
      users: users,

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

  renderUser = (user, action) => {
    const newUsers = this.state.users.slice();

   if (action === 'replace' && !isObjectEmpty(this.state.editObject)) {
      newUsers.splice(
        newUsers.indexOf(this.state.editObject),
        1,
        user
      );
    }
    else if(action === 'insert'){
      newUsers.splice(
        0,
        0,
        user
      );
      this.setState({showFlashMessage: true})
    }

    this.setState({
      users: newUsers
    });
  };

  renderUpdateCategory = category => {};

  CreateClose = () => this.setState({ CreateShow: false, editObject: {} });

  closeCreatePopup = () => this.setState({ createPopup: false })

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
    const { users, meta, alert } = this.state;
    console.log(users,'.........................index')
    debugger
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
        {this.state.CreateShow && (
          <UserPopup 
            showCreate={this.state.CreateShow}
            closeOn={this.CreateClose}
            editObject={this.state.editObject}
            renderUser={this.renderUser}
          />
        )}
        {this.state.createPopup && (
          <CreateUserPopup
            createPopup={this.state.createPopup}
            closeOn={this.closeCreatePopup}
            renderUser={this.renderUser}
          />
        )}
        <Col xs={12} className="filter-wrap p-none">
          {this.state.showFlashMessage &&
            <span className="pull-left">
            <FlashMassage duration={5000} persistOnHover={true}>
              <p className="user-flash-message">Successfully Photographer account created.</p>
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
                  <th>Email</th>
                  <th>Alias</th>
                  <th>Name</th>
                  <th>User Type</th>
                  <th>Phone</th>
                  <th>Plan</th>
                  <th>Signup Date</th>
                  <th>Start date</th>
                  <th>End date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.alias}</td>
                    <td>{fullName(user)}</td>
                    <td>{user.user_type}</td>
                    <td>{user.phone}</td>
                    <td>{user.active_plan}</td>
                    <td>{user.created_at}</td>
                    <td>{user.start_plan_date}</td>
                    <td>{user.end_plan_date}
                    </td>
                    <td className={this.getStatusClass(user.status)}>
                      {user.status === 'subscription_expire' ? 'expired' : user.status }
                    </td>
                    <td>
                      <a
                        className="edit-icon"
                        onClick={() =>
                          this.setState({
                            CreateShow: true,
                            editObject: user
                          })}
                      >
                        <img
                          src={require('../../../assets/images/admin/category/edit-icon.png')}
                          alt=""
                        />
                      </a>
                      <a
                        className="edit-icon user-delete-icon"
                        onClick={() => this.showDialogueBox(user.id)}
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

import React, { Component } from 'react';
import { Col, Button, Media } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';

// Import component
import ContactPopup from './ContactPopup';
import PaginationModule from '../../common/PaginationModule';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import GoogleLoginModule from '../../common/GoogleLoginModule';

// Import services
import { ContactService } from '../../../services/Index';

// Import helper
import { isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/contact/contacts.css';

export default class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editObject: {},
      open: false,
      activePage: 3,
      CreateShow: false,
      sortingOrder: 'desc',
      contacts: [],
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
    this.getAllContacts();
  }

  getAllContacts(sortingOrder = this.state.sortingOrder, page = 1) {
    var self = this;
    ContactService.getContacts({
      sorting_order: sortingOrder,
      page: page,
      per_page: window.paginationPerPage
    })
      .then(function(response) {
        var data = response.data;
        self.setState({
          contacts: data.data.contacts,
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
    this.getAllContacts(sortingOrder);
  }

  handlePaginationClick = eventKey => {
    if (eventKey !== this.state.meta.pagination.current_page)
      this.getAllContacts(undefined, eventKey);
  };

  importGoogleContacts = response => {
    console.log(response);
  };

  showDialogueBox(id) {
    this.setState({
      alert: {
        objectId: id,
        show: true,
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        btnText: 'Yes, delete it!',
        type: 'warning',
        confirmAction: () => this.deleteContact(),
        cancelBtn: true
      }
    });
  }

  deleteContact() {
    var self = this;
    ContactService.deleteContact(self.state.alert.objectId)
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
    const contacts = self.state.contacts.filter(
      contact => contact.id !== self.state.alert.objectId
    );
    var pagination = Object.assign({}, self.state.meta.pagination);
    pagination.total_count -= 1;

    if (contacts.length === 0 && pagination.total_count > 0) {
      this.getAllContacts();
    }
    self.setState({
      contacts: contacts,
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

  hideDialogueBox() {
    this.setState({ alert: { show: false } });
  }

  renderContact = (contact, action) => {
    const newcontacts = this.state.contacts.slice();
    var totalCount = this.state.meta.pagination.total_count;

    if (action === 'insert') {
      newcontacts.splice(0, 0, contact);
      totalCount = totalCount + 1;
    } else if (action === 'replace' && !isObjectEmpty(this.state.editObject)) {
      newcontacts.splice(
        newcontacts.indexOf(this.state.editObject),
        1,
        contact
      );
    }

    this.setState({
      contacts: newcontacts,
      meta: { pagination: { total_count: totalCount } }
    });
  };

  renderUpdateContact = contact => {};

  CreateClose = () => this.setState({ CreateShow: false, editObject: {} });

  handleSelect(eventKey, e) {
    this.setState({
      activePage: eventKey
    });
  }

  render() {
    const { contacts, alert, meta, sortingOrder } = this.state;

    return (
      <Col xs={12} className="contacts-page-wrap">
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
          <ContactPopup
            showCreate={this.state.CreateShow}
            closeOn={this.CreateClose}
            editObject={this.state.editObject}
            renderContact={this.renderContact}
          />
        )}
        <Col xs={12} className="filter-wrap p-none">
          <span className="total-records pull-left">
            Total :{' '}
            <span>
              {contacts.length + '/'}
              {meta.pagination && meta.pagination.total_count}
            </span>{' '}
            contacts
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
            className="pull-right btn btn-orange add-new-btn"
            onClick={() => this.setState({ CreateShow: true })}
          >
            <i className="add-album-icon">
              <img
                src={require('../../../assets/images/admin/album/add-icon.png')}
                alt=""
              />
            </i>Add New
          </Button>
          <GoogleLoginModule
            buttonText="Import google contacts"
            afterResponse={this.importGoogleContacts}
          />
        </Col>
        <div className="contact-list-wrap">
          {contacts.length === 0 && (
            <h4 className="text-center">No contacts available</h4>
          )}
          <ReactCSSTransitionGroup
            transitionName="page-animation"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeave={false}
          >
            {contacts.map(contact => (
              <Col xs={12} className="p-none contact-list" key={contact.id}>
                {/*alphabet wise block*/}
                <span className="contact-char"> </span>
                {/*alphabet wise block*/}
                <Col xs={12} className="contact-list-wrap p-none">
                  <Col xs={12} className="contact-wrap">
                    <Media className="single-contact">
                      <Media.Left align="top" className="contact-img-wrap">
                        {contact.photo && (
                          <img
                            className="contact-thumb"
                            src={contact.photo.image}
                            alt={contact.photo.image_file_name}
                          />
                        )}
                      </Media.Left>
                      <Media.Body className="contact-detail-wrap">
                        <Media.Heading className="contact-name">
                          {contact.full_name}
                        </Media.Heading>
                        <div className="contact-detail">
                          <div className="contact-info call-detail">
                            <img
                              src={require('../../../assets/images/admin/contact/call-icon-bg.png')}
                              alt=""
                            />
                            <a
                              href={'callto:' + contact.phone}
                              className="call-num"
                            >
                              {contact.phone}
                            </a>
                          </div>
                          <div className="contact-info mail-detail">
                            <img
                              src={require('../../../assets/images/admin/contact/mail-icon-bg.png')}
                              alt=""
                            />
                            <a href={'mailto:' + contact.email}>
                              {contact.email}
                            </a>
                          </div>
                        </div>
                        <div className="action-wrapper">
                          <Button
                            className="btn-link p-none contact-action-btn contact-edit-btn"
                            onClick={() =>
                              this.setState({
                                CreateShow: true,
                                editObject: contact
                              })}
                          >
                            <img
                              src={require('../../../assets/images/admin/album/edit-icon.png')}
                              alt=""
                            />
                          </Button>
                          <img
                            src={require('../../../assets/images/admin/contact/seprator.png')}
                            alt=""
                            className="vertical-seprator"
                          />
                          <Button
                            className="btn-link p-none contact-action-btn contact-delete-btn"
                            onClick={event => this.showDialogueBox(contact.id)}
                          >
                            <img
                              src={require('../../../assets/images/admin/album/delete-icon.png')}
                              alt=""
                            />
                          </Button>
                        </div>
                      </Media.Body>
                    </Media>
                    {/*<Col xs={12} className="p-none contact-separator">
                  <hr/>
                </Col> */}
                  </Col>
                </Col>
              </Col>
            ))}
          </ReactCSSTransitionGroup>
        </div>
        <PaginationModule
          pagination={meta.pagination}
          paginationClick={this.handlePaginationClick}
        />
      </Col>
    );
  }
}

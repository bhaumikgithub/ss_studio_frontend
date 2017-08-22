import React, { Component } from 'react';
import { Col, Button, Media, Pagination } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';

// Import component
import ContactPopup from './ContactPopup'
// Import services
import { getContacts, deleteContact } from '../../../services/admin/Contacts';

// Import helper
import { isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/contact/contacts.css'


export default class Contacts extends Component {
  constructor(props){
    super(props);
    this.state = {
      editObject: {},
      open: false,
      activePage: 3,
      CreateShow:false,
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
    }
  }

  componentWillMount() {
    var self = this;

    getContacts()
      .then(function(response) {
        var data = response.data;
        self.setState({ contacts: data.data.contacts, meta: data.meta });
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
        confirmAction: () => this.deleteContact(),
        cancelBtn: true
      }
    });
  }

  deleteContact() {
    var self = this;
    deleteContact(self.state.alert.objectId)
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
      album => album.id !== self.state.alert.objectId
    );

    self.setState({
      contacts: contacts,
     
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
   
    if (action === 'insert') {
      newcontacts.splice(0, 0, contact);
     
    } else if (action === 'replace' && !isObjectEmpty(this.state.editObject)) {
      newcontacts.splice(newcontacts.indexOf(this.state.editObject), 1, contact);
    }

    this.setState({
      contacts: newcontacts
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
    const { contacts, alert } = this.state;

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
      {this.state.CreateShow &&
      <ContactPopup 
        showCreate={this.state.CreateShow} 
        closeOn={this.CreateClose} 
        editObject={this.state.editObject}
        renderContact={this.renderContact}
      />}      
      <Col xs={12} className="filter-wrap p-none">         
        <Button 
          className="pull-right btn btn-orange add-new-btn"
          onClick={()=>this.setState({ CreateShow: true })}> 
          <i className="add-album-icon">
            <img src={require('../../../assets/images/admin/album/add-icon.png')} alt=""/>            
          </i>Add New
        </Button>         
      </Col>
      <div className="contact-list-wrap">
        {contacts.map(contact => 
          
          <Col xs={12} className="p-none contact-list">
            {/*alphabet wise block*/}
            <span className="contact-char"> </span> 
            {/*alphabet wise block*/}
            <Col xs={12} className="contact-list-wrap p-none" key={contact.id}>
              <Col xs={12} className="contact-wrap">                   
                <Media className="single-contact">
                  <Media.Left align="top" className="contact-img-wrap">
                    <img className="contact-thumb" 
                      src={contact.photo.image} 
                      alt={contact.photo.image_file_name}
                    />   
                  </Media.Left>
                  <Media.Body className="contact-detail-wrap">
                    <Media.Heading className="contact-name">
                      {contact.full_name}
                    </Media.Heading>
                    <div className="contact-detail">
                      <div className="contact-info call-detail">
                        <img src={require('../../../assets/images/admin/contact/call-icon-bg.png')} alt=""/>
                        <a href={"callto:" + contact.phone}  className="call-num">{contact.phone}</a>
                      </div>
                      <div className="contact-info mail-detail">
                        <img src={require('../../../assets/images/admin/contact/mail-icon-bg.png')} alt=""/>
                        <a href={"mailto:" + contact.email}>{contact.email}</a>
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
                        <img src={require('../../../assets/images/admin/album/edit-icon.png')} alt=""/>
                      </Button>
                      <img src={require('../../../assets/images/admin/contact/seprator.png')} alt="" className="vertical-seprator" />                         
                      <Button 
                        className="btn-link p-none contact-action-btn contact-delete-btn"
                        onClick={event => this.showDialogueBox(contact.id)}
                      >
                        <img src={require('../../../assets/images/admin/album/delete-icon.png')} alt=""/>
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
        )}
       
      </div>
      
      <Col xs={12} className="p-none custom-pagination-wrap">
        <Pagination prev next ellipsis boundaryLinks items={10} maxButtons={3} activePage={this.state.activePage} onSelect={this.handleSelect} className="custom-pagination"/>
      </Col>
      </Col>
    );
  }
}

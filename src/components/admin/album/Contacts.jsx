import React, { Component } from 'react';
import { Col, Button, Media, Pagination } from 'react-bootstrap';
// import SweetAlert from 'sweetalert-react';
// import AddContact from './add-contact';
import AddContact from './add-contact'

import { getContacts } from '../../../services/admin/Contacts';

// import './contacts.css';
import '../../../assets/css/admin/album/contacts.css'


export default class Contacts extends Component {
  constructor(props){
    super(props);
    this.state = {
      editObject: {},
      open: false,
      activePage: 3,
      CreateShow:false,
      contacts: [],
      meta: []
    }
  }

  componentWillMount() {
    var self = this;

    getContacts()
      .then(function(response) {
        var data = response.data;
        console.log(data);
        self.setState({ contacts: data.data.contacts, meta: data.meta });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  CreateClose = () => this.setState({ CreateShow: false });  
  handleSelect(eventKey, e) {      
  this.setState({
    activePage: eventKey
  });
  }

  render() {
    const { contacts } = this.state;
    return (
      <Col xs={12} className="contacts-page-wrap">
      <AddContact showCreate={this.state.CreateShow} closeOn={this.CreateClose}/>      
      <Col xs={12} className="filter-wrap p-none">         
        <Button className="pull-right btn btn-orange add-new-btn" onClick={()=>this.setState({ CreateShow: true })}> 
          <i className="add-album-icon">
            <img src={require('../../../assets/images/admin/album/add-icon.png')} alt=""/>            
          </i>Add New
        </Button>         
      </Col>
      <div className="contact-list-wrap">
        {contacts.map(contact => 
          
          <Col xs={12} className="p-none contact-list">
            {/*<span className="contact-char">A</span>*/}
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
                        <img src={require('../../../assets/images/admin/album/call-icon-bg.png')} alt=""/>
                        <a href={"callto:" + contact.phone}  className="call-num">{contact.phone}</a>
                      </div>
                      <div className="contact-info mail-detail">
                        <img src={require('../../../assets/images/admin/album/mail-icon-bg.png')} alt=""/>
                        <a href={"mailto:" + "aditiverma@gmail.com"}>{contact.email}</a>
                      </div>
                    </div>                                                         
                    <div className="action-wrapper">
                      <Button className="btn-link p-none contact-action-btn contact-edit-btn">
                        <img src={require('../../../assets/images/admin/album/edit-icon.png')} alt=""/>
                      </Button>
                      <img src={require('../../../assets/images/admin/album/seprator.png')} alt="" className="vertical-seprator" />                         
                      <Button className="btn-link p-none contact-action-btn contact-delete-btn">
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
        {/*<Col xs={12} className="p-none contact-list">
          <span className="contact-char">B</span>
          <Col xs={12} className="contact-list-wrap p-none">
            <Col xs={12} className="contact-wrap">                   
              <Media className="single-contact">
                <Media.Left align="top" className="contact-img-wrap">
                  <img className="contact-thumb" src={require('../../../assets/images/admin/album/contact-thumb-3.png')} alt="Contact thumb"/>     
                </Media.Left>
                <Media.Body className="contact-detail-wrap">
                  <Media.Heading className="contact-name">
                    Bhaumik Gadani
                  </Media.Heading>
                  <div className="contact-detail">
                    <div className="contact-info call-detail">
                      <img src={require('../../../assets/images/admin/album/call-icon-bg.png')} alt=""/>
                      <a href={"callto:" + "0987654321"}  className="call-num">0987654321</a>
                    </div>
                    <div className="contact-info mail-detail">
                      <img src={require('../../../assets/images/admin/album/mail-icon-bg.png')} alt=""/>
                      <a href={"mailto:" + "bhaumikgadani@gmail.com"}>bhaumikgadani@gmail.com</a>
                    </div>
                  </div>
                  <div className="action-wrapper">
                    <Button className="btn-link p-none contact-action-btn contact-edit-btn">
                      <img src={require('../../../assets/images/admin/album/edit-icon.png')} alt=""/>
                    </Button>
                    <img src={require('../../../assets/images/admin/album/seprator.png')} alt="" className="vertical-seprator" />                         
                    <Button className="btn-link p-none contact-action-btn contact-delete-btn">
                      <img src={require('../../../assets/images/admin/album/delete-icon.png')} alt=""/>
                    </Button> 
                  </div>                          
                </Media.Body>
              </Media>      
              <Col xs={12} className="p-none contact-separator">
                <hr/>
              </Col> 
              <Media className="single-contact">
                <Media.Left align="top" className="contact-img-wrap">
                  <img className="contact-thumb" src={require('../../../assets/images/admin/album/contact-thumb-4.png')} alt="Contact thumb"/>     
                </Media.Left>
                <Media.Body className="contact-detail-wrap">
                  <Media.Heading className="contact-name">
                  Bhavin Gajjar
                  </Media.Heading>
                  <div className="contact-detail">
                    <div className="contact-info call-detail">
                      <img src={require('../../../assets/images/admin/album/call-icon-bg.png')} alt=""/>
                      <a href={"callto:" + "0987654321"}  className="call-num">0987654321</a>                                
                    </div>
                    <div className="contact-info mail-detail">
                      <img src={require('../../../assets/images/admin/album/mail-icon-bg.png')} alt=""/>
                      <a href={"mailto:" + "bhavingajjar@gmail.com"}>bhavingajjar@gmail.com</a>
                    </div>
                  </div>
                  <div className="action-wrapper">
                    <Button className="btn-link p-none contact-action-btn contact-edit-btn">
                      <img src={require('../../../assets/images/admin/album/edit-icon.png')} alt=""/>
                    </Button>
                    <img src={require('../../../assets/images/admin/album/seprator.png')} alt="" className="vertical-seprator" />                         
                    <Button className="btn-link p-none contact-action-btn contact-delete-btn">
                      <img src={require('../../../assets/images/admin/album/delete-icon.png')} alt=""/>
                    </Button> 
                  </div>                          
                </Media.Body>
              </Media> 
              <Col xs={12} className="p-none contact-separator">
                <hr/>
              </Col> 
              <Media className="single-contact">
                <Media.Left align="top" className="contact-img-wrap">
                  <img className="contact-thumb" src={require('../../../assets/images/admin/album/contact-thumb-5.png')} alt="Contact thumb"/>     
                </Media.Left>
                <Media.Body className="contact-detail-wrap">
                  <Media.Heading className="contact-name">
                  Binoli Modi
                  </Media.Heading>
                  <div className="contact-detail">
                    <div className="contact-info call-detail">
                      <img src={require('../../../assets/images/admin/album/call-icon-bg.png')} alt=""/>
                      <a href={"callto:" + "0987654321"}  className="call-num">0987654321</a>         
                    </div>
                    <div className="contact-info mail-detail">
                      <img src={require('../../../assets/images/admin/album/mail-icon-bg.png')} alt=""/>
                      <a href={"mailto:" + "binolimodi@gmail.com"}>binolimodi@gmail.com</a>
                    </div>
                  </div>
                  <div className="action-wrapper">
                    <Button className="btn-link p-none contact-action-btn contact-edit-btn">
                      <img src={require('../../../assets/images/admin/album/edit-icon.png')} alt=""/>
                    </Button>
                    <img src={require('../../../assets/images/admin/album/seprator.png')} alt="" className="vertical-seprator" />                         
                    <Button className="btn-link p-none contact-action-btn contact-delete-btn">
                      <img src={require('../../../assets/images/admin/album/delete-icon.png')} alt=""/>
                    </Button> 
                  </div>                          
                </Media.Body>
              </Media>    
            </Col>
          </Col>           
        </Col>
        <Col xs={12} className="p-none contact-list">
          <span className="contact-char">D</span>
          <Col xs={12} className="contact-list-wrap p-none">
            <Col xs={12} className="contact-wrap">                   
              <Media className="single-contact">
                <Media.Left align="top" className="contact-img-wrap">
                  <img className="contact-thumb" src={require('../../../assets/images/admin/album/contact-thumb-3.png')} alt="Contact thumb"/>     
                </Media.Left>
                <Media.Body className="contact-detail-wrap">
                  <Media.Heading className="contact-name">
                    Dhara Chauhan
                  </Media.Heading>
                  <div className="contact-detail">
                    <div className="contact-info call-detail">
                      <img src={require('../../../assets/images/admin/album/call-icon-bg.png')} alt=""/>
                      <a href={"callto:" + "0987654321"}  className="call-num">0987654321</a>
                    </div>
                    <div className="contact-info mail-detail">
                      <img src={require('../../../assets/images/admin/album/mail-icon-bg.png')} alt=""/>
                      <a href={"mailto:" + "dharachauhan@gmail.com"}>dharachauhan@gmail.com</a>
                    </div>
                  </div>
                  <div className="action-wrapper">
                    <Button className="btn-link p-none contact-action-btn contact-edit-btn">
                      <img src={require('../../../assets/images/admin/album/edit-icon.png')} alt=""/>
                    </Button>
                    <img src={require('../../../assets/images/admin/album/seprator.png')} alt="" className="vertical-seprator" />                         
                    <Button className="btn-link p-none contact-action-btn contact-delete-btn">
                      <img src={require('../../../assets/images/admin/album/delete-icon.png')} alt=""/>
                    </Button> 
                  </div>                          
                </Media.Body>
              </Media>  
            </Col>
          </Col>           
        </Col>*/}
      </div>
      
      <Col xs={12} className="p-none custom-pagination-wrap">
        <Pagination prev next ellipsis boundaryLinks items={10} maxButtons={3} activePage={this.state.activePage} onSelect={this.handleSelect} className="custom-pagination"/>
      </Col>
      </Col>
    );
  }
}

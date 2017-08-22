import React, { Component } from 'react';
import { Col, Button, Tab,Tabs,Thumbnail } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

// Import icon
import homeIcon from '../../../assets/images/admin/site-content/home-icon.png';
import callIcon from '../../../assets/images/admin/site-content/call-icon.png';
import messageIcon from '../../../assets/images/admin/site-content/message-icon.png';

// Import helper
import { isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/site-content/site-content.css';

// Import services
import { getAboutUs, getActiveServices, getContactDetails } from '../../../services/Contact';


import EditAboutContent from './edit-about-content';
import AddService from './add-service';
import EditContactDetail from './edit-contact-detail';



export default class SiteContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            editObject: {},
            aboutUs: [],
            services: [],
            contactDetails:[],
            EditContactShow: false
        }
        this.handleTabSelect = this.handleTabSelect.bind(this);
        this.handleAboutModal = this.handleAboutModal.bind(this);
        this.handleAddserviceModal = this.handleAddserviceModal.bind(this);
    }
    
    componentWillMount() {
      var self = this;
        console.log(self)
      getAboutUs().then(function(response) {
        if (response.status === 200) {
          self.setState({ aboutUs: response.data.data.about_us });
        }
      });

    }
    
    componentDidMount() {
      var self = this;
      
      getActiveServices().then(function(response) {
        if (response.status === 200) {
          self.setState({ services: response.data.data.active_services });
        }
      });

      getContactDetails().then(function(response) {
        if (response.status === 200) {
          self.setState({ contactDetails: response.data.data.contact_detail });
        }
      });
    }

    handleTabSelect(key) {
        this.setState({key});
    }

    handleAboutModal(){
        this.setState({ EditAboutShow : true });
        setTimeout(function(){
            document.getElementById("modalAboutDesc").style.height = document.getElementById("modalAboutDesc").scrollHeight + "px";           
        },1000);
    }

    handleAddserviceModal(){
        this.setState({ AddServiceShow : true });
        setTimeout(function(){
            document.getElementById("modalServicedesc").style.height = document.getElementById("modalServicedesc").scrollHeight + "px";
        },1000);
    }
    renderContactDetail = (contactDetail, action) => {
        const editContactDetail = this.state.contactDetails.slice();
    
        if (action === 'replace' && !isObjectEmpty(this.state.editObject)) {
        editContactDetail.splice(editContactDetail.indexOf(this.state.editObject), 1, contactDetail);
        }

        this.setState({
        contactDetails: editContactDetail
        });
    };
    hideAboutPopup = () => {
      debugger;
      this.setState({ EditAboutShow: false, editObject: {} });
    };

     renderAboutUs = (aboutUsDetail, action) => {
        const editAboutUsDetail = this.state.aboutUs.slice();
    
        if (action === 'replace' && !isObjectEmpty(this.state.editObject)) {
        editAboutUsDetail.splice(editAboutUsDetail.indexOf(this.state.editObject), 1, aboutUsDetail);
        }

        this.setState({
        contactDetails: editAboutUsDetail
        });
    };
    EditAboutClose = () => this.setState({ EditAboutShow: false, editObject: {} });  
    ServiceCloseModal = () => this.setState({ AddServiceShow: false, editObject: {} });    
    EditContactClose = () => this.setState({ EditContactShow: false, editObject: {} });

  render() {
    const aboutUs = this.state.aboutUs;
    const contactDetails = this.state.contactDetails;
    return (
      <Col xs={12} className="site-content-wrap">   

    {this.state.EditAboutShow &&
        <EditAboutContent 
            EditAboutShow={this.state.EditAboutShow} 
            EditAboutClose={this.EditAboutClose}
            editObject={this.state.editObject} 
        />
    }     
    {this.state.AddServiceShow &&   
        <AddService 
            AddServiceShow={this.state.AddServiceShow} 
            ServiceCloseModal={this.ServiceCloseModal}
            editObject={this.state.editObject} 
        />
    }
    {this.state.EditContactShow &&   
        <EditContactDetail 
            EditContactShow={this.state.EditContactShow} 
            EditContactClose={this.EditContactClose}
            editObject={this.state.editObject}
        />
    }

        <Tabs defaultActiveKey={this.state.key} onSelect={this.handleTabSelect} id="uncontrolled-tab-example" className="site-content-tabs">
            <Tab eventKey={1} title="About Us" className="about-site-content">
                <Col xs={12} className="site-content-filter p-none">
                    <Button className="btn btn-orange pull-right edit-album-content" onClick={()=>
                        this.setState({ 
                            EditAboutShow: true,
                            editObject: aboutUs
                             })}>  
                        <i className="add-album-icon">
                            <img src={require('../../../assets/images/admin/site-content/edit-icon.png')} alt=""/>
                        </i>Edit Details
                    </Button>           
                </Col> 
                <Col xs={12} className="p-none">
                    <Col className="content-about-img-wrap">
                        {/* <img className="img-responsive content-user-image" src={AboutImage} alt="content-user-image"/> */}
                        {aboutUs.photo &&
                          <img
                            className="img-responsive content-user-image"
                            src={aboutUs.photo.image}
                            alt="user"
                          />
                        }
                        <a className="img-edit-btn" onClick={() =>
                          this.setState({
                            EditAboutShow: true,
                            editObject: aboutUs
                          })}>
                            <img src={require('../../../assets/images/admin/site-content/edit-icon.png')} alt=""/>     
                        </a>
                    </Col>
                    <Col className="right-content-wrap text-grey">
                        <Col xs={12} className="about-content-wrap">
                            <h3 className="about-content-title">{aboutUs.title_text}</h3>
                            <p>{aboutUs.description}</p>
                        </Col>
                        {aboutUs.social_links &&
                          <Col className="about-solcial-icons" xs={12}>
                            <a
                              target="_blank"
                              href={aboutUs.social_links.facebook_link}
                              className="btn btn-grey btn-round  social-link"
                            >
                            <span className="fa fa-facebook"></span>
                            </a>
                            <a
                              target="_blank"
                              href={aboutUs.social_links.twitter_link}
                              className="btn btn-grey btn-round  social-link"
                            >
                            <span className="fa fa-tumblr"></span>
                            </a>
                          </Col>
                        }
                    </Col>
                </Col>
            </Tab>
            <Tab eventKey={2} title="Services">
              <Col xs={12} className="site-content-filter p-none">
                  <Button className="btn btn-orange pull-right add-new-service" 
                    onClick={this.handleAddserviceModal}
                    onClick={() => this.setState({ AddServiceShow: true })}
                  > 
                      <i className="add-service-icon">
                          <img src={require('../../../assets/images/admin/site-content/add-icon.png')} alt=""/>
                      </i>Add New
                  </Button>           
              </Col> 
              <Col xs={12} className="admin-service-thumb-wrap" >
                {this.state.services.map(service =>
                  <Thumbnail 
                    className="admin-service-thumb" 
                    alt="icon-images" 
                    src={service.service_icon.icon_image} 
                    key={service.id}
                  >
                  <Col className="admin-sevice-details">
                    <h4 className="admin-service-title text-center">
                      {service.service_name}
                    </h4>
                    <Col className="p-none admin-service-description">
                        <p>{service.description}</p>
                    </Col>
                      </Col>
                      <a className="edit-service-thumb" 
                        onClick={() =>
                          this.setState({
                            AddServiceShow: true,
                            editObject: service
                          })}
                      >
                          <img src={require('../../../assets/images/admin/site-content/edit-icon-grey.png')} alt=""/>
                      </a>
                  </Thumbnail>
                )}
              </Col>
            </Tab>
            <Tab eventKey={3} title="Contact Us">
                 <Col xs={12} className="site-content-filter p-none">
                        <Button className="btn btn-orange pull-right edit-contact-detail" onClick={()=>
                          this.setState({ 
                            EditContactShow: true,
                            editObject: contactDetails
                             })}> 
                            <i className="edit-contact-detail-icon">
                                <img src={require('../../../assets/images/admin/site-content/edit-icon.png')} alt=""/>
                            </i>Edit Details
                        </Button>           
                    </Col>
                <Col xs={12} className="contact-tab-content">
                    <Col className="admin-contact-block">
                        <Col md={1} xs={2} className="contact-icon-wrap">
                            <img src={homeIcon} alt="Home" className="icon-img"/>
                        </Col>
                        <Col md={11} xs={10} className="contact-content-wrap">
                          {contactDetails.address}
                        </Col>
                    </Col>

                    <Col className="admin-contact-block">
                        <Col xs={2} md={1}  className="contact-icon-wrap">
                            <img src={messageIcon} alt="Mail" className="icon-img"/>
                        </Col>
                        <Col xs={10} md={11} className="contact-content-wrap">
                          {contactDetails.email}
                        </Col>
                    </Col>

                    <Col className="admin-contact-block">
                        <Col xs={2} md={1}  className="contact-icon-wrap">
                            <img src={callIcon} alt="Call" className="icon-img"/>
                        </Col>
                        <Col xs={10} md={11} className="col-xs-10 col-md-11 contact-content-wrap">
                        {contactDetails.phone}
                        </Col>
                    </Col>
                </Col>
            </Tab>
        </Tabs>               
      </Col>
    );
  }
}
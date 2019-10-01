import React, { Component } from 'react';
import { Col, Button, Tab, Tabs } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
import { Link } from 'react-router-dom';
import ReactAvatarEditor from 'react-avatar-editor'
// Import component
import EditAboutContent from './EditAboutContent';
import ServicePopup from './ServicePopup';
import EditContactDetail from './EditContactDetail';
import ServiceModule from '../../common/ServiceModule';
// import SocialMediaPopup from './SocialMediaPopup';
import EditWebsiteDetail from './EditWebsiteDetail';

// Import services
import {
  AboutService,
  ContactDetailService,
  UserServiceService,
  WebsiteDetailService
} from '../../../services/Index';

// Import helper
import { isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/site-content/site-content.css';
import '../../../assets/css/contact/services.css';

export default class SiteContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editObject: {},
      aboutUs: {},
      services: [],
      socialMedia: {},
      contactDetail: {},
      websiteDetail: {},
      tab: 'home',
      admin_service: true,
      alert: {
        objectId: '',
        show: false,
        cancelBtn: true,
        confirmAction: () => {},
        title: '',
        text: '',
        btnText: '',
        type: ''
      },
      allowZoomOut: false,
      scale: 1,
      image: ""
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handleAboutModal = this.handleAboutModal.bind(this);
    this.handleAddserviceModal = this.handleAddserviceModal.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSocialMediaModal = this.handleSocialMediaModal.bind(this);
  }

  componentWillMount() {
    var self = this;
    var tab_name = window.location.hash.replace('#','')
    if (tab_name !== "") {
      self.setState({tab: tab_name})
    }
    AboutService.getAboutUs().then(function(response) {
      if (response.status === 200) {
        self.setState({
          aboutUs: response.data.data.about_us,
          socialMedia: response.data.data.about_us.social_links
        });
      }
    });

    UserServiceService.getActiveServices().then(function(response) {
      if (response.status === 200) {
        self.setState({ services: response.data.data.active_services });
      }
    });

    ContactDetailService.getContactDetails().then(function(response) {
      if (response.status === 200) {
        self.setState({ contactDetail: response.data.data.contact_detail });
      }
    });

    WebsiteDetailService.getWebsiteDetail().then(function(response){
      if (response.status === 200) {
        self.setState({ websiteDetail: response.data.data.website_detail });
      }
    })
  }

  ServiceCloseModal = () => {
    this.setState({ AddServiceShow: false, editObject: {} });
  };

  SocialMediaCloseModal = () => {
    this.setState({ AddSocialMediaShow: false, editObject: {} });
  };

  renderService = (service, action) => {
    const newServices = this.state.services.slice();
    if (action === 'insert') {
      newServices.splice(0, 0, service);
    } else if (action === 'replace' && !isObjectEmpty(this.state.editObject)) {
      newServices.splice(
        newServices.indexOf(this.state.editObject),
        1,
        service
      );
    }
    this.setState({
      services: newServices
    });
  };

  renderSocialMedia = (social_link, action) => {
    const social_links = social_link;
    this.setState({
      socialMedia: social_links
    });
  };

  EditContactClose = () => {
    this.setState({ EditContactShow: false, editObject: {} });
  };

  renderContactDetail = contactDetail => {
    const editContactDetail = contactDetail;

    this.setState({
      contactDetail: editContactDetail
    });
  };

  EditWebsiteClose = () => {
    this.setState({ EditWebsiteDetailShow: false, editObject: {} });
  };

  renderWebsiteDetail = websiteDetail => {
    const editWebsiteDetail = websiteDetail;

    this.setState({
      websiteDetail: editWebsiteDetail
    });
  };


  EditAboutClose = () => {
    this.setState({ EditAboutShow: false, editObject: {} });
  };

  renderAboutUs = aboutUs => {
    const editAboutUsDetail = aboutUs;
    this.setState({
      aboutUs: editAboutUsDetail
    });
  };

  handleTabSelect(key) {
    this.setState({ tab: key });
  }

  handleAboutModal() {
    this.setState({ EditAboutShow: true });
    setTimeout(function() {
      document.getElementById('modalAboutDesc').style.height =
        document.getElementById('modalAboutDesc').scrollHeight + 'px';
    }, 1000);
  }

  handleAddserviceModal() {
    this.setState({ AddServiceShow: true });
    setTimeout(function() {
      document.getElementById('modalServicedesc').style.height =
        document.getElementById('modalServicedesc').scrollHeight + 'px';
    }, 1000);
  }

  handleSocialMediaModal() {
    this.setState({ AddSocialMediaShow: true });
  }

  handleUploadFile = e => {
    e.preventDefault();

    var self = this;
    let file = e.target.files[0];
    let data = new FormData();
    data.append('about[photo_attributes][image]', file);

    AboutService.updateAboutUs(data)
      .then(function(response) {
        self.handleSuccessResponse(response);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  };

  handleEditClick(e) {
    var inputField = this.refs.fileField;
    inputField.click();
  }

  handleSuccessResponse(response) {
    if (response.status === 201) {
      this.handlePhotoRendering(response);
    }
  }

  handlePhotoRendering(response) {
    var UpdatePhoto = response.data.data.about_us;
    this.setState({ aboutUs: UpdatePhoto });
  }
  showEditPopup = service => {
    this.setState({
      AddServiceShow: true,
      editObject: service
    });
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
        confirmAction: () => this.deleteService(),
        cancelBtn: true
      }
    });
  }
  hideDialogueBox() {
    this.setState({ alert: { show: false } });
  }

  deleteService() {
    var self = this;
    debugger;
    UserServiceService.deleteService(self.state.alert.objectId)
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

    const services = self.state.services.filter(
      testimonial => testimonial.id !== self.state.alert.objectId
    );

    self.setState({
      services: services,
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
  setEditorRef = (editor) => this.editor = editor

  handleNewImage = e => {
    this.setState({ image: e.target.files[0] })
  }

  handleScale = e => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
          callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

  handleSave = () => {
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    const rect = this.editor.getCroppingRect()
    var self = this;
    let data = new FormData();
    data.append('about[photo_attributes][image]', img);

    AboutService.updateAboutUs(data)
      .then(function(response) {
        self.handleSuccessResponse(response);
      })
      .catch(function(error) {
        console.log(error.response);
      });
    this.setState({
      preview: {
        img,
        rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius,
      },
    })
  }

  render() {
    const { aboutUs, contactDetail, tab, socialMedia, alert } = this.state;
    // var socialMediaLink = '';
    return (
      <Col xs={12} className="site-content-wrap">
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
        {this.state.EditAboutShow && (
          <EditAboutContent
            EditAboutShow={this.state.EditAboutShow}
            EditAboutClose={this.EditAboutClose}
            renderAboutUs={this.renderAboutUs}
            editObject={this.state.editObject}
          />
        )}
        {this.state.AddServiceShow && (
          <ServicePopup
            AddServiceShow={this.state.AddServiceShow}
            ServiceCloseModal={this.ServiceCloseModal}
            renderService={this.renderService}
            editObject={this.state.editObject}
          />
        )}
        {this.state.EditContactShow && (
          <EditContactDetail
            EditContactShow={this.state.EditContactShow}
            EditContactClose={this.EditContactClose}
            renderContactDetail={this.renderContactDetail}
            editObject={this.state.editObject}
          />
        )}
        {this.state.EditWebsiteDetailShow && (
          <EditWebsiteDetail
            EditWebsiteDetailShow={this.state.EditWebsiteDetailShow}
            EditWebsiteClose={this.EditWebsiteClose}
            renderWebsiteDetail={this.renderWebsiteDetail}
            editObject={this.state.editObject}
          />
        )}

        <Tabs
          defaultActiveKey={tab}
          onSelect={this.handleTabSelect}
          id="uncontrolled-tab-example"
          className="site-content-tabs"
        >
          <Tab eventKey="home" title="Home">
            <Col xs={12} className="site-content-filter p-none">
              <h5 className="f-left">Home</h5>
              <Button className="btn-orange f-right">
                <Link
                  to={'/homepage_gallery'}
                  className="admin-login-btn"
                >
                  Manage Homepage Gallery
                </Link>
              </Button>
            </Col>
          </Tab>
          <Tab eventKey="portfolio" title="Portfolio">
            <Col xs={12} className="site-content-filter p-none">
              <h5 className="f-left">Portfolio</h5>
              <Button className="btn-orange f-right">
                <Link
                  to={'/albums'}
                  className="admin-login-btn"
                >
                  Manage Portfolio
                </Link>
              </Button>
            </Col>
          </Tab>
          <Tab eventKey="films" title="Films">
            <Col xs={12} className="site-content-filter p-none">
              <h5 className="f-left">Films</h5>
              <Button className="btn-orange f-right">
                <Link
                  to={'/video_films'}
                  className="admin-login-btn"
                >
                  Manage Films
                </Link>
              </Button>
            </Col>
          </Tab>
          <Tab eventKey="services" title="Services">
            <Col xs={12} className="site-content-filter p-none">
              <Button
                className="btn btn-orange pull-right add-new-service"
                onClick={this.handleAddserviceModal}
              >
                <i className="fa fa-plus add-service-icon" />Add New
              </Button>
            </Col>
            <ServiceModule
              services={this.state.services}
              showEditPopup={this.showEditPopup}
              admin_service={this.state.admin_service}
              showDialogueBox={this.showDialogueBox.bind(this)}
            />
          </Tab>
          <Tab eventKey="testimonials" title="Testimonials">
            <Col xs={12} className="site-content-filter p-none">
              <h5 className="f-left">Testimonials</h5>
              <Button className="btn-orange f-right">
                <Link
                  to={'/testimonials'}
                  className="admin-login-btn"
                >
                  Manage Testimonials
                </Link>
              </Button>
            </Col>
          </Tab>
          <Tab
            eventKey="about_us"
            title="About Us"
            className="about-site-content"
          >
            <Col xs={12} className="site-content-filter p-none">
              {(aboutUs && aboutUs.title_text !== undefined) ? 
                <Button
                className="btn btn-orange pull-right edit-album-content"
                onClick={() =>
                  this.setState({
                    EditAboutShow: true,
                    editObject: aboutUs
                  })}
              >
                <i className="edit-icon">
                  <img
                    src={require('../../../assets/images/admin/site-content/edit-icon.png')}
                    alt=""
                  />
                </i>
                Edit Details
              </Button> : <Button
                className="btn btn-orange pull-right edit-album-content"
                onClick={() =>
                  this.setState({
                    EditAboutShow: true,
                  })}
              >
                <i className="fa fa-plus add-service-icon"/>
                Add Details
              </Button>
              }
            </Col>
            <Col xs={12} className="p-none">
              <Col className="content-about-img-wrap about-us-img-div">
                {aboutUs && (
                  <div>
                  {/* <img
                    className="img-responsive content-user-image"
                    src={aboutUs.photo.image}
                    alt="user"
                  /> */}
                  <ReactAvatarEditor
                    ref={this.setEditorRef}
                    image={this.state.image === "" ? "" : this.state.image}
                    width={259}
                    height={259}
                    border={50}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={parseFloat(this.state.scale)}
                    rotate={0}
                    className="editor-canvas img-responsive"
                    crossOrigin = 'anonymous'
                  />
                  <input
                    name="scale"
                    type="range"
                    onChange={this.handleScale}
                    min={this.state.allowZoomOut ? '0.1' : '1'}
                    max="2"
                    step="0.01"
                    defaultValue="1"
                  />
                  <Button
                    className="btn btn-orange"
                    onClick={event => this.handleSave(event)}
                  >Submit
                  </Button><br/>
                  {!!this.state.preview && (
                    <img
                      src={this.state.preview.img}
                      style={{
                        borderRadius: `${(Math.min(
                          this.state.preview.height,
                          this.state.preview.width
                        ) +
                          10) *
                          (this.state.preview.borderRadius / 2 / 100)}px`,
                      }}
                    />
                  )}
                  </div>
                )}
                {aboutUs && aboutUs.title_text !== undefined &&
                  <a className="img-edit-btn" onClick={this.handleEditClick}>
                  <img
                    src={require('../../../assets/images/admin/site-content/edit-icon.png')}
                    alt=""
                  />
                  <input
                    id="about_photo_edit"
                    ref="fileField"
                    type="file"
                    onChange={(e) => this.handleNewImage(e)}
                  />
                </a>
                }
              </Col>
              {aboutUs &&
                <Col className="right-content-wrap text-grey about-us-content-div">
                  <Col xs={12} className="about-content-wrap">
                    <h3 className="about-content-title">{aboutUs.title_text}</h3>
                    <p
                      dangerouslySetInnerHTML={{ __html: aboutUs.description }}
                    />
                  </Col>
                  {aboutUs.facebook_link && (
                    <Col className="about-solcial-icons" xs={12}>
                      <a
                        target="_blank"
                        href={aboutUs.facebook_link}
                        className="btn btn-grey btn-round  social-link"
                      >
                        <span className="fa fa-facebook" />
                      </a>
                      {/* <a
                        target="_blank"
                        href={aboutUs.social_links.twitter_link}
                        className="btn btn-grey btn-round  social-link"
                      >
                        <span className="fa fa-tumblr" />
                      </a> */}
                    </Col>
                  )}
                </Col>
              }
            </Col>
          </Tab>
          <Tab eventKey="contact_us" title="Contact Us">
            <Col xs={12} className="site-content-filter p-none">
              {(contactDetail && contactDetail.email !== undefined) ?
                <Button
                  className="btn btn-orange pull-right edit-contact-detail"
                  onClick={() =>
                    this.setState({
                      EditContactShow: true,
                      editObject: contactDetail
                    })}
                >
                  <i className="edit-contact-detail-icon">
                    <img
                      src={require('../../../assets/images/admin/site-content/edit-icon.png')}
                      alt=""
                    />
                  </i>Edit Details
                </Button> : <Button
                  className="btn btn-orange pull-right edit-contact-detail"
                  onClick={() =>
                    this.setState({
                      EditContactShow: true,
                    })}
                >
                  <i className="fa fa-plus add-service-icon"/>
                  Add Details
                </Button>
              }
            </Col>
            {contactDetail &&
              <Col xs={12} className="contact-tab-content">
              <Col className="admin-contact-block">
                <Col md={1} xs={2} className="contact-icon-wrap">
                  <img
                    src={require('../../../assets/images/admin/site-content/home-icon.png')}
                    alt="Home"
                    className="icon-img"
                  />
                </Col>
                <Col md={11} xs={10} className="contact-content-wrap">
                  {contactDetail.address}
                </Col>
              </Col>

              <Col className="admin-contact-block">
                <Col xs={2} md={1} className="contact-icon-wrap">
                  <img
                    src={require('../../../assets/images/admin/site-content/message-icon.png')}
                    alt="Mail"
                    className="icon-img"
                  />
                </Col>
                <Col xs={10} md={11} className="contact-content-wrap">
                  {contactDetail.email}
                </Col>
              </Col>

              <Col className="admin-contact-block">
                <Col xs={2} md={1} className="contact-icon-wrap">
                  <img
                    src={require('../../../assets/images/admin/site-content/call-icon.png')}
                    alt="Call"
                    className="icon-img"
                  />
                </Col>
                <Col
                  xs={10}
                  md={11}
                  className="col-xs-10 col-md-11 contact-content-wrap"
                >
                  {contactDetail.phone}
                </Col>
              </Col>
            </Col>
            }
          </Tab>
          {/* <Tab eventKey="website_detail" title="Website Details">
            <Col xs={12} className="site-content-filter p-none">
              {(websiteDetail && websiteDetail.title !== undefined) ?
                <Button
                  className="btn btn-orange pull-right edit-contact-detail"
                  onClick={() =>
                    this.setState({
                      EditWebsiteDetailShow: true,
                      editObject: websiteDetail
                    })}
                >
                  <i className="edit-contact-detail-icon">
                    <img
                      src={require('../../../assets/images/admin/site-content/edit-icon.png')}
                      alt=""
                    />
                  </i>Edit Details
                </Button> : <Button
                  className="btn btn-orange pull-right edit-contact-detail"
                  onClick={() =>
                    this.setState({
                      EditWebsiteDetailShow: true,
                    })}
                >
                  <i className="fa fa-plus add-service-icon"/>
                  Add Details
                </Button>
              }
            </Col>
            {websiteDetail &&
              <Col xs={12} className="contact-tab-content">
              <Col className="admin-contact-block">
                <Col md={1} xs={2} className="contact-icon-wrap">
                  <img
                    src={require('../../../assets/images/admin/site-content/home-icon.png')}
                    alt="Home"
                    className="icon-img"
                  />
                </Col>
                <Col md={11} xs={10} className="contact-content-wrap">
                  {websiteDetail.title}
                </Col>
              </Col>

              <Col className="admin-contact-block">
                <Col xs={2} md={1} className="contact-icon-wrap">
                  <img
                    src={require('../../../assets/images/admin/site-content/message-icon.png')}
                    alt="Mail"
                    className="icon-img"
                  />
                </Col>
                <Col xs={10} md={11} className="contact-content-wrap">
                  {websiteDetail.copyright_text}
                </Col>
              </Col>
            </Col>
            }
          </Tab> */}
        </Tabs>
      </Col>
    );
  }
}

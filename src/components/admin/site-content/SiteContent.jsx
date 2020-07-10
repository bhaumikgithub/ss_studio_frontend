import React, { Component } from 'react';
import { Col, Button, Tab, Tabs, ControlLabel, FormControl, FormGroup, Checkbox } from 'react-bootstrap';
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

// Import component
import validationHandler from '../../common/ValidationHandler';

// Import services
import {
  AboutService,
  ContactDetailService,
  UserServiceService,
  WebsiteDetailService,
  BlogService,
  AlbumService,
  WidgetService,
  PageSettingService
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
      editBlogForm: {
        is_show: false,
        blog_url: ''
      },
      editPortfolioForm: {
        is_show: false,
        gallery_column: 2
      },
      editHomeWidgetForm: {},
      editPortfolioWidgetForm: {},
      ediFilmWidgetForm: {},
      editServiceWidgetForm: {},
      editTestimonialWidgetForm: {},
      editAboutUsWidgetForm: {},
      editContactUsWidgetForm: {},
      editHomePageForm: {},
      ediFilmPageForm: {},
      editServicePageForm: {},
      editTestimonialPageForm: {},
      editAboutUsPageForm: {},
      editContactUsPageForm:{},
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
      errors: {},
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
          socialMedia: response.data.data.about_us.social_links, 
          image: response.data.data.about_us.photo && response.data.data.about_us.photo.image ? response.data.data.about_us.photo.image : ""
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
    });

    WidgetService.getHomeWidget({widget_type: "home"}).then(function(response){
      if (response.status === 200) {
        self.setState({ editHomeWidgetForm: response.data.data.home_widget });
      }
    });

    PageSettingService.getHomePage({page_type: "home"}).then(function(response){
      if (response.status === 200) {
        self.setState({ editHomePageForm: response.data.data.home_page });
      }
    });

    WidgetService.getPortfolioWidget({widget_type: "portfolio"}).then(function(response){
      if (response.status === 200) {
        self.setState({ editPortfolioWidgetForm: response.data.data.portfolio_widget });
      }
    });

    WidgetService.getFilmWidget({widget_type: "film"}).then(function(response){
      if (response.status === 200) {
        self.setState({ ediFilmWidgetForm: response.data.data.film_widget });
      }
    });

    PageSettingService.getFilmPage({page_type: "film"}).then(function(response){
      if (response.status === 200) {
        self.setState({ ediFilmPageForm: response.data.data.film_page });
      }
    });

    WidgetService.getServiceWidget({widget_type: "service"}).then(function(response){
      if (response.status === 200) {
        self.setState({ editServiceWidgetForm: response.data.data.service_widget });
      }
    });

    PageSettingService.getServicePage({page_type: "service"}).then(function(response){
      if (response.status === 200) {
        self.setState({ editServicePageForm: response.data.data.service_page });
      }
    });

    WidgetService.getTestimonialWidget({widget_type: "testimonial"}).then(function(response){
      if (response.status === 200) {
        self.setState({ editTestimonialWidgetForm: response.data.data.testimonial_widget });
      }
    });

    PageSettingService.getTestimonialPage({page_type: "testimonial"}).then(function(response){
      if (response.status === 200) {
        self.setState({ editTestimonialPageForm: response.data.data.testimonial_page });
      }
    });

    WidgetService.getAboutUsWidget({widget_type: "about_us"}).then(function(response){
      if (response.status === 200) {
        self.setState({ editAboutUsWidgetForm: response.data.data.about_us_widget });
      }
    });

    PageSettingService.getAboutUsPage({page_type: "about_us"}).then(function(response){
      if (response.status === 200) {
        self.setState({ editAboutUsPageForm: response.data.data.about_us_page });
      }
    });

    WidgetService.getContactUsWidget({widget_type: "contact_us"}).then(function(response){
      if (response.status === 200) {
        self.setState({ editContactUsWidgetForm: response.data.data.contact_us_widget });
      }
    });

    PageSettingService.getContactUsPage({page_type: "contact_us"}).then(function(response){
      if (response.status === 200) {
        self.setState({ editContactUsPageForm: response.data.data.contact_us_page });
      }
    });

    BlogService.getBlog().then(function(response){
      if (response.status === 200) {
        var response_data = response.data.data.blog
        const { is_show, blog_url } = response_data;
        self.setState({ 
          editBlogForm: {
            is_show: is_show,
            blog_url: blog_url
          } 
        });
      }
    });

    AlbumService.showPortfolio().then(function(response){
      if (response.status === 200) {
        var response_data = response.data.data.portfolio
        const { is_show, gallery_column } = response_data;
        self.setState({ 
          editPortfolioForm: {
            is_show: is_show,
            gallery_column: gallery_column
          } 
        });
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

  handleChange(e) {
    const editBlogForm = this.state.editBlogForm;
    var key = e.target.name;
    if (key === 'is_show') {
      editBlogForm[key] = e.target.checked;
    } else {
      editBlogForm[key] = e.target.value;
    }
    // editBlogForm[key] = str2bool(e.target.value);
    this.setState({
      editBlogForm
    });
  }

  handleWidgetChange(type, e) {
    const { editHomeWidgetForm, editPortfolioWidgetForm, ediFilmWidgetForm, editServiceWidgetForm, editTestimonialWidgetForm, editAboutUsWidgetForm, editContactUsWidgetForm } = this.state;
    var key = e.target.name;
    if (key === 'is_active') {
      type === "home" ? editHomeWidgetForm[key] = e.target.checked : 
      type === "portfolio" ? editPortfolioWidgetForm[key] = e.target.checked :
      type === "film" ? ediFilmWidgetForm[key] = e.target.checked :
      type === "service" ? editServiceWidgetForm[key] = e.target.checked : 
      type === "testimonial" ? editTestimonialWidgetForm[key] = e.target.checked :
      type === "about_us" ? editAboutUsWidgetForm[key] = e.target.checked :
      type === "contact_us" ? editContactUsWidgetForm[key] = e.target.checked : ''
    } else {
      type === "home" ? editHomeWidgetForm[key] = e.target.value : 
      type === "portfolio" ? editPortfolioWidgetForm[key] = e.target.value :
      type === "film" ? ediFilmWidgetForm[key] = e.target.value :
      type === "service" ? editServiceWidgetForm[key] = e.target.value : 
      type === "testimonial" ? editTestimonialWidgetForm[key] = e.target.value :
      type === "about_us" ? editAboutUsWidgetForm[key] = e.target.value :
      type === "contact_us" ? editContactUsWidgetForm[key] = e.target.value : ''
    }
    this.setState({
      editHomeWidgetForm,
      editPortfolioWidgetForm,
      ediFilmWidgetForm,
      editServiceWidgetForm,
      editTestimonialWidgetForm,
      editAboutUsWidgetForm,
      editContactUsWidgetForm
    });
  }

  handlePageSettingChange(type, e) {
    const { editHomePageForm, ediFilmPageForm, editServicePageForm, editTestimonialPageForm, editAboutUsPageForm, editContactUsPageForm } = this.state;
    var key = e.target.name;
    if (key === 'is_show') {
      type === "home" ? editHomePageForm[key] = e.target.checked : 
      type === "film" ? ediFilmPageForm[key] = e.target.checked :
      type === "service" ? editServicePageForm[key] = e.target.checked :
      type === "testimonial" ? editTestimonialPageForm[key] = e.target.checked : 
      type === "about_us" ? editAboutUsPageForm[key] = e.target.checked :
      type === "contact_us" ? editContactUsPageForm[key] = e.target.checked : ''
    }
    this.setState({
      editHomePageForm,
      ediFilmPageForm,
      editServicePageForm,
      editTestimonialPageForm,
      editAboutUsPageForm,
      editContactUsPageForm,
    });
  }

  handleChangePortfolio(e) {
    const editPortfolioForm = this.state.editPortfolioForm;
    var key = e.target.name;
    if (key === 'is_show') {
      editPortfolioForm[key] = e.target.checked;
    } else {
      editPortfolioForm[key] = e.target.value;
    }
    this.setState({
      editPortfolioForm
    });
  }

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

  handleSubmit(e) {
    var self = this;
    var callBlogApi = () => {};
    var editParams = {
      editBlogForm: { blog: self.state.editBlogForm }
    };
    callBlogApi = BlogService.updateBlog(editParams);

    callBlogApi
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

  handleWidgetSubmit(e, type) {
    var self = this;
    var editParams;
    var callBlogApi = () => {};
    if (type === "home") {
      editParams = {
        type: "home",
        id: self.state.editHomeWidgetForm.id,
        editHomeWidgetForm: { widget: self.state.editHomeWidgetForm }
      };
    }
    if (type === "portfolio") {
      editParams = {
        type: "portfolio",
        id: self.state.editPortfolioWidgetForm.id,
        editPortfolioWidgetForm: { widget: self.state.editPortfolioWidgetForm }
      };
    }
    if (type === "film") {
      editParams = {
        type: "film",
        id: self.state.ediFilmWidgetForm.id,
        ediFilmWidgetForm: { widget: self.state.ediFilmWidgetForm }
      };
    }
    if (type === "service") {
      editParams = {
        type: "service",
        id: self.state.editServiceWidgetForm.id,
        editServiceWidgetForm: { widget: self.state.editServiceWidgetForm }
      };
    }
    if (type === "testimonial") {
      editParams = {
        type: "testimonial",
        id: self.state.editTestimonialWidgetForm.id,
        editTestimonialWidgetForm: { widget: self.state.editTestimonialWidgetForm }
      };
    }
    if (type === "about_us") {
      editParams = {
        type: "about_us",
        id: self.state.editAboutUsWidgetForm.id,
        editAboutUsWidgetForm: { widget: self.state.editAboutUsWidgetForm }
      };
    }
    if (type === "contact_us") {
      editParams = {
        type: "contact_us",
        id: self.state.editContactUsWidgetForm.id,
        editContactUsWidgetForm: { widget: self.state.editContactUsWidgetForm }
      };
    }

    callBlogApi = WidgetService.updateWidget(editParams);

    callBlogApi
      .then(function(response) {
        self.setState({ errors: {} });
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

  handlePageSettingSubmit(e, type) {
    var self = this;
    var editParams;
    var callPageSettingApi = () => {};
    if (type === "home") {
      editParams = {
        type: "home",
        id: self.state.editHomePageForm.id,
        editHomePageForm: { page_setting: self.state.editHomePageForm }
      };
    }
    if (type === "film") {
      editParams = {
        type: "film",
        id: self.state.ediFilmPageForm.id,
        ediFilmPageForm: { page_setting: self.state.ediFilmPageForm }
      };
    }
    if (type === "service") {
      editParams = {
        type: "service",
        id: self.state.editServicePageForm.id,
        editServicePageForm: { page_setting: self.state.editServicePageForm }
      };
    }
    if (type === "testimonial") {
      editParams = {
        type: "testimonial",
        id: self.state.editTestimonialPageForm.id,
        editTestimonialPageForm: { page_setting: self.state.editTestimonialPageForm }
      };
    }
    if (type === "about_us") {
      editParams = {
        type: "about_us",
        id: self.state.editAboutUsPageForm.id,
        editAboutUsPageForm: { page_setting: self.state.editAboutUsPageForm }
      };
    }
    if (type === "contact_us") {
      editParams = {
        type: "contact_us",
        id: self.state.editContactUsPageForm.id,
        editContactUsPageForm: { page_setting: self.state.editContactUsPageForm }
      };
    }

    callPageSettingApi = PageSettingService.updatePageSetting(editParams);

    callPageSettingApi
      .then(function(response) {
        self.setState({ errors: {} });
        var responseData = response.data;
        if (response.status === 201) {
          // console.log(responseData);
        } else {
          console.log(responseData.errors);
        }
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
      // this.resetBlogForm();
    } else {
      console.log(responseData.errors);
    }
  }
  resetBlogForm() {
    this.setState({ editBlogForm: this.state.editBlogForm });
  }

  handleSubmitPortfolio(e) {
    var self = this;
    var callPorfolioApi = () => {};
    var editParams = {
      editPortfolioForm: { portfolio: self.state.editPortfolioForm }
    };
    callPorfolioApi = AlbumService.updatePortfolio(editParams);

    callPorfolioApi
      .then(function(response) {
        self.setState({ errors: {} });
        self.handelResponsePortfolio(response);
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

  handelResponsePortfolio(response) {
    var responseData = response.data;
    if (response.status === 201) {
      this.resetPortfolioForm();
    } else {
      console.log(responseData.errors);
    }
  }
  resetPortfolioForm() {
    this.setState({ editPortfolioForm: this.state.editPortfolioForm });
  }

  render() {
    const { aboutUs, contactDetail, tab, alert, editBlogForm, errors, editPortfolioForm, editHomeWidgetForm, editPortfolioWidgetForm, ediFilmWidgetForm, editServiceWidgetForm, editTestimonialWidgetForm, editAboutUsWidgetForm, editContactUsWidgetForm, editHomePageForm, ediFilmPageForm, editServicePageForm, editTestimonialPageForm, editAboutUsPageForm, editContactUsPageForm } = this.state;
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
              <Button className="btn-orange f-right">
                <Link
                  to={'/homepage_gallery'}
                  className="admin-login-btn"
                >
                  Manage Homepage Gallery
                </Link>
              </Button>
              <Col xs={12} className="p-none">
                <Col sm={6}>
                  <h5 className="f-left">Page Settings</h5>
                  <br/>
                  <form className="admin-side edit-about-form custom-form admin-settings-form">
                    <FormGroup className="custom-form-group">
                      <Checkbox
                        className=""
                        name="is_show"
                        value={''}
                        onClick={this.handlePageSettingChange.bind(this, "home")}
                        checked={editHomePageForm.is_show }
                      >
                        {' '}
                        <span>Show this Page in Front</span>
                        <div className="check">
                          <div className="inside" />
                        </div>
                      </Checkbox>
                    </FormGroup>
                    <Button
                      className="btn btn-orange edit-about-submit"
                      onClick={event => this.handlePageSettingSubmit(event, "home")}
                    >
                      Save
                    </Button>
                  </form>
                </Col>
                <Col sm={6}>
                  <h5 className="f-left">Widget</h5>
                  <br/>
                  <form className="admin-side edit-about-form custom-form admin-settings-form">
                    <FormGroup className="custom-form-group">
                      <Checkbox
                        className=""
                        name="is_active"
                        value={''}
                        onClick={this.handleWidgetChange.bind(this, "home")}
                        checked={editHomeWidgetForm.is_active }
                      >
                        {' '}
                        <span>Widget Active</span>
                        <div className="check">
                          <div className="inside" />
                        </div>
                      </Checkbox>
                    </FormGroup>
                    <FormGroup className="custom-form-group">
                      <ControlLabel className="custom-form-control-label">
                        Widget Title
                      </ControlLabel>
                      <FormControl
                        className="custom-form-control"
                        type="text"
                        name="title"
                        value={editHomeWidgetForm && editHomeWidgetForm.title ? editHomeWidgetForm.title : ''}
                        onChange={this.handleWidgetChange.bind(this, "home")}
                      />
                    </FormGroup>
                    <FormGroup className="custom-form-group required">
                      <ControlLabel className="custom-form-control-label">
                        Widget Code
                      </ControlLabel>
                      <FormControl
                        className="custom-form-control"
                        componentClass="textarea"
                        type="text"
                        name="code"
                        value={editHomeWidgetForm && editHomeWidgetForm.code ? editHomeWidgetForm.code : ''}
                        onChange={this.handleWidgetChange.bind(this, "home")}
                      />
                      {errors['code'] && editHomeWidgetForm.is_active && (
                        <span className="input-error text-red">
                          {errors['code']}
                        </span>
                      )}
                    </FormGroup>
                    <Button
                      className="btn btn-orange edit-about-submit"
                      onClick={event => this.handleWidgetSubmit(event, "home")}
                    >
                      Save
                    </Button>
                  </form>
                </Col>
              </Col>
            </Col>
          </Tab>
          <Tab eventKey="portfolio" title="Portfolio">
            <Col xs={12} className="site-content-filter p-none">
              <Button className="btn-orange f-right">
                <Link
                  to={'/albums'}
                  className="admin-login-btn"
                >
                  Manage Portfolio
                </Link>
              </Button>
              <h5 className="f-left">Portfolio</h5>
            </Col>
            <Col xs={12} className="p-none">
              <Col sm={6}>
              <h5 className="f-left">Page Settings</h5>
              <br/>
                <form className="admin-side edit-about-form custom-form admin-settings-form">
                <FormGroup className="custom-form-group">
                  <Checkbox
                    className=""
                    name="is_show"
                    value={''}
                    onClick={this.handleChangePortfolio.bind(this)}
                    checked={editPortfolioForm.is_show }
                  >
                    {' '}
                    <span>Show this Page in Front</span>
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Checkbox>
                </FormGroup>
                <FormGroup className="custom-form-group required">
                  <ControlLabel className="custom-form-control-label">
                    Gallery Columns
                  </ControlLabel>
                  <FormControl
                    className="custom-form-control"
                    type="number"
                    name="gallery_column"
                    value={editPortfolioForm && editPortfolioForm.gallery_column ? editPortfolioForm.gallery_column : ''}
                    onChange={this.handleChangePortfolio.bind(this)}
                  />
                  {errors['gallery_column'] && (
                    <span className="input-error text-red">
                      {errors['gallery_column']}
                    </span>
                  )}
                </FormGroup>
                <Button
                  className="btn btn-orange edit-about-submit"
                  onClick={event => this.handleSubmitPortfolio(event)}
                >
                  Save
                </Button>
              </form>
              </Col>
              <Col sm={6}>
                <h5 className="f-left">Widget</h5>
                <br/>
                <form className="admin-side edit-about-form custom-form admin-settings-form">
                  <FormGroup className="custom-form-group">
                    <Checkbox
                      className=""
                      name="is_active"
                      value={''}
                      onClick={this.handleWidgetChange.bind(this, "portfolio")}
                      checked={editPortfolioWidgetForm.is_active }
                    >
                      {' '}
                      <span>Widget Active</span>
                      <div className="check">
                        <div className="inside" />
                      </div>
                    </Checkbox>
                  </FormGroup>
                  <FormGroup className="custom-form-group">
                    <ControlLabel className="custom-form-control-label">
                      Widget Title
                    </ControlLabel>
                    <FormControl
                      className="custom-form-control"
                      type="text"
                      name="title"
                      value={editPortfolioWidgetForm && editPortfolioWidgetForm.title ? editPortfolioWidgetForm.title : ''}
                      onChange={this.handleWidgetChange.bind(this, "portfolio")}
                    />
                  </FormGroup>
                  <FormGroup className="custom-form-group required">
                    <ControlLabel className="custom-form-control-label">
                      Widget Code
                    </ControlLabel>
                    <FormControl
                      className="custom-form-control"
                      componentClass="textarea"
                      type="text"
                      name="code"
                      value={editPortfolioWidgetForm && editPortfolioWidgetForm.code ? editPortfolioWidgetForm.code : ''}
                      onChange={this.handleWidgetChange.bind(this, "portfolio")}
                    />
                    {errors['code'] && editPortfolioWidgetForm.is_active && (
                      <span className="input-error text-red">
                        {errors['code']}
                      </span>
                    )}
                  </FormGroup>
                  <Button
                    className="btn btn-orange edit-about-submit"
                    onClick={event => this.handleWidgetSubmit(event, "portfolio")}
                  >
                    Save
                  </Button>
                </form>
              </Col>
            </Col>
          </Tab>
          <Tab eventKey="films" title="Films">
            <Col xs={12} className="site-content-filter p-none">
              <Button className="btn-orange f-right">
                <Link
                  to={'/video_films'}
                  className="admin-login-btn"
                >
                  Manage Films
                </Link>
              </Button>
              <Col xs={12} className="p-none">
                <Col sm={6}>
                  <h5 className="f-left">Page Settings</h5>
                  <br/>
                  <form className="admin-side edit-about-form custom-form admin-settings-form">
                    <FormGroup className="custom-form-group">
                      <Checkbox
                        className=""
                        name="is_show"
                        value={''}
                        onClick={this.handlePageSettingChange.bind(this, "film")}
                        checked={ediFilmPageForm.is_show }
                      >
                        {' '}
                        <span>Show this Page in Front</span>
                        <div className="check">
                          <div className="inside" />
                        </div>
                      </Checkbox>
                    </FormGroup>
                    <Button
                      className="btn btn-orange edit-about-submit"
                      onClick={event => this.handlePageSettingSubmit(event, "film")}
                    >
                      Save
                    </Button>
                  </form>
                </Col>
                <Col sm={6}>
                  <h5 className="f-left">Widget</h5>
                  <br/>
                  <form className="admin-side edit-about-form custom-form admin-settings-form">
                    <FormGroup className="custom-form-group">
                      <Checkbox
                        className=""
                        name="is_active"
                        value={''}
                        onClick={this.handleWidgetChange.bind(this, "film")}
                        checked={ediFilmWidgetForm.is_active }
                      >
                        {' '}
                        <span>Widget Active</span>
                        <div className="check">
                          <div className="inside" />
                        </div>
                      </Checkbox>
                    </FormGroup>
                    <FormGroup className="custom-form-group">
                      <ControlLabel className="custom-form-control-label">
                        Widget Title
                      </ControlLabel>
                      <FormControl
                        className="custom-form-control"
                        type="text"
                        name="title"
                        value={ediFilmWidgetForm && ediFilmWidgetForm.title ? ediFilmWidgetForm.title : ''}
                        onChange={this.handleWidgetChange.bind(this, "film")}
                      />
                    </FormGroup>
                    <FormGroup className="custom-form-group required">
                      <ControlLabel className="custom-form-control-label">
                        Widget Code
                      </ControlLabel>
                      <FormControl
                        className="custom-form-control"
                        componentClass="textarea"
                        type="text"
                        name="code"
                        value={ediFilmWidgetForm && ediFilmWidgetForm.code ? ediFilmWidgetForm.code : ''}
                        onChange={this.handleWidgetChange.bind(this, "film")}
                      />
                      {errors['code'] && ediFilmWidgetForm.is_active && (
                        <span className="input-error text-red">
                          {errors['code']}
                        </span>
                      )}
                    </FormGroup>
                    <Button
                      className="btn btn-orange edit-about-submit"
                      onClick={event => this.handleWidgetSubmit(event, "film")}
                    >
                      Save
                    </Button>
                  </form>
                </Col>
              </Col>
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
              <Col xs={12} className="p-none">
                <Col sm={6}>
                  <h5 className="f-left">Page Settings</h5>
                  <br/>
                  <form className="admin-side edit-about-form custom-form admin-settings-form">
                    <FormGroup className="custom-form-group">
                      <Checkbox
                        className=""
                        name="is_show"
                        value={''}
                        onClick={this.handlePageSettingChange.bind(this, "service")}
                        checked={editServicePageForm.is_show }
                      >
                        {' '}
                        <span>Show this Page in Front</span>
                        <div className="check">
                          <div className="inside" />
                        </div>
                      </Checkbox>
                    </FormGroup>
                    <Button
                      className="btn btn-orange edit-about-submit"
                      onClick={event => this.handlePageSettingSubmit(event, "service")}
                    >
                      Save
                    </Button>
                  </form>
                </Col>
                <Col sm={6}>
                  <h5 className="f-left">Widget</h5>
                  <br/>
                  <form className="admin-side edit-about-form custom-form admin-settings-form">
                    <FormGroup className="custom-form-group">
                      <Checkbox
                        className=""
                        name="is_active"
                        value={''}
                        onClick={this.handleWidgetChange.bind(this, "service")}
                        checked={editServiceWidgetForm.is_active }
                      >
                        {' '}
                        <span>Widget Active</span>
                        <div className="check">
                          <div className="inside" />
                        </div>
                      </Checkbox>
                    </FormGroup>
                    <FormGroup className="custom-form-group">
                      <ControlLabel className="custom-form-control-label">
                        Widget Title
                      </ControlLabel>
                      <FormControl
                        className="custom-form-control"
                        type="text"
                        name="title"
                        value={editServiceWidgetForm && editServiceWidgetForm.title ? editServiceWidgetForm.title : ''}
                        onChange={this.handleWidgetChange.bind(this, "service")}
                      />
                    </FormGroup>
                    <FormGroup className="custom-form-group required">
                      <ControlLabel className="custom-form-control-label">
                        Widget Code
                      </ControlLabel>
                      <FormControl
                        className="custom-form-control"
                        componentClass="textarea"
                        type="text"
                        name="code"
                        value={editServiceWidgetForm && editServiceWidgetForm.code ? editServiceWidgetForm.code : ''}
                        onChange={this.handleWidgetChange.bind(this, "service")}
                      />
                      {errors['code'] && editServiceWidgetForm.is_active && (
                        <span className="input-error text-red">
                          {errors['code']}
                        </span>
                      )}
                    </FormGroup>
                    <Button
                      className="btn btn-orange edit-about-submit"
                      onClick={event => this.handleWidgetSubmit(event, "service")}
                    >
                      Save
                    </Button>
                  </form>
                </Col>
              </Col>
            </Col>
            <br/>
            <ServiceModule
              services={this.state.services}
              showEditPopup={this.showEditPopup}
              admin_service={this.state.admin_service}
              showDialogueBox={this.showDialogueBox.bind(this)}
            />
          </Tab>
          <Tab eventKey="testimonials" title="Testimonials">
            <Col xs={12} className="site-content-filter p-none">
              <Button className="btn-orange f-right">
                <Link
                  to={'/testimonials'}
                  className="admin-login-btn"
                >
                  Manage Testimonials
                </Link>
              </Button>
              <Col xs={12} className="p-none">
                <Col sm={6}>
                  <h5 className="f-left">Page Settings</h5>
                  <br/>
                  <form className="admin-side edit-about-form custom-form admin-settings-form">
                    <FormGroup className="custom-form-group">
                      <Checkbox
                        className=""
                        name="is_show"
                        value={''}
                        onClick={this.handlePageSettingChange.bind(this, "testimonial")}
                        checked={editTestimonialPageForm.is_show }
                      >
                        {' '}
                        <span>Show this Page in Front</span>
                        <div className="check">
                          <div className="inside" />
                        </div>
                      </Checkbox>
                    </FormGroup>
                    <Button
                      className="btn btn-orange edit-about-submit"
                      onClick={event => this.handlePageSettingSubmit(event, "testimonial")}
                    >
                      Save
                    </Button>
                  </form>
                </Col>
                <Col sm={6}>
                  <h5 className="f-left">Widget</h5>
                  <br/>
                  <form className="admin-side edit-about-form custom-form admin-settings-form">
                    <FormGroup className="custom-form-group">
                      <Checkbox
                        className=""
                        name="is_active"
                        value={''}
                        onClick={this.handleWidgetChange.bind(this, "testimonial")}
                        checked={editTestimonialWidgetForm.is_active }
                      >
                        {' '}
                        <span>Widget Active</span>
                        <div className="check">
                          <div className="inside" />
                        </div>
                      </Checkbox>
                    </FormGroup>
                    <FormGroup className="custom-form-group">
                      <ControlLabel className="custom-form-control-label">
                        Widget Title
                      </ControlLabel>
                      <FormControl
                        className="custom-form-control"
                        type="text"
                        name="title"
                        value={editTestimonialWidgetForm && editTestimonialWidgetForm.title ? editTestimonialWidgetForm.title : ''}
                        onChange={this.handleWidgetChange.bind(this, "testimonial")}
                      />
                    </FormGroup>
                    <FormGroup className="custom-form-group required">
                      <ControlLabel className="custom-form-control-label">
                        Widget Code
                      </ControlLabel>
                      <FormControl
                        className="custom-form-control"
                        componentClass="textarea"
                        type="text"
                        name="code"
                        value={editTestimonialWidgetForm && editTestimonialWidgetForm.code ? editTestimonialWidgetForm.code : ''}
                        onChange={this.handleWidgetChange.bind(this, "testimonial")}
                      />
                      {errors['code'] && editServiceWidgetForm.is_active && (
                        <span className="input-error text-red">
                          {errors['code']}
                        </span>
                      )}
                    </FormGroup>
                    <Button
                      className="btn btn-orange edit-about-submit"
                      onClick={event => this.handleWidgetSubmit(event, "testimonial")}
                    >
                      Save
                    </Button>
                  </form>
                </Col>
              </Col>
            </Col>
          </Tab>
          <Tab eventKey="blog" title="Blog">
            <Col className="edit-about-content-wrap" sm={6}>
              <form className="admin-side edit-about-form custom-form admin-settings-form">
                <FormGroup className="custom-form-group">
                  <Checkbox
                    className=""
                    name="is_show"
                    value={''}
                    onClick={this.handleChange.bind(this)}
                    checked={editBlogForm.is_show }
                  >
                    {' '}
                    <span>Show this Page</span>
                    <div className="check">
                      <div className="inside" />
                    </div>
                  </Checkbox>
                </FormGroup>
                <FormGroup className="custom-form-group required">
                  <ControlLabel className="custom-form-control-label">
                    Blog URL
                  </ControlLabel>
                  <FormControl
                    className="custom-form-control"
                    type="text"
                    name="blog_url"
                    value={editBlogForm && editBlogForm.blog_url ? editBlogForm.blog_url : ''}
                    onChange={this.handleChange.bind(this)}
                  />
                  {errors['blog_url'] && (
                    <span className="input-error text-red">
                      {errors['blog_url']}
                    </span>
                  )}
                </FormGroup>
                <Button
                  className="btn btn-orange edit-about-submit"
                  onClick={event => this.handleSubmit(event)}
                >
                  Save
                </Button>
              </form>
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
            <Col xs={12} className="p-none">
              <Col className="edit-about-content-wrap"  sm={6}>
                <h5 className="f-left">Page Settings</h5>
                <br/>
                <form className="admin-side edit-about-form custom-form admin-settings-form">
                  <FormGroup className="custom-form-group">
                    <Checkbox
                      className=""
                      name="is_show"
                      value={''}
                      onClick={this.handlePageSettingChange.bind(this, "about_us")}
                      checked={editAboutUsPageForm.is_show }
                    >
                      {' '}
                      <span>Show this Page in Front</span>
                      <div className="check">
                        <div className="inside" />
                      </div>
                    </Checkbox>
                  </FormGroup>
                  <Button
                    className="btn btn-orange edit-about-submit"
                    onClick={event => this.handlePageSettingSubmit(event, "about_us")}
                  >
                    Save
                  </Button>
                </form>
              </Col>
              <Col className="edit-about-content-wrap"  sm={6}>
                <h5 className="f-left">Widget</h5>
                <br/>
                <form className="admin-side edit-about-form custom-form admin-settings-form">
                  <FormGroup className="custom-form-group">
                    <Checkbox
                      className=""
                      name="is_active"
                      value={''}
                      onClick={this.handleWidgetChange.bind(this, "about_us")}
                      checked={editAboutUsWidgetForm.is_active }
                    >
                      {' '}
                      <span>Widget Active</span>
                      <div className="check">
                        <div className="inside" />
                      </div>
                    </Checkbox>
                  </FormGroup>
                  <FormGroup className="custom-form-group">
                    <ControlLabel className="custom-form-control-label">
                      Widget Title
                    </ControlLabel>
                    <FormControl
                      className="custom-form-control"
                      type="text"
                      name="title"
                      value={editAboutUsWidgetForm && editAboutUsWidgetForm.title ? editAboutUsWidgetForm.title : ''}
                      onChange={this.handleWidgetChange.bind(this, "about_us")}
                    />
                  </FormGroup>
                  <FormGroup className="custom-form-group required">
                    <ControlLabel className="custom-form-control-label">
                      Widget Code
                    </ControlLabel>
                    <FormControl
                      className="custom-form-control"
                      componentClass="textarea"
                      type="text"
                      name="code"
                      value={editAboutUsWidgetForm && editAboutUsWidgetForm.code ? editAboutUsWidgetForm.code : ''}
                      onChange={this.handleWidgetChange.bind(this, "about_us")}
                    />
                    {errors['code'] && editAboutUsWidgetForm.is_active && (
                      <span className="input-error text-red">
                        {errors['code']}
                      </span>
                    )}
                  </FormGroup>
                  <Button
                    className="btn btn-orange edit-about-submit"
                    onClick={event => this.handleWidgetSubmit(event, "about_us")}
                  >
                    Save
                  </Button>
                </form>
              </Col>
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
            <Col xs={12} className="p-none">
              <Col className="edit-about-content-wrap"  sm={6}>
                <h5 className="f-left">Page Settings</h5>
                <br/>
                <form className="admin-side edit-about-form custom-form admin-settings-form">
                  <FormGroup className="custom-form-group">
                    <Checkbox
                      className=""
                      name="is_show"
                      value={''}
                      onClick={this.handlePageSettingChange.bind(this, "contact_us")}
                      checked={editContactUsPageForm.is_show }
                    >
                      {' '}
                      <span>Show this Page in Front</span>
                      <div className="check">
                        <div className="inside" />
                      </div>
                    </Checkbox>
                  </FormGroup>
                  <Button
                    className="btn btn-orange edit-about-submit"
                    onClick={event => this.handlePageSettingSubmit(event, "contact_us")}
                  >
                    Save
                  </Button>
                </form>
              </Col>
              <Col className="edit-about-content-wrap" sm={6}>
                <h5 className="f-left">Widget</h5>
                <br/>
                <form className="admin-side edit-about-form custom-form admin-settings-form">
                  <FormGroup className="custom-form-group">
                    <Checkbox
                      className=""
                      name="is_active"
                      value={''}
                      onClick={this.handleWidgetChange.bind(this, "contact_us")}
                      checked={editContactUsWidgetForm.is_active }
                    >
                      {' '}
                      <span>Widget Active</span>
                      <div className="check">
                        <div className="inside" />
                      </div>
                    </Checkbox>
                  </FormGroup>
                  <FormGroup className="custom-form-group">
                    <ControlLabel className="custom-form-control-label">
                      Widget Title
                    </ControlLabel>
                    <FormControl
                      className="custom-form-control"
                      type="text"
                      name="title"
                      value={editContactUsWidgetForm && editContactUsWidgetForm.title ? editContactUsWidgetForm.title : ''}
                      onChange={this.handleWidgetChange.bind(this, "contact_us")}
                    />
                  </FormGroup>
                  <FormGroup className="custom-form-group required">
                    <ControlLabel className="custom-form-control-label">
                      Widget Code
                    </ControlLabel>
                    <FormControl
                      className="custom-form-control"
                      componentClass="textarea"
                      type="text"
                      name="code"
                      value={editContactUsWidgetForm && editContactUsWidgetForm.code ? editContactUsWidgetForm.code : ''}
                      onChange={this.handleWidgetChange.bind(this, "contact_us")}
                    />
                    {errors['code'] && editServiceWidgetForm.is_active && (
                      <span className="input-error text-red">
                        {errors['code']}
                      </span>
                    )}
                  </FormGroup>
                  <Button
                    className="btn btn-orange edit-about-submit"
                    onClick={event => this.handleWidgetSubmit(event, "contact_us")}
                  >
                    Save
                  </Button>
                </form>
              </Col>
            </Col>
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

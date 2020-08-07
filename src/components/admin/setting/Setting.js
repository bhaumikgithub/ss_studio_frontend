import React, { Component } from 'react';
import { Col, Tab, Tabs, Checkbox, Button, ControlLabel, FormControl, FormGroup, Thumbnail, Row } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';
import SweetAlert from 'sweetalert-react';
// Import component
import validationHandler from '../../common/ValidationHandler';
import SocialMediaPopup from './SocialMediaPopup';

// Import services
import { WatermarkService,UserService, WebsiteDetailService, AboutService } from '../../../services/Index';

// Import helper
import { str2bool, isObjectEmpty } from '../../Helper';

// Import css
import '../../../assets/css/admin/site-content/site-content.css';
import '../../../assets/css/contact/services.css';
import ColorTheme from './ColorTheme';

export default class SiteContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editObject: {},
      watermarks: [],
      userLogo: [],
      websiteDetail: {},
      socialMedia: {},
      faviconImage: [],
      tab: 'social_media',
      EditWebsiteForm: {
        title: '',
        copyright_text: '',
        meta_keywords: '',
        meta_description: ''
      },
      errors: {},
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
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditWatermarkClick = this.handleEditWatermarkClick.bind(this)
    this.handleSocialMediaModal = this.handleSocialMediaModal.bind(this);
  }

  componentWillMount() {
    var self = this;
    WatermarkService.getWatermark().then(function(response) {
      if (response.status === 200) {
        self.setState({
          watermarks: response.data.data.watermarks
        });
      }
    });

    WebsiteDetailService.getWebsiteDetail().then(function(response) {
      if (response.status === 200) {
        var response_data = response.data.data.website_detail
        const { title, meta_keywords, meta_description, copyright_text } = response_data;
        self.setState({
          EditWebsiteForm: {
            title: title,
            meta_keywords: meta_keywords,
            meta_description: meta_description,
            copyright_text: copyright_text
          }
        });
      }
    });

    UserService.getCurrentUser().then(function(response) {
      if (response.status === 200) {
        self.setState({
          userLogo: response.data.data.user.user_logo,
          websiteDetail: response.data.data.user.website_detail,
          faviconImage: response.data.data.user.website_detail.favicon_image
        });
      }
    });

    AboutService.getAboutUs().then(function(response) {
      if (response.status === 200) {
        self.setState({
          socialMedia: response.data.data.about_us.social_links
        });
      }
    });
  }

  handleTabSelect(key) {
    this.setState({ tab: key });
  }

  handleWatermarkModel(event, id) {
    var self = this;
    var status = 'active';
    if (event.target.checked) {
      status = 'active';
    } else {
      status = 'inactive';
    }

    var editParams = {
      id: id,
      watermark: { status: status }
    };
    WatermarkService.updateWatermark(editParams, id)
      .then(function(response) {
        var responseData = response.data;
        if (response.status === 201) {
          var watermark = [responseData.data.watermark];
          self.setState({watermarks: watermark})
        }
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  handleUploadFile = e => {
    e.preventDefault();

    var self = this;
    let file = e.target.files[0];
    let data = new FormData();
    data.append('user_logo[photo_attributes][image]', file);
    if (self.state.userLogo == null){
      UserService.createUserLogo(data)
      .then(function(response) {
        self.handleSuccessResponse(response);
      })
      .catch(function(error) {
        console.log(error.response);
      });
    }
    else{
      UserService.updateUserLogo(data,self.state.userLogo.id)
        .then(function(response) {
          self.handleSuccessResponse(response);
        })
        .catch(function(error) {
          console.log(error.response);
        });
    }
  };

  handleWatermarkUpload (e, id) {
    e.preventDefault();
    var self = this;
    let file = e.target.files[0];
    let data = new FormData();
    data.append('watermark[watermark_image]', file);
    if (self.state.watermarks.length === 0){
      WatermarkService.createWatermark(data)
      .then(function(response) {
        self.handleWatermarkSuccessResponse(response);
      })
      .catch(function(error) {
        console.log(error.response);
      });
    }
    else{
      WatermarkService.updateWatermark(data,id)
        .then(function(response) {
          self.handleWatermarkSuccessResponse(response);
        })
        .catch(function(error) {
          console.log(error.response);
        });
    }
  }

  handleUploadFaviconImage = e =>{
    e.preventDefault();

    var self = this;
    let file = e.target.files[0];
    let data = new FormData();
    data.append('website_detail[favicon_image]', file);
      WebsiteDetailService.updateFaviconImage(data)
        .then(function(response) {
          if (response.status === 201) {
            self.setState({websiteDetail: response.data.data.website_detail})
          }
        })
        .catch(function(error) {
          console.log(error.response);
        });
  }

  handleSuccessResponse(response) {
    if (response.status === 201) {
      this.handlePhotoRendering(response);
    }
  }

  handleWatermarkSuccessResponse(response){
    if (response.status === 201) {
      var watermark = [response.data.data.watermark];
      this.setState({watermarks: watermark})
    }
  }

  handlePhotoRendering(response) {
    var UpdatePhoto = response.data.data.user_logo;
    this.setState({ userLogo: UpdatePhoto });
  };

  handleEditClick(e) {
    var inputField = document.getElementById("about_photo_edit")
    inputField.click();
  }

  handleEditWatermarkClick(e){
    var inputField = document.getElementById("watermark_photo_edit")
    inputField.click();
  }

  handleEditFaviconImageClick(e){
    var inputField = document.getElementById("favicon_image_edit")
    inputField.click();
  }

  handleChange(e) {
    const EditWebsiteForm = this.state.EditWebsiteForm;
    var key = e.target.name;
    EditWebsiteForm[key] = str2bool(e.target.value);
    this.setState({
        EditWebsiteForm
    });
  }

  handleSubmit(e) {
    var self = this;
    var callWebsiteDetailApi = () => {};
    var editParams = {
      EditWebsiteForm: { website_detail: self.state.EditWebsiteForm, is_site_setting: true }
    };
    callWebsiteDetailApi = WebsiteDetailService.updateWebsiteDetail(editParams);

    callWebsiteDetailApi
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

  handelResponse(response) {
    var responseData = response.data;
    if (response.status === 201) {
      this.resetWebsiteDetailForm();
    } else {
      console.log(responseData.errors);
    }
  }

  resetWebsiteDetailForm() {
    this.setState({ EditWebsiteForm: this.state.EditWebsiteForm });
  }

  SocialMediaCloseModal = () => {
    this.setState({ AddSocialMediaShow: false, editObject: {} });
  };

  renderSocialMedia = (social_link, action) => {
    const social_links = social_link;
    this.setState({
      socialMedia: social_links
    });
  };

  handleSocialMediaModal() {
    this.setState({ AddSocialMediaShow: true });
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
        confirmAction: () => this.deleteSocialMedia(),
        cancelBtn: true
      }
    });
  }

  hideDialogueBox() {
    this.setState({ alert: { show: false } });
  }
  deleteSocialMedia() {
    var self = this;
    const item = self.state.alert.objectId;
    var newMedia = Object.assign({}, self.state.socialMedia);

    Object.entries(newMedia).map(([key, value]) => {
      if (item === key) {
        newMedia[key] = '';
      }
      return newMedia;
    });

    self.setState({ socialMedia: newMedia });
    var editParams = {
      about: self.state.socialMedia
    };
    AboutService.updateAboutUs(editParams)
      .then(function(response) {
        self.handelSocialMediaResponse(response);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  handelSocialMediaResponse(response) {
    var responseData = response.data;
    if (response.status === 201) {
      this.hideDialogueBox();
    } else {
      console.log(responseData.errors);
    }
  }

  render() {
    const { tab, watermarks, userLogo, faviconImage, websiteDetail, EditWebsiteForm, errors, socialMedia, alert } = this.state;
    var socialMediaLink = '';
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
        {this.state.AddSocialMediaShow && (
          <SocialMediaPopup
            AddSocialMediaShow={this.state.AddSocialMediaShow}
            SocialMediaCloseModal={this.SocialMediaCloseModal}
            editObject={this.state.editObject}
            renderSocialMedia={this.renderSocialMedia}
          />
        )}
        <Tabs
          defaultActiveKey={tab}
          onSelect={this.handleTabSelect}
          id="uncontrolled-tab-example"
          className="site-content-tabs"
        >
          <Tab eventKey="social_media" title="Social Media">
            <Col xs={12} className="site-content-filter p-none">
              <Button
                className="btn btn-orange pull-right add-new-service"
                onClick={this.handleSocialMediaModal}
              >
                <i className="fa fa-plus add-service-icon" />Add New
              </Button>
            </Col>
            <Col>
              {socialMedia &&
                Object.keys(socialMedia).map(
                  social_link =>
                    socialMedia[social_link] !== '' ? (
                      <Col
                        xs={12}
                        sm={6}
                        md={4}
                        className="service-thumb-wrap"
                        key={socialMedia[social_link]}
                      >
                        <Thumbnail className="service-thumbs">
                          <SocialIcon
                            url={
                              'http://www.' +
                              (socialMediaLink = social_link.replace(
                                '_link',
                                ''
                              )) +
                              '.com'
                            }
                            className="social-media-margin"
                          />
                          <Col className="sevice-details">
                            <h4 className="service-title text-center">
                              {socialMediaLink}
                            </h4>
                            <Col className="p-none service-description">
                              <a
                                href={!isObjectEmpty(socialMedia) && !isObjectEmpty(socialMedia[social_link]) && socialMedia[social_link].includes('http') ? socialMedia[social_link] : 'http://'+socialMedia[social_link]}
                                target="_blank"
                              >
                                {socialMedia[social_link]}
                              </a>
                            </Col>
                          </Col>
                          <a className="edit-service-thumb custom-service-thumb">
                            <Button
                              className="btn-link p-none edit-testimonial-btn"
                              onClick={() =>
                                this.setState({
                                  AddSocialMediaShow: true,
                                  editObject: {
                                    soical_media_title: social_link,
                                    social_link: socialMedia[social_link]
                                  }
                                })}
                            >
                              <img
                                src={require('../../../assets/images/admin/album/edit-icon.png')}
                                alt=""
                                className="service-edit-icon"
                              />
                            </Button>
                          </a>
                          <a className="edit-service-thumb custom-service-thumb social-media-delete">
                            <Button
                              className="btn-link p-none video-action-btn video-delete-btn delete-social-media"
                              onClick={() => this.showDialogueBox(social_link)}
                            >
                              <img
                                src={require('../../../assets/images/admin/album/delete-icon.png')}
                                alt=""
                                className="service-edit-icon"
                              />
                            </Button>
                          </a>
                        </Thumbnail>
                      </Col>
                    ) : (
                      ''
                    )
                )}
            </Col>
          </Tab>
          <Tab
            eventKey="watermark"
            title="Watermark"
            className="about-site-content"
          >
            <Col xs={12} className="site-content-filter p-none" />
            {watermarks.length === 0 &&
              <Col className="content-about-img-wrap watermark-content-img">
              <a className="img-edit-btn" onClick={this.handleEditWatermarkClick}>
                <img
                  src={require('../../../assets/images/admin/site-content/edit-icon.png')}
                  alt=""
                />
                <input
                  id="watermark_photo_edit"
                  ref="fileField"
                  type="file"
                  onChange={e => this.handleWatermarkUpload(e,'')}
                />
              </a>
            </Col>
            }
            {watermarks &&
              watermarks.map((watermark, index) => (
                <Row>
                  <Col xs={12} className="setting-tab-content p-none" key={index}>
                    <Col className="content-about-img-wrap watermark-content-img">
                      {watermark && watermark.original_image && (
                        <img
                          className="img-responsive content-user-image"
                          src={watermark.original_image}
                          alt="user"
                        />
                      )}
                      <a className="img-edit-btn" onClick={this.handleEditWatermarkClick}>
                        <img
                          src={require('../../../assets/images/admin/site-content/edit-icon.png')}
                          alt=""
                        />
                        <input
                          id="watermark_photo_edit"
                          ref="fileField"
                          type="file"
                          onChange={e => this.handleWatermarkUpload(e, watermark.id)}
                        />
                      </a>
                    </Col>
                    <Col className="right-content-wrap text-grey">
                      <Row>
                      <Col xs={12} className="about-content-wrap">
                        <Checkbox
                          name="active-checkbox"
                          className=" album-status-checkboxes"
                          defaultChecked={
                            watermark.status === 'active' ? true : false
                          }
                          onClick={event =>
                            this.handleWatermarkModel(event, watermark.id)}
                        >
                          Add watermark while uploading photos
                          <div className="check">
                            <div className="inside" />
                          </div>
                        </Checkbox>
                      </Col>
                      </Row>
                      <Row>
                        <Col className="col-sm-9 col-xs-12">
                          <h4 className="preview-text">Preview</h4>
                          <img
                            alt=""
                            src={watermark.status === 'active' ? watermark.dummy_image : "https://www.crystalclear-systems.com/wp-content/uploads/2016/12/dummy-image.jpg"}
                            className="image-responsive"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Col>
                </Row>
              ))}
          </Tab>
          <Tab
            eventKey="logo"
            title="Logo"
            className="about-site-content"
          >
            <Col xs={12} className="setting-tab-content p-none mt-30">
              <Col className="content-about-img-wrap">
                {userLogo && userLogo.image && (
                  <img
                    className="img-responsive content-user-image"
                    src={userLogo.image}
                    alt="user"
                  />
                )}

                <a className="img-edit-btn" onClick={this.handleEditClick}>
                  <img
                    src={require('../../../assets/images/admin/site-content/edit-icon.png')}
                    alt=""
                  />
                  <input
                    id="about_photo_edit"
                    ref="fileField"
                    type="file"
                    onChange={e => this.handleUploadFile(e)}
                  />
                </a>
              </Col>
            </Col>
          </Tab>
          <Tab
            eventKey="site_title_favicon"
            title="Favicon & Site Title"
            className="about-site-content"
          >
          <Col xs={12} className="setting-tab-content p-none mt-30">
            <Col xs={12} className="p-none">
              <Col className="content-about-img-wrap watermark-content-img favicon-wrap">
                {websiteDetail && websiteDetail.favicon_image && (
                  <img
                    className="img-responsive content-user-image"
                    src={websiteDetail.favicon_image}
                    alt="user"
                  />
                )}
                <a className="img-edit-btn" onClick={this.handleEditFaviconImageClick}>
                  <img
                    src={require('../../../assets/images/admin/site-content/edit-icon.png')}
                    alt=""
                  />
                  <input
                    id="favicon_image_edit"
                    ref="fileField"
                    type="file"
                    onChange={e => this.handleUploadFaviconImage(e)}
                  />
                </a>
              </Col>
            </Col>
            <Col className="edit-about-content-wrap" sm={6}>
              <form className="admin-side edit-about-form custom-form admin-settings-form">
                <FormGroup className="custom-form-group required">
                  <ControlLabel className="custom-form-control-label">
                    Site Title
                  </ControlLabel>
                  <FormControl
                    className="custom-form-control"
                    type="text"
                    name="title"
                    value={EditWebsiteForm ? EditWebsiteForm.title : ''}
                    onChange={this.handleChange.bind(this)}
                  />
                  {errors['title'] && (
                    <span className="input-error text-red">
                      {errors['title']}
                    </span>
                  )}
                </FormGroup>
                <FormGroup className="custom-form-group required">
                  <ControlLabel className="custom-form-control-label">
                      Copyright Text
                  </ControlLabel>
                  <FormControl
                    className="custom-form-control num-input"
                    type="text"
                    name="copyright_text"
                    value={EditWebsiteForm.copyright_text}
                    onChange={this.handleChange.bind(this)}
                  />
                  {errors['copyright_text'] && (
                    <span className="input-error text-red">
                      {errors['copyright_text']}
                    </span>
                  )}
                </FormGroup>
                <FormGroup className="custom-form-group">
                  <ControlLabel className="custom-form-control-label">
                    Keywords
                  </ControlLabel>
                  <FormControl
                    className="custom-form-control"
                    type="text"
                    name="meta_keywords"
                    value={EditWebsiteForm && EditWebsiteForm.meta_keywords ? EditWebsiteForm.meta_keywords : ''}
                    onChange={this.handleChange.bind(this)}
                  />
                </FormGroup>
                <FormGroup className="custom-form-group">
                  <ControlLabel className="custom-form-control-label">
                    Description
                  </ControlLabel>

                  <FormControl
                    className="custom-form-control"
                    componentClass="textarea"
                    type="text"
                    name="meta_description"
                    value={EditWebsiteForm && EditWebsiteForm.meta_description ? EditWebsiteForm.meta_description : ''}
                    onChange={this.handleChange.bind(this)}
                  />
                </FormGroup>
                <Button
                  className="btn btn-orange edit-about-submit"
                  onClick={event => this.handleSubmit(event)}
                >
                  Save
                </Button>
              </form>
            </Col>
          </Col>
          </Tab>
          <Tab eventKey="theme" title="Theme">
            <Col xs={12} className="p-none">
              <ColorTheme />
            </Col>
          </Tab>
        </Tabs>
      </Col>
    );
  }
}

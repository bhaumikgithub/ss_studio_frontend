import React, { Component } from 'react';
import { Col, Tab, Tabs, Checkbox, Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
// Import component
import validationHandler from '../../common/ValidationHandler';

// Import services
import { WatermarkService,UserService, WebsiteDetailService } from '../../../services/Index';

// Import helper
import { str2bool } from '../../Helper';

// Import css
import '../../../assets/css/admin/site-content/site-content.css';
import '../../../assets/css/contact/services.css';

export default class SiteContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watermarks: [],
      userLogo: [],
      websiteDetail: {},
      faviconImage: [],
      tab: 'watermark',
      EditWebsiteForm: {
        title: '',
        copyright_text: '',
        meta_keywords: '',
        meta_description: ''
      },
      errors: {}
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditWatermarkClick = this.handleEditWatermarkClick.bind(this)
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

  render() {
    const { tab, watermarks, userLogo, faviconImage, websiteDetail, EditWebsiteForm, errors } = this.state;
    return (
      <Col xs={12} className="site-content-wrap">
        <Tabs
          defaultActiveKey={tab}
          onSelect={this.handleTabSelect}
          id="uncontrolled-tab-example"
          className="site-content-tabs"
        >
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
                <Col xs={12} className="p-none" key={index}>
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
                    <h4 className="col-sm-6 preview-text">Preview</h4>
                    <img
                      alt=""
                      src={watermark.status === 'active' ? watermark.dummy_image : "https://www.crystalclear-systems.com/wp-content/uploads/2016/12/dummy-image.jpg"}
                      className="dummy-image"
                    />
                  </Col>
                </Col>
              ))}
          </Tab>
          <Tab
            eventKey="logo"
            title="Logo"
            className="about-site-content"
          >
            <Col xs={12} className="p-none">
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
                  value={EditWebsiteForm.title}
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
                  value={EditWebsiteForm.meta_keywords}
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
                  value={EditWebsiteForm.meta_description}
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
          </Tab>
        </Tabs>
      </Col>
    );
  }
}

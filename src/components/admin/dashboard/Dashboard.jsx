import React, { Component } from 'react';
import { Col, Button, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//import css
import '../../../assets/css/admin/category/categories.css';

// Import services
import { ProfileCompletenessService } from '../../../services/Index';

// Import helper
import { currentUser } from '../../Helper';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileCompleteness: {},
      letsDoLink: "",
      parentOfNextTask: "",
      nextTaskName: ""
    };
  }
  // componentWillMount() {
  //   var self = this;
  //   ProfileCompletenessService.getProfileCompleteness()
  //   .then(function(response) {
  //     var data = response.data;
  //     self.setState({
  //       profileCompleteness: data.data.profile_completeness
  //     });
  //   })
  //   .catch(function(error) {
  //     console.log(error.response);
  //   });
  // }
  componentDidMount(){
    var self = this;
    ProfileCompletenessService.getProfileCompleteness()
    .then(function(response) {
      var data = response.data;
      self.setState({
        profileCompleteness: data.data.profile_completeness
      },()=>self.letsDoLink());
    })
    .catch(function(error) {
      console.log(error.response);
    });
  }
  letsDoLink(){
    var next_task_info = document.getElementsByClassName('text-red')[0]
    var parent_name = next_task_info.parentNode.getElementsByClassName('checkbox-heading')[0].textContent
    var link = next_task_info.href.substring(next_task_info.href.lastIndexOf("/"))
    this.setState({letsDoLink: link, nextTaskName: next_task_info.text, parentOfNextTask: parent_name})
  }
  render() {
    const {profileCompleteness, letsDoLink, nextTaskName, parentOfNextTask} = this.state
    return (
      <Col xs={12} className="categories-page-wrap">
        <Col xs={12} className="filter-wrap p-none">
        {profileCompleteness.user_subscription_expire &&
          <Col xs={12} className="subscription-expired-message">{"Your subscription is expired on " + profileCompleteness.user_subscription_expire_date + ". Please manage subscription by clicking here."} <Link to={'/plan_profile'}>Manage Subscription</Link>
          </Col>
        }
        {profileCompleteness.user_subscription_future_expired_date &&
          <Col xs={12} className="subscription-will-be-expired-message">{"Subscription will be ended on " + profileCompleteness.user_subscription_future_expired_date + ". Please manage subscription by clicking here."} <Link to={'/plan_profile'}>Manage</Link>
          </Col>
        }
        </Col>

        <Col xs={12} className="p-none">
          <div className="categories-table-wrap custom-pad row">
            <div className="col-md-6">
              <div className="count-box-par d-flex justify-content-center align-items-center text-center">
                <div className="count-box">
                  <Link to={'/albums'}>
                    <div className="content">
                      <h2 className="count-no album-count">{profileCompleteness.public_album}</h2>
                      <label className="title album-count">Public Albums</label>
                    </div>
                  </Link>
                </div>
                <div className="count-box">
                  <Link to={'/albums'}>
                    <div className="content">
                      <h2 className="count-no album-count">{profileCompleteness.private_album}</h2>
                      <label className="title album-count">Private Albums</label>
                    </div>
                  </Link>
                </div>
                <div className="count-box">
                  <Link to={'/albums'}>
                    <div className="content">
                      <h2 className="count-no album-count">{profileCompleteness.total_album}</h2>
                      <label className="title album-count">Total Albums</label>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="public-url-strip">
                {window !== undefined &&
                  <Link to={'/'+currentUser().alias} target="_blank">
                    <h5 className="profile-completeness-instruction-bar public-url-bar">
                        Your Public Url is: {window.location.protocol + '//' + window.location.host + process.env.REACT_APP_BASE_PATH + "/" +currentUser().alias}
                    </h5>
                  </Link>
                }
              </div>
            </div>
            <div className="col-md-6">
                {profileCompleteness && profileCompleteness.percentage < 80 &&
                      <h5 className="profile-completeness-instruction-bar">
                        Please complete all steps of profile.
                      </h5>
                  }
              <div className="w-100">
            Profile Completeness  <b>{profileCompleteness && profileCompleteness.percentage}%</b><br></br>
            <p></p>
            {profileCompleteness && profileCompleteness.percentage < 100 &&
              <div>
                <p>Next Task:
                {" " + parentOfNextTask} > {nextTaskName}
                  <Button className="btn-orange lets-do-btn">
                    <Link
                      to={
                        letsDoLink
                      }
                      className="admin-login-btn"
                    >
                      Lets Do
                    </Link>
                  </Button>
                </p>
              </div>
              }
            <div className="round">
              <Checkbox
                name="active-checkbox"
                className="rounded-checkbox"
                checked={profileCompleteness && profileCompleteness.completeness_status && profileCompleteness.completeness_status.album_management ? 'checked' : ''}
                disabled={profileCompleteness && profileCompleteness.completeness_status && profileCompleteness.completeness_status.album_management ? true : false}
              >
                <span className="checkbox-heading">Album Management</span>
                <div className="check">
                  <div className="inside" />
                </div>
              </Checkbox>
            
              <Link
                to={
                  '/albums'
                }
                className={profileCompleteness && profileCompleteness.next_task === "public_album" ? "album-management-completeness text-red" : (profileCompleteness.album_management && profileCompleteness.album_management.public_album ? "album-management-completeness text-green" : "album-management-completeness")}
              >
                Create 1 public album(portfolio)
              </Link><br></br>
              <Link
                to={
                  '/albums'
                }
                className={profileCompleteness && profileCompleteness.next_task === "private_album" ? "album-management-completeness text-red" : (profileCompleteness.album_management && profileCompleteness.album_management.private_album ? "album-management-completeness text-green" : "album-management-completeness")}
              >
                Create 1 private album
              </Link><br></br>
              <Link
                to={
                  '/settings'
                }
                className={profileCompleteness && profileCompleteness.next_task === "watermark" ? "album-management-completeness text-red" : (profileCompleteness.album_management && profileCompleteness.album_management.watermark ? "album-management-completeness text-green" : "album-management-completeness")}
              >
                Add Watermark
              </Link><br></br>
              <Link
                to={
                  '/albums'
                }
                className={profileCompleteness && profileCompleteness.next_task === "photo" ? "album-management-completeness text-red" : (profileCompleteness.album_management && profileCompleteness.album_management.photo ? "album-management-completeness text-green" : "album-management-completeness")}
              >
                Upload 1 photo
              </Link>
            </div><br></br>
            <div className="round">
              <Checkbox
                name="active-checkbox"
                className="album-status-checkboxes rounded-checkbox"
                checked={profileCompleteness && profileCompleteness.completeness_status && profileCompleteness.completeness_status.site_content ? 'checked' : ''}
                disabled={profileCompleteness && profileCompleteness.completeness_status && profileCompleteness.completeness_status.site_content ? true : false}
              >
                <span className="checkbox-heading">Site Content</span>
                <div className="check">
                  <div className="inside" />
                </div>
              </Checkbox>
            
              <Link
                to={
                  '/site_contents'
                }
                className={profileCompleteness && profileCompleteness.next_task === "about_us" ? "album-management-completeness text-red" : (profileCompleteness.site_content && profileCompleteness.site_content.about_us ? "album-management-completeness text-green" : "album-management-completeness")}
              >
                About us
              </Link><br></br>
              <Link
                to={
                  '/site_contents#services'
                }
                className={profileCompleteness && profileCompleteness.next_task === "service" ? "album-management-completeness text-red" : (profileCompleteness.site_content && profileCompleteness.site_content.service ? "album-management-completeness text-green" : "album-management-completeness")}
              >
                Add 1 service
              </Link><br></br>
              <Link
                to={
                  '/site_contents#contact_us'
                }
                className={profileCompleteness && profileCompleteness.next_task === "contact_us" ? "album-management-completeness text-red" : (profileCompleteness.site_content && profileCompleteness.site_content.contact_us ? "album-management-completeness text-green" : "album-management-completeness")}
              >
                Add contact details
              </Link><br></br>
              <Link
                to={
                  '/site_contents#social_media'
                }
                className={profileCompleteness && profileCompleteness.next_task === "social_media_link" ? "album-management-completeness text-red" : (profileCompleteness.site_content && profileCompleteness.site_content.social_media_link ? "album-management-completeness text-green" : "album-management-completeness")}
              >
                Add 1 social media link
              </Link><br></br>
              <Link
                to={
                  '/site_contents#website_detail'
                }
                className={profileCompleteness && profileCompleteness.next_task === "website_detail" ? "album-management-completeness text-red" : (profileCompleteness.site_content && profileCompleteness.site_content.website_detail ? "album-management-completeness text-green" : "album-management-completeness")}
              >
                Add copyright and site details
              </Link>
            </div><br></br>
            <div className="round">
              <Checkbox
                name="active-checkbox"
                className="album-status-checkboxes rounded-checkbox"
                checked={profileCompleteness && profileCompleteness.completeness_status && profileCompleteness.completeness_status.homepage_gallery ? 'checked' : ''}
                disabled={profileCompleteness && profileCompleteness.completeness_status && profileCompleteness.completeness_status.homepage_gallery ? true : false}
              >
                <span className="checkbox-heading">Homepage Gallery</span>
                <div className="check">
                  <div className="inside" />
                </div>
              </Checkbox>
            
              <Link
                to={
                  '/homepage_gallery'
                }
                className={profileCompleteness && profileCompleteness.next_task === "homepage_gallery_photo" ? "album-management-completeness text-red" : (profileCompleteness.homepage_gallery && profileCompleteness.homepage_gallery.homepage_gallery_photo ? "album-management-completeness text-green" : "album-management-completeness")}
              >
                Upload 1 photo on homepage gallery
              </Link>
            </div> <br></br>
            <div className="round">
              <Checkbox
                name="active-checkbox"
                className="album-status-checkboxes rounded-checkbox"
                checked={profileCompleteness && profileCompleteness.completeness_status && profileCompleteness.completeness_status.video_portfolio ? 'checked' : ''}
                disabled={profileCompleteness && profileCompleteness.completeness_status && profileCompleteness.completeness_status.video_portfolio ? true : false}
              >
                <span className="checkbox-heading">Video Portfolio </span>
                <div className="check">
                  <div className="inside" />
                </div>
              </Checkbox>
            
              <Link
                to={
                  '/video_films'
                }
                className={profileCompleteness && profileCompleteness.next_task === "youtube_video" ? "album-management-completeness text-red" : (profileCompleteness.video_portfolio && profileCompleteness.video_portfolio.youtube_video ? "album-management-completeness text-green" : "album-management-completeness")}
              >
                Upload youtube video
              </Link>
            </div><br></br>
            <div className="round">
              <Checkbox
                name="active-checkbox"
                className="album-status-checkboxes rounded-checkbox"
                checked={profileCompleteness && profileCompleteness.completeness_status && profileCompleteness.completeness_status.testimonial ? 'checked' : ''}
                disabled={profileCompleteness && profileCompleteness.completeness_status && profileCompleteness.completeness_status.testimonial ? true : false}
              >
                <span className="checkbox-heading">Testimonial </span>
                <div className="check">
                  <div className="inside" />
                </div>
              </Checkbox>
            
              <Link
                to={
                  '/testimonials'
                }
                className={profileCompleteness && profileCompleteness.next_task === "add_testimonial" ? "album-management-completeness text-red" : (profileCompleteness.testimonial && profileCompleteness.testimonial.add_testimonial ? "album-management-completeness text-green" : "album-management-completeness")}
              >
                Add 1 testimonial
              </Link>
            </div><br></br>
            <div className="round">
              <Checkbox
                name="active-checkbox"
                className="album-status-checkboxes rounded-checkbox"
                checked={profileCompleteness && profileCompleteness.completeness_status && profileCompleteness.completeness_status.contacts ? 'checked' : ''}
                disabled={profileCompleteness && profileCompleteness.completeness_status && profileCompleteness.completeness_status.contacts ? true : false}
              >
                <span className="checkbox-heading">Contacts </span>
                <div className="check">
                  <div className="inside" />
                </div>
              </Checkbox>
            
              <Link
                to={
                  '/contacts'
                }
                className={profileCompleteness && profileCompleteness.next_task === "contact_details" ? "album-management-completeness text-red" : (profileCompleteness.contacts &&profileCompleteness.contacts.contact_details ? "album-management-completeness text-green" : "album-management-completeness")}
              >
                Add contact details
              </Link>
            </div><br></br>
            </div>
          </div>
        </div>
        </Col>
      </Col>
    );
  }
}

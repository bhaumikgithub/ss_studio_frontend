import React, { Component } from 'react';
import { Col, Button, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//import css
import '../../../assets/css/admin/category/categories.css';

// Import services
import { ProfileCompletenessService } from '../../../services/Index';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileCompleteness: {}
    };
  }
  componentWillMount() {
    var self = this;
    ProfileCompletenessService.getProfileCompleteness()
    .then(function(response) {
      var data = response.data;
      self.setState({
        profileCompleteness: data.data.profile_completeness
      });
    })
    .catch(function(error) {
      console.log(error.response);
    });
  }
  render() {
    const {profileCompleteness} = this.state
    return (
      <Col xs={12} className="categories-page-wrap">
        <Col xs={12} className="filter-wrap p-none">
          <Col xs={12} className="p-none"></Col>
        </Col>

        <Col xs={12} className="p-none">
          <div className="categories-table-wrap">
            Profile Completeness  <b>80%</b><br></br>
            <p></p>
            <p>Next Task:</p>
            <p>Site Content > Add 1 Service
              <Button className="btn-orange lets-do-btn">
                <Link
                  to={
                    'albums'
                  }
                  className="admin-login-btn"
                >
                  Lets Do
                </Link>
              </Button>
            </p>
            <div className="round">
              <Checkbox
                name="active-checkbox"
                className="rounded-checkbox"
              >
                <span className="checkbox-heading">Album Management</span>
                <div className="check">
                  <div className="inside" />
                </div>
              </Checkbox>
            </div>
            <Link
              to={
                'albums'
              }
              className={profileCompleteness && profileCompleteness.next_task === "public_album" ? "album-management-completeness text-red" : (profileCompleteness.album_management && profileCompleteness.album_management.public_album ? "album-management-completeness text-green" : "album-management-completeness")}
            >
              Create 1 public album(portfolio)
            </Link><br></br>
            <Link
              to={
                'albums'
              }
              className={profileCompleteness && profileCompleteness.next_task === "private_album" ? "album-management-completeness text-red" : (profileCompleteness.album_management && profileCompleteness.album_management.private_album ? "album-management-completeness text-green" : "album-management-completeness")}
            >
              Create 1 private album
            </Link><br></br>
            <Link
              to={
                'settings'
              }
              className={profileCompleteness && profileCompleteness.next_task === "watermark" ? "album-management-completeness text-red" : (profileCompleteness.album_management && profileCompleteness.album_management.watermark ? "album-management-completeness text-green" : "album-management-completeness")}
            >
              Add Watermark
            </Link><br></br>
            <Link
              to={
                'albums'
              }
              className={profileCompleteness && profileCompleteness.next_task === "photo" ? "album-management-completeness text-red" : (profileCompleteness.album_management && profileCompleteness.album_management.photo ? "album-management-completeness text-green" : "album-management-completeness")}
            >
              Upload 1 photo
            </Link><br></br>
            <div className="round">
              <Checkbox
                name="active-checkbox"
                className="all-selection-check album-status-checkboxes rounded-checkbox"
              >
                <span className="checkbox-heading">Site Content</span>
                <div className="check">
                  <div className="inside" />
                </div>
              </Checkbox>
            </div>
            <Link
              to={
                'site_contents'
              }
              className={profileCompleteness && profileCompleteness.next_task === "about_us" ? "album-management-completeness text-red" : (profileCompleteness.site_content && profileCompleteness.site_content.about_us ? "album-management-completeness text-green" : "album-management-completeness")}
            >
              About us
            </Link><br></br>
            <Link
              to={
                'site_contents'
              }
              className={profileCompleteness && profileCompleteness.next_task === "service" ? "album-management-completeness text-red" : (profileCompleteness.site_content && profileCompleteness.site_content.service ? "album-management-completeness text-green" : "album-management-completeness")}
            >
              Add 1 service
            </Link><br></br>
            <Link
              to={
                'site_contents'
              }
              className={profileCompleteness && profileCompleteness.next_task === "contact_us" ? "album-management-completeness text-red" : (profileCompleteness.site_content && profileCompleteness.site_content.contact_us ? "album-management-completeness text-green" : "album-management-completeness")}
            >
              Add contact details
            </Link><br></br>
            <Link
              to={
                'site_contents'
              }
              className={profileCompleteness && profileCompleteness.next_task === "social_media_link" ? "album-management-completeness text-red" : (profileCompleteness.site_content && profileCompleteness.site_content.social_media_link ? "album-management-completeness text-green" : "album-management-completeness")}
            >
              Add 1 social media link
            </Link><br></br>
            <Link
              to={
                'site_contents'
              }
              className={profileCompleteness && profileCompleteness.next_task === "website_detail" ? "album-management-completeness text-red" : (profileCompleteness.site_content && profileCompleteness.site_content.website_detail ? "album-management-completeness text-green" : "album-management-completeness")}
            >
              Add copyright and site details
            </Link><br></br>
            <div className="round">
              <Checkbox
                name="active-checkbox"
                className="all-selection-check album-status-checkboxes rounded-checkbox"
              >
                <span className="checkbox-heading">Homepage Gallery</span>
                <div className="check">
                  <div className="inside" />
                </div>
              </Checkbox>
            </div>
            <Link
              to={
                'homepage_gallery'
              }
              className={profileCompleteness && profileCompleteness.next_task === "homepage_gallery_photo" ? "album-management-completeness text-red" : (profileCompleteness.homepage_gallery && profileCompleteness.homepage_gallery.homepage_gallery_photo ? "album-management-completeness text-green" : "album-management-completeness")}
            >
              Upload 1 photo on homepage gallery
            </Link><br></br>
            <div className="round">
              <Checkbox
                name="active-checkbox"
                className="all-selection-check album-status-checkboxes rounded-checkbox"
              >
                <span className="checkbox-heading">Video Portfolio </span>
                <div className="check">
                  <div className="inside" />
                </div>
              </Checkbox>
            </div>
            <Link
              to={
                'video_films'
              }
              className={profileCompleteness && profileCompleteness.next_task === "youtube_video" ? "album-management-completeness text-red" : (profileCompleteness.video_portfolio && profileCompleteness.video_portfolio.youtube_video ? "album-management-completeness text-green" : "album-management-completeness")}
            >
              Upload youtube video
            </Link><br></br>
            <div className="round">
              <Checkbox
                name="active-checkbox"
                className="all-selection-check album-status-checkboxes rounded-checkbox"
              >
                <span className="checkbox-heading">Testimonial </span>
                <div className="check">
                  <div className="inside" />
                </div>
              </Checkbox>
            </div>
            <Link
              to={
                'testimonials'
              }
              className={profileCompleteness && profileCompleteness.next_task === "add_testimonial" ? "album-management-completeness text-red" : (profileCompleteness.testimonial && profileCompleteness.testimonial.add_testimonial ? "album-management-completeness text-green" : "album-management-completeness")}
            >
              Add 1 testimonial
            </Link><br></br>
            <div className="round">
              <Checkbox
                name="active-checkbox"
                className="all-selection-check album-status-checkboxes rounded-checkbox"
              >
                <span className="checkbox-heading">Contacts </span>
                <div className="check">
                  <div className="inside" />
                </div>
              </Checkbox>
            </div>
            <Link
              to={
                'contacts'
              }
              className={profileCompleteness && profileCompleteness.next_task === "contact_details" ? "album-management-completeness text-red" : (profileCompleteness.contacts &&profileCompleteness.contacts.contact_details ? "album-management-completeness text-green" : "album-management-completeness")}
            >
              Add contact details
            </Link><br></br>
          </div>
        </Col>
      </Col>
    );
  }
}

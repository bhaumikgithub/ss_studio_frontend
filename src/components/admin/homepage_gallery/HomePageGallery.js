import React, { Component } from 'react';
import { Col,Row } from 'react-bootstrap';

// Import css
import '../../../assets/css/admin/homepage_gallery/homepage-gallery.css';

// Import services
import { getActiveHomepagePhotos, updateHomepagePhoto } from '../../../services/admin/HomePageGallery';
import { getIndex } from '../../Helper';

export default class HomePageGallery extends Component {
constructor(props){
    super(props);
    this.state = {
      active_photos: [],
      homepage_photo: {}
    }
  }

  componentWillMount() {
    var self = this;
    
    getActiveHomepagePhotos()
      .then(function(response) {
        var data = response.data;
        self.setState({ active_photos: data.data.active_photos });
      })
      .catch(function(error) {
        console.log(error.response);
      });
      
  }

  handleUploadFile = (e, id) => {
    e.preventDefault();
    
    var self = this;
    let file = e.target.files[0];
    let data = new FormData();
    data.append('homepage_photo[homepage_image]', file);

    updateHomepagePhoto(data,id)
      .then(function(response) {
        self.handleSuccessResponse(response);
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

  handlePhotoRendering(response) {
    var active_photos = this.state.active_photos;
    var photoIndex = getIndex(response.data.data.homepage_photo.id, active_photos, 'id');
    active_photos[photoIndex] = response.data.data.homepage_photo;
    this.setState({ active_photos: active_photos });
  }


  render() {
    const { active_photos } = this.state;
    
    return (
      <Col xs={12} className="homepage-gallery-page-wrap">
        <Row>
            <Col xs={12} className="homepage-gallery">
              <Col xs={12} className="slider-images-wrap">
                {active_photos.map((active_photo, index) => 
                  <Col xs={6} sm={4} md={4} lg={3} className="gallery-slider-img-wrap" key={active_photo.id}>
                    <img className="img-responsive album-image"
                      src={active_photo.homepage_image} 
                      alt={active_photo.homepage_image_file_name} 
                      
                    />
                    <div className="slider-num">
                      slide {index+1}
                      <a className="edit-slide">
                        <img className="img-responsive" 
                          alt=""
                          src={require("../../../assets/images/admin/homepage_gallery/img-edit-icon.png")} 
                        />        
                        <input type="file" onChange={(e)=>this.handleUploadFile(e, active_photo.id)}/>
                      </a>
                    </div>
                  </Col>                    
                )}
              </Col>
            </Col>     
        </Row>
      </Col>
    );
  }
}

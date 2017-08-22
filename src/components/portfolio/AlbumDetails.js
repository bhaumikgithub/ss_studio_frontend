import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Grid, Col, Row } from 'react-bootstrap';

// Import services
import { showAlbum } from '../../services/admin/Album';

// Import css
import '../../assets/css/portfolio.css';

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {},
      albumSlug: this.props.match.params.slug
    };
  }

  componentWillMount() {
    var self = this;

    showAlbum(self.state.albumSlug)
      .then(function(response) {
        var data = response.data;
        if (response.status === 200) {
          self.setState({ album: data.data.album });
        }
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  render() {
    const { album } = this.state;
    console.log(album);
    return (
      <div className="page-wrap portfolio-wrap">
        <Grid>
          <Col xs={12} className="p-none">
            <Link to="/portfolio" className="back-link">
              <i className="fa fa-arrow-left" />Back to Albums
            </Link>
            <PageHeader className="page-title page-main-title text-center">
              <label>
                {album.album_name}
              </label>
            </PageHeader>
          </Col>
          <Col xs={12} className="p-none">
            <Row className="clearfix">
              <Col sm={12} className="portfolio-content">
                <Col xs={12} className="p-none">
                  {album.photos &&
                    album.photos.map(photo =>
                      <Col
                        xs={4}
                        sm={3}
                        md={2}
                        className="no-m-l-r portfolio-thumbs-wrap portfolio-album-thub-wrap"
                        key={photo.id}
                      >
                        <Col xs={12} className="portfolio-thumbs p-none">
                          <img alt={photo.image_file_name} src={photo.image} />
                        </Col>
                      </Col>
                    )}
                </Col>
              </Col>
            </Row>
          </Col>
        </Grid>
      </div>
    );
  }
}

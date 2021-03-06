import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { PageHeader, Grid, Col, Row, Tab, Nav, NavItem } from 'react-bootstrap';
import SearchIcon from '../../assets/images/search-icon.png';

// Import services
import { AlbumService, CategoryService } from '../../services/Index';

// Import css
import '../../assets/css/portfolio.css';

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      categories: [],
      tab: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    if (params.get('tab') !== this.state.tab) {
      this.setState({ tab: params.get('tab') });
      this.fetchPortfolio(params.get('tab'));
    }
  }

  componentWillMount() {
    this.fetchPortfolio();
    this.fetchCategories();
  }

  fetchPortfolio(category) {
    var self = this;
    var user = self.props.match.params.user;
    AlbumService.getPortfolio({ category: category, user: user, onlyAPI: true })
      .then(function(response) {
        var data = response.data;
        if (response.status === 200) {
          self.setState({ albums: data.data.albums });
        }
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  fetchCategories() {
    var self = this;
    var user = self.props.match.params.user;
    CategoryService.getActiveCategories({user: user})
      .then(function(response) {
        var data = response.data;
        if (response.status === 200) {
          self.setState({ categories: data.data.categories });
        }
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  render() {
    const { albums, categories, tab } = this.state;
    return (
      <div className="page-wrap portfolio-wrap">
        <Grid>
          <Col xs={12} className="p-none">
            <PageHeader className="page-title page-main-title text-center">
              <label>
                <span className="text-grey">our awesome </span> work
              </label>
            </PageHeader>
          </Col>
          <Col xs={12} className="p-none">
            <Tab.Container
              id="tabs-with-dropdown porfolio-tab-wrap"
              defaultActiveKey="all"
            >
              <Row className="clearfix">
                <Col sm={12}>
                  <Nav bsStyle="tabs" className="portfolio-custom-tabs">
                    <IndexLinkContainer
                      to= {"/"+ this.props.match.params.user+ "/portfolio?tab=all"}
                      className="portfolio-links"
                      eventKey="all"
                    >
                      <NavItem>All</NavItem>
                    </IndexLinkContainer>
                    {categories.map(category => (
                      <LinkContainer
                        className="portfolio-links"
                        to={'/'+this.props.match.params.user+'/portfolio?tab=' + category.category_name}
                        eventKey={category.category_name}
                        key={category.id}
                      >
                        <NavItem>{category.category_name}</NavItem>
                      </LinkContainer>
                    ))}
                  </Nav>
                </Col>
                <Col sm={12} className="portfolio-content">
                  <Tab.Content animation className="portfolio-tab-content">
                    <Tab.Pane eventKey={tab || 'all'}>
                      <Col xs={12} className="p-none">
                        {albums.length === 0 && (
                          <h4 className="portfolio-title text-center">
                            No albums available
                          </h4>
                        )}
                        {albums.map(album => (
                          <Col
                            xs={12}
                            sm={6}
                            md={3}
                            className="no-m-l-r portfolio-thumbs-wrap"
                            key={album.id}
                          >
                            <Col xs={12} className="portfolio-thumbs p-none">
                              <img alt="icon" src={album.cover_photo.image} />
                              <Link
                                to={"/"+ this.props.match.params.user+ '/portfolio/' + album.slug}
                                className="overlay"
                              >
                                <img
                                  alt="icon"
                                  className="overlay-search"
                                  src={SearchIcon}
                                />
                              </Link>
                              <span className="col-xs-12 photo-count">
                                {album.photo_count} Photos
                              </span>
                            </Col>
                            <Link to={"/"+ this.props.match.params.user+ '/portfolio/' + album.slug}>
                              <h4 className="portfolio-title">
                                {album.album_name}{' '}
                                {/* <small>({album.photo_count} Photos)</small> */}
                              </h4>
                            </Link>
                          </Col>
                        ))}
                      </Col>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Grid>
      </div>
    );
  }
}

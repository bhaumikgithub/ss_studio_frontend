import React, { Component } from 'react';
import { PageHeader, Grid, Col, Row, Tab, Nav, NavItem } from 'react-bootstrap';
import SearchIcon from '../assets/images/search-icon.png';
import '../assets/css/portfolio.css';

export default class Portfolio extends Component {
  render() {
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
                    <NavItem className="portfolio-links" eventKey="all">
                      All
                    </NavItem>
                    <NavItem className="portfolio-links" eventKey="product">
                      Product
                    </NavItem>
                    <NavItem className="portfolio-links" eventKey="kids">
                      Kids
                    </NavItem>
                    <NavItem className="portfolio-links" eventKey="wedding">
                      wedding films
                    </NavItem>
                  </Nav>
                </Col>
                <Col sm={12} className="portfolio-content">
                  <Tab.Content animation className="portfolio-tab-content">
                    <Tab.Pane eventKey="all">
                      <Col xs={12} className="p-none">
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-1.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">pre wedding</h4>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-2.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">wedding</h4>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-3.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">kids</h4>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-4.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">Costumes</h4>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-5.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">Kids</h4>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-6.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">Costumes</h4>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-7.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">pre wedding</h4>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-8.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">wedding</h4>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-9.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">pre wedding</h4>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-10.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">wedding</h4>
                        </Col>
                      </Col>
                    </Tab.Pane>
                    <Tab.Pane eventKey="product">
                      <Col xs={12} className="p-none">
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-4.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">Costumes</h4>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-6.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">Costumes</h4>
                        </Col>
                      </Col>
                    </Tab.Pane>
                    <Tab.Pane eventKey="kids">
                      <Col xs={12} className="p-none">
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-3.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">kids</h4>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-5.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">Kids</h4>
                        </Col>
                      </Col>
                    </Tab.Pane>
                    <Tab.Pane eventKey="wedding">
                      <Col xs={12} className="p-none">
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-2.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">wedding</h4>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-8.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">wedding</h4>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="no-m-l-r portfolio-thumbs-wrap"
                        >
                          <Col xs={12} className="portfolio-thumbs p-none">
                            <img
                              alt="icon"
                              src={require('../assets/images/portfolio/portfolio-thumb-10.png')}
                            />
                            <a href="" className="overlay">
                              <img
                                alt="icon"
                                className="overlay-search"
                                src={SearchIcon}
                              />
                            </a>
                          </Col>
                          <h4 className="portfolio-title">wedding</h4>
                        </Col>
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

import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

//import css
import '../../../assets/css/admin/category/categories.css';

export default class Dashboard extends Component {
  render() {
    return (
      <Col xs={12} className="categories-page-wrap">
        <Col xs={12} className="filter-wrap p-none">
          <Col xs={12} className="p-none"></Col>
        </Col>

        <Col xs={12} className="p-none">
          <div className="categories-table-wrap col-xs-12 help-content-wrap">
            <h3 className="font-rale-mid mb-20">Help</h3>
            <h5>
              For any kind of help, please mail us on <b>info@afterclix.com</b> or contact us on +91 - 94264 13898
            </h5>
            </div>
        </Col>
      </Col>
    );
  }
}

import React, { Component } from 'react';
import { Col, Pagination } from 'react-bootstrap';

export default class PaginationModule extends Component {
  render() {
    const { current_page, total_pages } = Object.assign(
      {},
      this.props.pagination
    );
    return (
      <Col xs={12} className="p-none custom-pagination-wrap">
        {total_pages > 1 && (
          <Pagination
            prev
            next
            ellipsis
            boundaryLinks
            items={total_pages}
            maxButtons={5}
            activePage={current_page}
            onSelect={this.props.paginationClick}
            className="custom-pagination"
          />
        )}
      </Col>
    );
  }
}

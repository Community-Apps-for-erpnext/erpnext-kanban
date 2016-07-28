import React, { Component } from 'react';
import { Row, Col, PageHeader, Select } from 'react-bootstrap';


export default class Board extends Component {
  render() {
    return (
      <Row>
        <Col sm={6} md={12}>
          <PageHeader>
            PriusJS <small>an open source Kanban board library</small>
          </PageHeader>
        </Col>
      </Row>
    );
  }
}

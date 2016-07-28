import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import AddCard from '../components/AddCard';
import AddList from '../components/AddList';

export default class Board extends Component {
  render() {
    return (
      <Row>
        <Col sm={12} md={6}>
          <AddList />
        </Col>
        <Col sm={12} md={6}>
          <AddCard />
        </Col>
      </Row>
    );
  }
}

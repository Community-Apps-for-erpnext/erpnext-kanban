import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import List from '../components/List';
import Filter from '../components/Filter';


const mapStateToProps = (state) => {
  return {
    lists: state.lists,
    filters: state.filters,
    cards: state.cards
  };
};


@connect(mapStateToProps)
export default class Lists extends Component {
  render() {
    const { lists, filters, cards } = this.props;
    const rowStyles = {
      overflowX: 'scroll',
      overflowY: 'hidden',
      whiteSpace: 'nowrap',
    };
    const columnStyles = {
      float: 'none',
      display:'inline-block',
      whiteSpace: 'normal',
      verticalAlign: 'top',
    };
    return (
      <div>
        <br />
        <Row>
          {filters.map((filter) =>
            <Col sm={6} md={4} lg={4}>
              <Filter {...filter} />
            </Col>
          )}
        </Row>
        <br />
        <Row style={rowStyles}>
          {lists.map((list) =>
            <Col style={columnStyles} sm={6} md={3} lg={2}>
              <List {...list} />
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

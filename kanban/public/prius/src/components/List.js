import React, { Component, PropTypes } from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import Card from '../components/Card';
import ItemTypes from '../constants/ItemTypes';
import { DropTarget } from 'react-dnd';
var numeral = require('numeral');


const listTarget = {
  drop(props, monitor, component) {
    const card = monitor.getItem();
    console.log(card);
    console.log(component);
  },
};

const checkFilterMatch = (filterValues, docValue) => {
  var match = false;
  filterValues.forEach(function(value) {
    if (value.value == docValue) {
      match = true;
    }
  });
  return match;
}

const isHidden = (doc, filters) => {
  var hidden = false;
  filters.forEach(function(filter) {
    if (filter.values.length > 0) {
      if (doc.hasOwnProperty(filter.id) && !checkFilterMatch(filter.values, doc[filter.id])){
        hidden = true;
      }
    }
  });
  return hidden;
}

const mapStateToProps = (state, props) => {
  var cards = state.cards.filter((card) =>
      card.parentList === props.id &&
      isHidden(card.doc, state.filters) == false
    )
  return {
    cards: cards
  };
};


@connect(mapStateToProps)
@DropTarget(ItemTypes.CARD, listTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class List extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    description: PropTypes.object
  }
  formatNumber(fieldtype, number) {
    if (fieldtype == 'Currency') {
      number = numeral(number).format('$0,0')
    } else if (fieldtype == 'Int') {
      number = numeral(number).format('0,0')
    } else if (fieldtype == 'Float') {
      number = numeral(number).format('0,0.00')
    }
    return number
  }
  getSum(field, cards) {
    var sum = 0;
    for (var i = 0; i < cards.length; i++) {
      sum = sum + cards[i].doc[field.fieldname];
    }
    if (!isNaN(sum)) {
      return { sum: this.formatNumber(field.fieldtype, sum) }
    } else {
      return { sum: null }
    }
  }
  constructor(props){
    super(props);
    this.getSum = this.getSum.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
  }
  render() {
    const { title, description, cards } = this.props;
    const { connectDropTarget } = this.props;
    var { sum } = this.getSum(description, cards);

    return connectDropTarget(
      <div className="kanban-list">
        <Panel header={
          <div>
            <h4>
              {title}
              <small>
                <br />{description.label} - {sum}
                <br />{cards.length} in list
              </small>
            </h4>
          </div>
          }>
          <ListGroup>
            {cards.map((card) =>
              <Card {...card} />
            )}
          </ListGroup>
        </Panel>
      </div>
    );
  }
}

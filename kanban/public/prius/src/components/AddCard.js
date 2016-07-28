import React, { Component } from 'react';
import { Well, Input, ButtonInput } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addCard } from '../actions';


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addCard }, dispatch);
};

@connect(null, mapDispatchToProps)
export default class AddCard extends Component {
  render() {
    const onSubmit = (e) => {
      e.preventDefault();
      const title = this.refs.title.getValue();
      const description = this.refs.description.getValue();
      this.props.addCard(title, description);
      this.refs.form.getDOMNode().reset();
    };
    return (
      <Well>
        <form ref="form" onSubmit={onSubmit}>
          <h4>Add Card</h4>
          <Input ref="title" type="text" placeholder="My Card" />
          <Input ref="description" type="textarea" label="Description"
                 placeholder="blah blah blah"/>
          <ButtonInput type="submit" value="Add to Backlog" bsStyle="primary" />
        </form>
      </Well>
    );
  }
}

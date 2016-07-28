import React, { Component } from 'react';
import { Well, Input, ButtonInput } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addList } from '../actions';


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addList }, dispatch);
};

@connect(null, mapDispatchToProps)
export default class AddCard extends Component {
  render() {
    const button = (
      <ButtonInput type="submit" value="Add List" bsStyle="primary" />
    );
    const onSubmit = (e) => {
      e.preventDefault();
      const title = this.refs.title.getValue();
      this.props.addList(title);
      this.refs.form.getDOMNode().reset();
    };
    return (
      <Well>
        <form ref="form" onSubmit={onSubmit}>
          <h4>Add List</h4>
          <Input ref="title" type="text" placeholder="My List" buttonAfter={button} />
        </form>
      </Well>
    );
  }
}

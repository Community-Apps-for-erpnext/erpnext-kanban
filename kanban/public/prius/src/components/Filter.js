import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
var SimpleSelect = require('react-selectize').SimpleSelect;
var MultiSelect = require('react-selectize').MultiSelect;
import { bindActionCreators } from 'redux';
import { setFilter } from '../actions';


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setFilter }, dispatch);
};


@connect(null, mapDispatchToProps)
export default class Filter extends Component {
  static propTypes = {
    options: PropTypes.array,
  }
  render() {
    var self = this;
    const { title, id, type, options } = this.props;
    var mappedOptions = options.map(function(value) {
      return { label: value, value: value }
    });
    if (type == "SimpleSelect") {
      return <SimpleSelect
                options={mappedOptions}
                placeholder={title}
                theme="material"
                onValueChange = {function(value){
                  self.setState(value);
                  self.props.setFilter(id, value);
                }}
              />
    } else if (type == "MultiSelect") {
      return <MultiSelect
                options={mappedOptions}
                placeholder={title}
                theme="material"
                onValuesChange = {function(values){
                  self.setState(values);
                  self.props.setFilter(id, values);
                }}
              />
    }
  }
}

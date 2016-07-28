import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Board from '../containers/Board';
// import DevTools from '../containers/DevTools';
import configureStore from '../store/configureStore';
import { updateCard } from '../actions';


export class App extends Component {
  constructor(props) {
    super(props)
    this.updateCard = this.updateCard.bind(this);
  }
  updateCard(card) {
    this.refs['board'].store.dispatch(updateCard(card))
  }
  render() {
    const { initialState } = this.props;
    let cardStore = configureStore(initialState);
    return (
      <Provider store={cardStore}>
        <div>
          <Board ref="board" />
          {/*<DevTools />*/}
        </div>
      </Provider>
    );
  }
}

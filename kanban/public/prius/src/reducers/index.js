import * as ActionTypes from '../actions';
import _ from 'lodash/fp';
import { combineReducers } from 'redux';


const filters = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.SET_FILTER:
      state.forEach(function(filter) {
        if (filter.id == action.id) {
          filter.values = action.values;
        }
      });
      return [
        ...state,
      ]
    default:
      return state;
  }
};

const card = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CARD:
      return {
        id: action.id,
        title: action.title,
        description: action.description,
        parentList: action.parentList,
      };
    default:
      return state;
  }
};

const cards = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CARD:
      var newCard = action.card.card;
      var existing_card = state.find(function(existing) {
        return existing.key == newCard.key;
      });
      if (existing_card == null) {
        var newState = [...state, newCard]
      } else {
        var idx = state.indexOf(existing_card);
        var newState = [...state.slice(0, idx), newCard, ...state.slice(idx + 1)]
      }
      return newState;
    case ActionTypes.ADD_CARD:
      return [
        ...state,
        card(undefined, action),
      ];
    case ActionTypes.DELETE_CARD:
      var delCard = action.card.card;
      var existing_card = state.find(function(existing) {
        return existing.key == delCard.key;
      });
      if (existing_card != null) {
        var idx = state.indexOf(existing_card);
        var newState = [...state.slice(0, idx), ...state.slice(idx + 1)]
      }
      return newState;
    default:
      return state;
  }
};

const list = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_LIST:
      return {
        id: action.id,
        title: action.title,
      };
    default:
      return state;
  }
};

const lists = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_LIST:
      return [
        ...state,
        list(undefined, action),
      ];
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  lists,
  cards,
  filters,
});

export default rootReducer;

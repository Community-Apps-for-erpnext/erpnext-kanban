export const ADD_LIST = 'ADD_LIST';
export const ADD_CARD = 'ADD_CARD';
export const LOAD_BOARD = 'LOAD_BOARD';
export const SET_FILTER = 'SET_FILTER';
export const UPDATE_CARD = 'UPDATE_CARD';
export const DELETE_CARD = 'DELETE_CARD';


export const updateCard = (card) => {
  var action = null;
  if (card.card.delete != null) {
    action = {
      type: DELETE_CARD,
      card: card,
    };
  } else {
    action = {
     type: UPDATE_CARD,
     card: card,
   };
  };
  return action;
};


let nextCardId = 0;
export const addCard = (title, description, parentList = 0) => {
  return {
    type: ADD_CARD,
    id: nextCardId++,
    title,
    description,
    parentList,
  };
};

let nextListId = 0;
export const addList = (title) => {
  return {
    type: ADD_LIST,
    id: nextListId++,
    title,
  };
};

export const loadBoard = (data) => {
  return {
    type: 'LOAD_BOARD',
    data: data,
  };
};

export const setFilter = (field, values) => {
  return {
    type: SET_FILTER,
    id: field,
    values,
  };
};

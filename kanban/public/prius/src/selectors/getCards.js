import { createSelector } from 'reselect';

const getCards = (state, props) => {
  state.cards.filter((card) => card.parentList === props.id);
};

import React from 'react';
import { render } from 'react-dom';
import { App } from './containers/App';


var RenderedApp = null;

window.loadKanban = function(initialState) {
  RenderedApp = render(<App initialState={initialState} />,
    document.getElementById('body_div'))
};

window.updateCard = function(card) {
  if (RenderedApp != null){
    RenderedApp.updateCard({ card });
  }
};

window.loadCards = function(cards) {
  if (RenderedApp != null){
    cards.forEach(function(card){
      RenderedApp.updateCards({ card })
    });
  }
};

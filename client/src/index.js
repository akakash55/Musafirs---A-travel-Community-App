import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // it allows a action-creator to return a function instead of action

import { reducers } from './reducers'; // basically kuch nahi likha hua hai toh wo index.js se data aata hai
import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));  // creates a store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
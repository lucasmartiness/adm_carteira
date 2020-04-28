import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux'
import store from './redux/root'
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


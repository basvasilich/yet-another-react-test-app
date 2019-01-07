// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Index from './components/App';
import store from './store';
import {Provider} from 'react-redux';

const root = document.getElementById('root');

if (root !== null) {
  ReactDOM.render(
    <Provider store={store}>
      <Index />
    </Provider>,
    root
  );
}

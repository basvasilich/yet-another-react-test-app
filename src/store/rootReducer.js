// @flow

import {combineReducers} from 'redux';
import app from '../components/App/reducers';
import exchange from '../components/Exchange/reducers';
import layout from './layout';
import currency from './currency';

const reducers = {
  app,
  exchange,
  layout,
  currency
};

const rootReducer = combineReducers(reducers);
export default rootReducer;

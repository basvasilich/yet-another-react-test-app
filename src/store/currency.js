// @flow

import _ from 'lodash';
import initialState from '../data/currency.en';
import type {CurrencyStoreType} from './types';
import type {ActionType} from '../components/App/types';
import {DATA_CURRENCY_UPDATE_RATES} from '../components/DataManager/vars';

export default function(currency: CurrencyStoreType = initialState, action: ActionType) {
  switch (action.type) {
    case DATA_CURRENCY_UPDATE_RATES: {
      return _.assign({}, currency, {
        ratesLoaded: Date.now(),
        items: _.mapValues(currency.items, (item, key) =>
          _.assign({}, item, {
            rate: _.get(action, ['payload', key])
          })
        )
      });
    }
    default:
      return currency;
  }
}

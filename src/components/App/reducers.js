// @flow

import type {ActionType, AppStoreType} from './types';
import {EXCHANGE_TRANSACTION_MAKE} from '../Exchange/vars';
import _ from 'lodash';
import {getRateForCodes} from '../../helpers';

const initialState: AppStoreType = {
  balance: {
    EUR: {
      currency: 'EUR',
      value: 100
    },
    GBP: {
      currency: 'GBP',
      value: 50
    },
    USD: {
      currency: 'USD',
      value: 0
    }
  },
  offline: false
};

export default function(app: AppStoreType = initialState, action: ActionType): AppStoreType {
  switch (action.type) {
    case EXCHANGE_TRANSACTION_MAKE: {
      const {fromCode, toCode, value, rate} = _.get(action, 'payload', {});

      if (_.get(app, ['balance', fromCode, 'value'], 0) < _.toNumber(value) || fromCode === toCode) {
        return app;
      }

      return _.assign({}, app, {
        balance: _.assign({}, app.balance, {
          [fromCode]: {
            currency: fromCode,
            value: _.get(app, ['balance', fromCode, 'value']) - _.toNumber(value)
          },
          [toCode]: {
            currency: fromCode,
            value: _.get(app, ['balance', toCode, 'value']) + _.toNumber(value) * rate
          }
        })
      });
    }
    default:
      return app;
  }
}

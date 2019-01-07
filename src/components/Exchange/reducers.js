// @flow

import _ from 'lodash';
import {EXCHANGE_ACTIVE_UPDATE, EXCHANGE_FIELD_UPDATE, EXCHANGE_TRANSACTION_MAKE} from './vars';

import type {ExchangeStoreType} from './types';
import type {ActionType} from '../App/types';
import {CONFIG_AVAILABLE_CURRENCIES} from '../../config';
import {getRateForCodes} from '../../helpers';

const initialState: ExchangeStoreType = {
  from: {
    items: _.reduce(
      CONFIG_AVAILABLE_CURRENCIES,
      (acc, value) =>
        _.assign({}, acc, {
          [value]: ''
        }),
      {}
    ),
    active: CONFIG_AVAILABLE_CURRENCIES[0]
  },
  to: {
    items: _.reduce(
      CONFIG_AVAILABLE_CURRENCIES,
      (acc, value) =>
        _.assign({}, acc, {
          [value]: ''
        }),
      {}
    ),
    active: CONFIG_AVAILABLE_CURRENCIES[1]
  }
};

export default function(exchange: ExchangeStoreType = initialState, action: ActionType): ExchangeStoreType {
  switch (action.type) {
    case EXCHANGE_FIELD_UPDATE: {
      const {fromCode, toCode, value, source, currency} = _.get(action, 'payload', {});
      const from2to = source === 'from';
      const sourceKey = from2to ? 'from' : 'to';
      const targetKey = !from2to ? 'from' : 'to';
      const sourceCode = from2to ? fromCode : toCode;

      const targetItems = exchange[targetKey];
      const sourceItems = exchange[sourceKey];

      const newTargetItems = _.mapValues(exchange[targetKey].items, (item, key) => {
        const rate = getRateForCodes(sourceCode, key, currency);
        const result = _.chain(value * rate)
          .round(4)
          .toString()
          .valueOf();

        return result !== '0' ? result : '';
      });

      const newSourceItems = _.mapValues(exchange[sourceKey].items, (item, key) => (key === sourceCode ? value : ''));

      return _.assign({}, exchange, {
        [sourceKey]: _.assign({}, sourceItems, {
          items: newSourceItems
        }),
        [targetKey]: _.assign({}, targetItems, {
          items: newTargetItems
        })
      });
    }
    case EXCHANGE_ACTIVE_UPDATE: {
      const {currencyCode, source} = _.get(action, 'payload', {});
      const resetItems = _.mapValues(exchange[source].items, () => '');

      return source === 'from'
        ? _.assign({}, exchange, {
            from: _.assign({}, exchange.from, {
              active: currencyCode,
              items: resetItems
            }),
            to: _.assign({}, exchange.to, {
              items: resetItems
            })
          })
        : _.assign({}, exchange, {
            to: _.assign({}, exchange.to, {
              active: currencyCode
            })
          });
    }
    case EXCHANGE_TRANSACTION_MAKE: {
      const resetItems = _.mapValues(exchange.from.items, () => '');

      return _.assign({}, exchange, {
        from: _.assign({}, exchange.from, {
          items: resetItems
        }),
        to: _.assign({}, exchange.to, {
          items: resetItems
        })
      });
    }
    default:
      return exchange;
  }
}

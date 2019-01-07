// @flow
import _ from 'lodash';
import type {CurrencyStoreType} from '../store/types';

export const getRateForCodes = (from: string, to: string, currencyState: CurrencyStoreType): number => {
  const currencyBase = _.get(currencyState, 'base');
  const fromRate = _.get(currencyState, ['items', from, 'rate']);
  const toRate = _.get(currencyState, ['items', to, 'rate']);
  const rate = _.get(currencyState, ['items', to, 'rate']);

  if (!fromRate || !toRate || !currencyBase || _.isEmpty(currencyState)) {
    return 0;
  }

  return from === currencyBase ? rate : (1 / fromRate) * toRate;
};

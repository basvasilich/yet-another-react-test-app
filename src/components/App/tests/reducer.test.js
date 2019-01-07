import _ from 'lodash';
import reducer from '../reducers';
import {EXCHANGE_TRANSACTION_MAKE} from '../../Exchange/vars';

describe('App reducer', () => {
  test('EXCHANGE_TRANSACTION_MAKE positive', () => {
    const newState = reducer(undefined, {
      type: EXCHANGE_TRANSACTION_MAKE,
      payload: {
        fromCode: 'EUR',
        toCode: 'GBP',
        value: '1',
        rate: 4
      }
    });

    expect(_.get(newState, ['balance', 'GBP', 'value'])).toBe(54);
    expect(_.get(newState, ['balance', 'EUR', 'value'])).toBe(99);
  });

  test('EXCHANGE_TRANSACTION_MAKE negative', () => {
    const newState = reducer(undefined, {
      type: EXCHANGE_TRANSACTION_MAKE,
      payload: {
        fromCode: 'EUR',
        toCode: 'GBP',
        value: '101',
        rate: 4
      }
    });

    expect(_.get(newState, ['balance', 'GBP', 'value'])).toBe(50);
    expect(_.get(newState, ['balance', 'EUR', 'value'])).toBe(100);
  });
});

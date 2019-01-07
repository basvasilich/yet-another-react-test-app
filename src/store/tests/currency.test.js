import _ from 'lodash';
import reducer from '../currency';
import {DATA_CURRENCY_UPDATE_RATES} from '../../components/DataManager/vars';

describe('REDUCER currency', () => {
  test('DATA_CURRENCY_UPDATE_RATES', () => {
    const payload = {
      EUR: 1,
      USD: 2,
      GBP: 4
    };
    const newState = reducer(undefined, {
      type: DATA_CURRENCY_UPDATE_RATES,
      payload
    });

    expect(_.get(newState, 'items.EUR.rate')).toBe(1);
    expect(_.get(newState, 'items.USD.rate')).toBe(2);
    expect(_.get(newState, 'items.GBP.rate')).toBe(4);
  });

  test('DATA_CURRENCY_UPDATE_RATES negative', () => {
    const payload = {
      TES: 1,
      BLA: 2
    };
    const newState = reducer(undefined, {
      type: DATA_CURRENCY_UPDATE_RATES,
      payload
    });

    expect(_.get(newState, 'items.TES.rate')).toBeUndefined();
    expect(_.get(newState, 'items.USD.rate')).toBeUndefined();
  });

  test('DATA_CURRENCY_UPDATE_RATES negative', () => {
    const payload = {
      TES: 1,
      BLA: 2
    };
    const newState = reducer(undefined, {
      type: DATA_CURRENCY_UPDATE_RATES,
      payload
    });

    expect(_.get(newState, 'items.TES.rate')).toBeUndefined();
    expect(_.get(newState, 'items.USD.rate')).toBeUndefined();
  });
});

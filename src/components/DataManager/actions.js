// @flow

import {DATA_CURRENCY_UPDATE_RATES} from './vars';
import {CONFIG_FIXER_API_URL} from '../../config';

import type {DispatchType, ThunkActionType} from '../App/types';
import type {DataRatesType} from './types';

export const dataCurrencyUpdateRatesAC = (): ThunkActionType => {
  return (dispatch: DispatchType) => {
    return fetch(CONFIG_FIXER_API_URL, {
      method: 'get'
    })
      .then(resp => resp.json())
      .then((resp: DataRatesType) => {
        dispatch({
          type: DATA_CURRENCY_UPDATE_RATES,
          payload: resp.rates
        });
      });
  };
};

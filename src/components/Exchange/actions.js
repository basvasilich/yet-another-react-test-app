// @flow

import _ from 'lodash';
import {EXCHANGE_ACTIVE_UPDATE, EXCHANGE_FIELD_UPDATE, EXCHANGE_TRANSACTION_MAKE} from './vars';
import type {DispatchType, GetStateType} from '../App/types';
import type {
  exchangeActiveUpdatePayloadType,
  exchangeFieldUpdatePayloadType,
  exchangeTransactionMakePayloadType
} from './types';
import {getRateForCodes} from '../../helpers';

export const exchangeFieldUpdateAC = (payload: exchangeFieldUpdatePayloadType) => (
  dispatch: DispatchType,
  getState: GetStateType
) =>
  dispatch({
    type: EXCHANGE_FIELD_UPDATE,
    payload: _.assign({}, payload, {
      currency: _.get(getState(), 'currency')
    })
  });

export const exchangeActiveUpdateAC = (payload: exchangeActiveUpdatePayloadType) => ({
  type: EXCHANGE_ACTIVE_UPDATE,
  payload
});

export const exchangeTransactionMakeAC = (payload: exchangeTransactionMakePayloadType) => (
  dispatch: DispatchType,
  getState: GetStateType
) =>
  dispatch({
    type: EXCHANGE_TRANSACTION_MAKE,
    payload: _.assign({}, payload, {
      rate: getRateForCodes(payload.fromCode, payload.toCode, _.get(getState(), 'currency'))
    })
  });

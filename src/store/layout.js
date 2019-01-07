// @flow

import initialState from '../data/layout.en';
import type {LayoutStoreType} from './types';
import type {ActionType} from '../components/App/types';

export default function(exchange: LayoutStoreType = initialState, action: ActionType): LayoutStoreType {
  switch (action.type) {
    default:
      return exchange;
  }
}

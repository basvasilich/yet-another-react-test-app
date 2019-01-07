// @flow
import type {AppStoreType} from '../components/App/types';
import type {ExchangeStoreType} from '../components/Exchange/types';

export type LayoutStoreType = {
  Exchange: {
    cancelButtonLabel: string,
    submitButtonLabel: string
  },
  ExchangeField: {
    balanceTemplate: string
  }
};

export type historyStoreType = {
  order: Array<string>,
  items: {
    [number]: {
      timestamp: number,
      from: string,
      to: string,
      value: number
    }
  }
};

export type CurrencyStoreType = {
  base?: string,
  ratesLoaded: number,
  items: {[string]: {symbol: string, code: string, rate?: number}}
};

export type StoreType = {
  app: AppStoreType,
  exchange: ExchangeStoreType,
  layout: LayoutStoreType,
  currency: CurrencyStoreType
};

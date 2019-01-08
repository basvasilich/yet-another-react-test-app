// @flow

export type ExchangeInnerItemType = {
  currencySymbol: string, // symbol of field currency
  currencyCode: string, // code of field currency
  balance: number, // balance of field currency
  value: string  // value of field
};

export type ExchangeItemType = {
  items: {[string]: string},
  active: string
};

export type exchangeFieldUpdatePayloadType = {
  fromCode: string,
  toCode: string,
  source: string,
  value: string
};

export type exchangeActiveUpdatePayloadType = {
  source: string,
  currencyCode: string
};

export type exchangeTransactionMakePayloadType = {fromCode: string, toCode: string, value: string};

export type ExchangeComponentType = {
  exchangeFieldUpdate: (payload: exchangeFieldUpdatePayloadType) => void,
  exchangeActiveUpdate: (payload: exchangeActiveUpdatePayloadType) => void,
  exchangeTransactionMake: (payload: exchangeTransactionMakePayloadType) => void,
  from: Array<ExchangeInnerItemType>,
  to: Array<ExchangeInnerItemType>,
  balanceTemplate: string,
  toActiveIndex: number,
  fromActiveIndex: number,
  submitButtonLabel: string,
  loadingLabel: string,
  ratesLoaded: number,
  ratesUnavailableLabel: string,
  offline: boolean
};

export type ExchangeStoreType = {
  from: ExchangeItemType,
  to: ExchangeItemType
};

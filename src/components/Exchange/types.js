// @flow

export type ExchangeInnerItemType = {
  currencySymbol: string,
  currencyCode: string,
  balance: number,
  value: string
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
  fromActive: ExchangeInnerItemType,
  toActive: ExchangeInnerItemType,
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
  ratesLoaded: number
};

export type ExchangeStoreType = {
  from: ExchangeItemType,
  to: ExchangeItemType
};

// @flow
export type ExchangeFieldComponentType = {
  currencyCode: string, // code of field currency
  currencySymbol: string, // symbol of field currency
  value: string, // value of field
  balance: number,  // balance of field currency
  type: string,  // from of to field
  balanceTemplate: string, // template for balance string
  rateCode?: string, // code for currency in rate string
  isActive: boolean,
  handleChange: (event: any) => void // handler of change field event
};

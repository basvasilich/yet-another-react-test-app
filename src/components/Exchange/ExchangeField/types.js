// @flow
export type ExchangeFieldComponentType = {
  currencyCode: string,
  currencySymbol: string,
  value: string,
  balance: number,
  type: string,
  balanceTemplate: string,
  rateCode?: string,
  isActive: boolean,
  handleChange: (event: any) => void
};

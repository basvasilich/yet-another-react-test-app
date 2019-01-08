// @flow
export type ExchangeRateComponentType = {
  leftCode?: string,
  rightCode?: string,
  fromSymbol: string,
  fromValue: string,
  toSymbol: number,
  toValue: number,
  hidden: boolean,
  round: number // how many digits after .
};

// @flow
export type DataRatesType = {
  base: string,
  date: string,
  rates: {[string]: number},
  success: boolean,
  timestamp: number
};

export type DataManagerComponentType = {
  dataCurrencyUpdateRates: () => void
};

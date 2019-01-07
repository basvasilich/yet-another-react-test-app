import {getRateForCodes} from '..';

const currency = {
  base: 'EUR',
  items: {
    EUR: {
      rate: 1
    },
    USD: {
      rate: 2
    },
    GPB: {
      rate: 4
    }
  }
};
describe('Helpers', () => {
  test('getRateForCodes forward base', () => {
    expect(getRateForCodes('EUR', 'USD', currency)).toBe(2);
  });

  test('getRateForCodes backward base', () => {
    expect(getRateForCodes('USD', 'EUR', currency)).toBe(0.5);
  });

  test('getRateForCodes backward', () => {
    expect(getRateForCodes('GPB', 'USD', currency)).toBe(0.5);
  });

  test('getRateForCodes backward', () => {
    expect(getRateForCodes('GPB', 'EUR', currency)).toBe(0.25);
  });

  test('getRateForCodes no rates', () => {
    expect(getRateForCodes('GPB', 'TES', currency)).toBe(0);
  });

  test('getRateForCodes no rates', () => {
    expect(getRateForCodes('BLA', 'USD', currency)).toBe(0);
  });

  test('getRateForCodes no currency', () => {
    expect(getRateForCodes('GBP', 'USD', {})).toBe(0);
  });
});

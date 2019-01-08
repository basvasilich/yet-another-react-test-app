import _ from 'lodash';
import reducer from '../reducers';
import {CONFIG_AVAILABLE_CURRENCIES} from '../../../config';
import {EXCHANGE_ACTIVE_UPDATE, EXCHANGE_FIELD_UPDATE, EXCHANGE_TRANSACTION_MAKE} from '../vars';

describe('Exchange reducer', () => {
  test('initial state', () => {
    const newState = reducer(undefined, {
      type: ''
    });

    expect(_.get(newState, ['from', 'items', CONFIG_AVAILABLE_CURRENCIES[0]])).toBe('');
    expect(_.get(newState, ['from', 'active'])).toBe(CONFIG_AVAILABLE_CURRENCIES[0]);
    expect(_.get(newState, ['to', 'items', CONFIG_AVAILABLE_CURRENCIES[1]])).toBe('');
    expect(_.get(newState, ['to', 'active'])).toBe(CONFIG_AVAILABLE_CURRENCIES[1]);
  });

  test('EXCHANGE_FIELD_UPDATE from', () => {
    const newState = reducer(undefined, {
      type: EXCHANGE_FIELD_UPDATE,
      payload: {
        fromCode: 'EUR',
        toCode: 'GBP',
        value: '1',
        source: 'from',
        currency: {
          base: 'EUR',
          items: {
            USD: {
              code: 'USD',
              rate: 2
            },
            EUR: {
              code: 'EUR',
              rate: 1
            },
            GBP: {
              code: 'GBP',
              rate: 4
            }
          }
        }
      }
    });

    expect(_.get(newState, ['from', 'items', 'EUR'])).toBe('1');
    expect(_.get(newState, ['to', 'items', 'GBP'])).toBe('4');
    expect(_.get(newState, ['to', 'items', 'USD'])).toBe('2');
    expect(_.get(newState, ['to', 'items', 'EUR'])).toBe('1');
  });

  test('EXCHANGE_FIELD_UPDATE from', () => {
    const newState = reducer(undefined, {
      type: EXCHANGE_FIELD_UPDATE,
      payload: {
        fromCode: 'EUR',
        toCode: 'GBP',
        value: '1ab',
        source: 'from',
        currency: {
          base: 'EUR',
          items: {
            USD: {
              code: 'USD',
              rate: 2
            },
            EUR: {
              code: 'EUR',
              rate: 1
            },
            GBP: {
              code: 'GBP',
              rate: 4
            }
          }
        }
      }
    });

    expect(_.get(newState, ['from', 'items', 'EUR'])).toBe('');
    expect(_.get(newState, ['to', 'items', 'GBP'])).toBe('');
    expect(_.get(newState, ['to', 'items', 'USD'])).toBe('');
    expect(_.get(newState, ['to', 'items', 'EUR'])).toBe('');
  });

  test('EXCHANGE_FIELD_UPDATE to', () => {
    const newState = reducer(undefined, {
      type: EXCHANGE_FIELD_UPDATE,
      payload: {
        fromCode: 'EUR',
        toCode: 'GBP',
        value: '4',
        source: 'to',
        currency: {
          base: 'EUR',
          items: {
            USD: {
              code: 'USD',
              rate: 2
            },
            EUR: {
              code: 'EUR',
              rate: 1
            },
            GBP: {
              code: 'GBP',
              rate: 4
            }
          }
        }
      }
    });

    expect(_.get(newState, ['to', 'items', 'GBP'])).toBe('4');
    expect(_.get(newState, ['from', 'items', 'GBP'])).toBe('4');
    expect(_.get(newState, ['from', 'items', 'USD'])).toBe('2');
    expect(_.get(newState, ['from', 'items', 'EUR'])).toBe('1');
  });

  test('EXCHANGE_ACTIVE_UPDATE to', () => {
    const newState1 = reducer(undefined, {
      type: EXCHANGE_FIELD_UPDATE,
      payload: {
        fromCode: 'EUR',
        toCode: 'GBP',
        value: '1',
        source: 'from',
        currency: {
          base: 'EUR',
          items: {
            USD: {
              code: 'USD',
              rate: 2
            },
            EUR: {
              code: 'EUR',
              rate: 1
            },
            GBP: {
              code: 'GBP',
              rate: 4
            }
          }
        }
      }
    });

    const newState2 = reducer(newState1, {
      type: EXCHANGE_ACTIVE_UPDATE,
      payload: {
        currencyCode: 'USD',
        source: 'from'
      }
    });

    expect(_.get(newState2, ['from', 'active'])).toBe('USD');
    expect(_.get(newState2, ['to', 'active'])).toBe(CONFIG_AVAILABLE_CURRENCIES[1]);
    expect(_.get(newState2, ['from', 'items', 'EUR'])).toBe('');
    expect(_.get(newState2, ['to', 'items', 'EUR'])).toBe('');
  });

  test('EXCHANGE_ACTIVE_UPDATE from', () => {
    const newState = reducer(undefined, {
      type: EXCHANGE_ACTIVE_UPDATE,
      payload: {
        currencyCode: 'USD',
        source: 'to'
      }
    });

    expect(_.get(newState, ['from', 'active'])).toBe(CONFIG_AVAILABLE_CURRENCIES[0]);
    expect(_.get(newState, ['to', 'active'])).toBe('USD');
  });

  test('EXCHANGE_TRANSACTION_MAKE', () => {
    const newState1 = reducer(undefined, {
      type: EXCHANGE_FIELD_UPDATE,
      payload: {
        fromCode: 'EUR',
        toCode: 'GBP',
        value: '1',
        source: 'from',
        currency: {
          base: 'EUR',
          items: {
            USD: {
              code: 'USD',
              rate: 2
            },
            EUR: {
              code: 'EUR',
              rate: 1
            },
            GBP: {
              code: 'GBP',
              rate: 4
            }
          }
        }
      }
    });

    const newState2 = reducer(newState1, {
      type: EXCHANGE_TRANSACTION_MAKE,
      payload: {
        currencyCode: 'USD',
        source: 'to'
      }
    });

    expect(_.get(newState2, ['from', 'items', 'EUR'])).toBe('');
    expect(_.get(newState2, ['to', 'items', 'EUR'])).toBe('');
  });
});

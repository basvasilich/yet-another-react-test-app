import _ from 'lodash';
import React from 'react';
import {shallow} from 'enzyme';
import {component as Exchange} from '..';
import {Provider} from 'react-redux';
import store from '../../../store';

const makeWrapper = ({
  exchangeFieldUpdateMock = _.noop,
  exchangeActiveUpdateMock = _.noop,
  exchangeTransactionMakeMock = _.noop,
  ratesLoaded = 0,
  from = [
    {
      currencySymbol: 'EUR',
      currencyCode: 'EUR',
      balance: 100,
      value: ''
    },
    {
      currencySymbol: 'USD',
      currencyCode: 'USD',
      balance: 100,
      value: ''
    }
  ],
  to = [
    {
      currencySymbol: 'EUR',
      currencyCode: 'EUR',
      balance: 100,
      value: ''
    },
    {
      currencySymbol: 'USD',
      currencyCode: 'USD',
      balance: 50,
      value: ''
    }
  ],
  toActiveIndex = 1,
  fromActiveIndex = 0
} = {}) => (
  <Exchange
    {...{
      exchangeFieldUpdate: exchangeFieldUpdateMock,
      exchangeActiveUpdate: exchangeActiveUpdateMock,
      exchangeTransactionMake: exchangeTransactionMakeMock,
      from,
      to,
      balanceTemplate: '',
      toActiveIndex,
      fromActiveIndex,
      submitButtonLabel: '',
      loadingLabel: '',
      ratesLoaded
    }}
  />
);

const inputChecker = (input, output) => {
  const exchangeFieldUpdateMock = jest.fn();
  const wrapper = shallow(
    <Provider store={store}>{makeWrapper({ratesLoaded: Date.now(), exchangeFieldUpdateMock})}</Provider>
  );
  wrapper
    .find(Exchange)
    .dive()
    .find('ExchangeField')
    .first()
    .dive()
    .find('.ExchangeField-input-from')
    .simulate('change', {target: {value: input}});

  expect(exchangeFieldUpdateMock).toHaveBeenCalledWith({
    fromCode: 'EUR',
    toCode: 'USD',
    source: 'from',
    value: output
  });
};

test('Exchange renders without crashing', () => {
  makeWrapper();
});

test('Exchange loading without rates', () => {
  const wrapper = shallow(makeWrapper());
  expect(wrapper.find('.is-unavailable').exists()).toBe(true);
});

test('Exchange rates loaded', () => {
  const wrapper = shallow(makeWrapper({ratesLoaded: Date.now()}));
  expect(wrapper.find('.is-unavailable').exists()).toBe(false);
});

test('Exchange input 00', () => inputChecker('00', '0'));
test('Exchange input 123', () => inputChecker('123', '123'));
test('Exchange input 01', () => inputChecker('01', '0'));
test('Exchange input 0.', () => inputChecker('0.', '0.'));
test('Exchange input 0..', () => inputChecker('0..', '0.'));
test('Exchange input .', () => inputChecker('.', ''));
test('Exchange input 1as', () => inputChecker('1as', '1'));
test('Exchange input -1', () => inputChecker('-1', '1'));
test('Exchange input 0.1.1', () => inputChecker('0.1.1', '0.11'));
test('Exchange input 0.123456', () => inputChecker('0.123456', '0.1234'));
test('Exchange input 100.12', () => inputChecker('100.12', '100.12'));
test('Exchange input 100,12', () => inputChecker('100,12', '10012'));

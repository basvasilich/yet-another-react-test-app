import _ from 'lodash';
import React from 'react';
import {shallow} from 'enzyme';
import ExchangeField from '..';

const makeWrapper = () =>
  shallow(
    <ExchangeField
      {...{
        currencyCode: 'USD',
        currencySymbol: '$',
        value: '',
        balance: 100,
        type: 'from',
        balanceTemplate: 'You have <%= currencySymbol %><%= value %>',
        isActive: true,
        handleChange: _.noop
      }}
    />
  );

test('ExchangeField renders without crashing', () => {
  makeWrapper();
});

test('ExchangeField balance', () => {
  const wrapper = makeWrapper();
  expect(wrapper.find('.ExchangeField-currency-balance').exists()).toBe(true);
});

test('ExchangeField balance', () => {
  const wrapper = makeWrapper();
  expect(wrapper.find('.ExchangeField-currency-balance').exists()).toBe(true);
});

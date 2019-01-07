import React from 'react';
import {shallow} from 'enzyme';
import {component as ExchangeRate} from '..';

test('ExchangeRate renders without crashing', () => {
  shallow(
    <ExchangeRate
      {...{
        fromSymbol: 'USD',
        fromValue: 1,
        toSymbol: 'EUR',
        toValue: 2,
        hidden: false,
        round: 2
      }}
    />
  );
});

test('ExchangeRate hidden', () => {
  const wrapper = shallow(
    <ExchangeRate
      {...{
        fromSymbol: 'USD',
        fromValue: 1,
        toSymbol: 'EUR',
        toValue: 2,
        hidden: true,
        round: 2
      }}
    />
  );
  expect(wrapper.html()).toBe(null);
});

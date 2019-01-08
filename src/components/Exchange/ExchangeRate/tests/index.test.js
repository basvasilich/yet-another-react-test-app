import React from 'react';
import {shallow} from 'enzyme';
import {component as ExchangeRate} from '..';

const makeWrapper = hidden =>
  shallow(
    <ExchangeRate
      {...{
        fromSymbol: 'USD',
        fromValue: 1,
        toSymbol: 'EUR',
        toValue: 2,
        hidden,
        round: 2
      }}
    />
  );

test('ExchangeRate renders without crashing', () => {
  makeWrapper(false);
});

test('ExchangeRate hidden', () => {
  const wrapper = makeWrapper(true);
  expect(wrapper.html()).toBe(null);
});

import _ from "lodash";
import React from 'react';
import {shallow} from 'enzyme';
import ExchangeField from '..';

test('ExchangeField renders without crashing', () => {
  shallow(<ExchangeField />);
});

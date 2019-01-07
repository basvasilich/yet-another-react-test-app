import React from 'react';
import {shallow} from 'enzyme';
import Exchange from '..';

test('Exchange renders without crashing', () => {
  shallow(<Exchange />);
});

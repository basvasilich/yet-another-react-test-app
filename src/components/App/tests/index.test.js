import React from 'react';
import {shallow} from 'enzyme';
import App from '..';

test('App renders without crashing', () => {
  shallow(<App />);
});

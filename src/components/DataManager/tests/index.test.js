import React from 'react';
import {shallow} from 'enzyme';
import DataManager from '..';

test('DataManager renders without crashing', () => {
  shallow(<DataManager />);
});

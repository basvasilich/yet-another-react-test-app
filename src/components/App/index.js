// @flow

import React, {Component} from 'react';
import Exchange from '../Exchange';
import DataManager from '../DataManager';
import './index.scss';
import type {AppComponentType} from './types';

const displayName = 'App';
const classes = {};

classes[displayName] = class extends Component<AppComponentType> {
  static displayName = displayName;

  render() {
    return (
      <div className={displayName}>
        <Exchange />
        <DataManager />
      </div>
    );
  }
};

export default classes[displayName];

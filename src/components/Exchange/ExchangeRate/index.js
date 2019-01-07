// @flow

import _ from 'lodash';
import React, {PureComponent} from 'react';

import type {ExchangeRateComponentType} from './types';
import {connect} from 'react-redux';
import {getRateForCodes} from '../../../helpers';

const displayName = 'ExchangeRate';
const classes = {};

const mapStateToProps = (state, ownProps) => {
  const {fromCode, toCode} = ownProps;
  const currencyState = _.get(state, 'currency');
  const ratesLoaded = _.get(currencyState, 'ratesLoaded');
  const fromSymbol = _.get(currencyState, ['items', fromCode, 'symbol']);
  const toSymbol = _.get(currencyState, ['items', toCode, 'symbol']);

  return {
    hidden: !toCode || !fromCode || toCode === fromCode || !ratesLoaded,
    fromSymbol,
    toSymbol,
    fromValue: 1,
    toValue: getRateForCodes(fromCode, toCode, currencyState)
  };
};

classes[displayName] = class extends PureComponent<ExchangeRateComponentType> {
  static displayName = displayName;

  render() {
    const {fromSymbol, fromValue, toSymbol, toValue, hidden, round = 2} = this.props;

    return hidden ? null : (
      <div className={displayName}>
        <span className={`${displayName}-from-symbol`}>{fromSymbol}</span>
        <span className={`${displayName}-from-value`}>{fromValue}</span>
        {' = '}
        <span className={`${displayName}-to-symbol`}>{toSymbol}</span>
        <span className={`${displayName}-to-value`}>{_.round(toValue, round)}</span>
      </div>
    );
  }
};

export const component = classes[displayName];

export default connect(mapStateToProps)(classes[displayName]);

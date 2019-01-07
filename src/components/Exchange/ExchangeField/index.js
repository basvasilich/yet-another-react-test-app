// @flow

import _ from 'lodash';
import React, {Component} from 'react';
import ExchangeRate from '../ExchangeRate';
import './index.scss';

import type {ExchangeFieldComponentType} from './types';

const displayName = 'ExchangeField';
const classes = {};

classes[displayName] = class extends Component<ExchangeFieldComponentType> {
  static displayName = displayName;

  shouldComponentUpdate(nextProps: ExchangeFieldComponentType): boolean {
    return _.chain(nextProps)
      .omit(['handleChange', 'style'])
      .some((value, key) => {
        return this.props[key] !== value;
      })
      .valueOf();
  }

  render() {
    const {
      currencySymbol,
      currencyCode,
      balanceTemplate,
      balance,
      rateCode,
      handleChange,
      type,
      isActive,
      value
    } = this.props;
    const compiledBalanceTemplate = _.template(balanceTemplate);
    const prefix = type === 'from' ? '-' : '+';
    const tabIndex = type === 'from' ? 1 : 2;
    const isInvalid = value !== '' && type === 'from' && _.toNumber(value) > balance;

    return (
      <div className={`${displayName} ${isInvalid ? 'is-invalid' : ''}`}>
        <div className={`${displayName}-top-row`}>
          <div className={`${displayName}-currency-symbol`}>{currencyCode}</div>
          <div className={`${displayName}-value`}>
            <input
              className={`${displayName}-input`}
              type="text"
              tabIndex={isActive ? tabIndex : -1}
              value={value !== '' ? prefix + value : ''}
              onChange={handleChange ? handleChange : _.noop}
            />
          </div>
        </div>
        <div className={`${displayName}-bottom-row`}>
          <div className={`${displayName}-currency-balance`}>
            {compiledBalanceTemplate({value: _.round(balance, 2), currencySymbol})}
          </div>
          <div className={`${displayName}-currency-rate`}>
            <ExchangeRate
              {...{
                fromCode: currencyCode,
                toCode: rateCode
              }}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default classes[displayName];

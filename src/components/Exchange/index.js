// @flow

import _ from 'lodash';
import React, {Component} from 'react';
import ExchangeRate from './ExchangeRate';
import ExchangeField from './ExchangeField';
import Slider from 'react-slick';

import './index.scss';

import type {ExchangeComponentType, ExchangeInnerItemType} from './types';
import {connect} from 'react-redux';
import {dataCurrencyUpdateRatesAC} from '../DataManager/actions';
import {exchangeActiveUpdateAC, exchangeFieldUpdateAC, exchangeTransactionMakeAC} from './actions';

const displayName = 'Exchange';
const classes = {};

const mapStateToProps = state => {
  const fromState = _.get(state, 'exchange.from');
  const toState = _.get(state, 'exchange.to');
  const ratesLoaded = _.get(state, 'currency.ratesLoaded');
  const fromActiveCode = _.get(fromState, 'active');
  const toActiveCode = _.get(toState, 'active');

  const makeItem = (value, key) => {
    return {
      currencySymbol: _.get(state, ['currency', 'items', key, 'symbol']),
      currencyCode: _.get(state, ['currency', 'items', key, 'code']),
      balance: _.get(state, ['app', 'balance', key, 'value']),
      value
    };
  };

  const from = _.chain(fromState)
    .get('items')
    .map(makeItem)
    .valueOf();

  const to = _.chain(toState)
    .get('items')
    .map(makeItem)
    .valueOf();

  const fromActive = _.find(from, {currencyCode: fromActiveCode});
  const fromActiveIndex = _.findIndex(from, {currencyCode: fromActiveCode});
  const toActive = _.find(to, {currencyCode: toActiveCode});
  const toActiveIndex = _.findIndex(to, {currencyCode: toActiveCode});
  const balanceTemplate = _.get(state, 'layout.ExchangeField.balanceTemplate');
  const submitButtonLabel = _.get(state, 'layout.Exchange.submitButtonLabel');
  const loadingLabel = _.get(state, 'layout.Exchange.loadingLabel');

  return {
    from,
    fromActive,
    fromActiveIndex,
    to,
    toActive,
    toActiveIndex,
    balanceTemplate,
    submitButtonLabel,
    ratesLoaded,
    loadingLabel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dataCurrencyUpdateRates: () => dispatch(dataCurrencyUpdateRatesAC()),
    exchangeFieldUpdate: ({fromCode, toCode, value, source}) =>
      dispatch(exchangeFieldUpdateAC({fromCode, toCode, value, source})),
    exchangeActiveUpdate: ({currencyCode, source}) => dispatch(exchangeActiveUpdateAC({currencyCode, source})),
    exchangeTransactionMake: ({fromCode, toCode, value}) =>
      dispatch(exchangeTransactionMakeAC({fromCode, toCode, value}))
  };
};

classes[displayName] = class extends Component<ExchangeComponentType> {
  static displayName = displayName;

  handleFieldChange = (source: string, event: SyntheticInputEvent<HTMLInputElement>): void => {
    const {fromActive, toActive, exchangeFieldUpdate} = this.props;
    let value = _.replace(event.target.value, /[^0-9.]/g, '');
    value = _.replace(value, /\.(\d*)\./g, '.$1');
    value = _.replace(value, /^0\d/g, '0');
    const valueSplit = _.split(value, '.');
    if (_.get(valueSplit, '[1].length') > 4) {
      value = _.join([valueSplit[0], valueSplit[1].substr(0, 4)], '.');
    }

    if (Math.abs(_.toNumber(value)) > 100000000) {
      return;
    }

    exchangeFieldUpdate({
      fromCode: _.get(fromActive, 'currencyCode'),
      toCode: _.get(toActive, 'currencyCode'),
      source,
      value: value !== '' ? _.toString(value) : ''
    });
  };

  handleActiveChange = (source: string, index: number): void => {
    this.props.exchangeActiveUpdate({
      source,
      currencyCode: _.get(this.props[source], [index, 'currencyCode'])
    });
  };

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const {fromActive, toActive, exchangeTransactionMake} = this.props;
    const value = _.get(fromActive, 'value');

    exchangeTransactionMake({
      fromCode: _.get(fromActive, 'currencyCode'),
      toCode: _.get(toActive, 'currencyCode'),
      value: value !== '' ? _.replace(value, /[^0-9.]/g, '') : ''
    });
  };

  render() {
    const {
      from,
      to,
      fromActive,
      toActive,
      balanceTemplate,
      toActiveIndex,
      fromActiveIndex,
      submitButtonLabel,
      ratesLoaded,
      loadingLabel
    } = this.props;

    const isLoading = ratesLoaded === 0;

    const isButtonDisabled =
      fromActive.value === '' ||
      toActive.value === '' ||
      _.toNumber(fromActive.value) > fromActive.balance ||
      _.get(fromActive, 'currencyCode') === _.get(toActive, 'currencyCode');

    return (
      <form onSubmit={this.handleSubmit} className={`${displayName} ${isLoading ? 'is-loading' : ''}`}>
        <div className={`${displayName}-header`}>
          <ExchangeRate
            {...{round: 4, fromCode: _.get(fromActive, 'currencyCode'), toCode: _.get(toActive, 'currencyCode')}}
          />
        </div>
        <div className={`${displayName}-fields`}>
          <Slider
            {...{
              className: `${displayName}-slider`,
              arrows: false,
              dots: true,
              infinite: false,
              initialSlide: fromActiveIndex,
              afterChange: this.handleActiveChange.bind(this, 'from')
            }}>
            {_.map(from, (item: ExchangeInnerItemType, index: number) => (
              <ExchangeField
                {...{
                  ...item,
                  key: index,
                  type: 'from',
                  isActive: fromActiveIndex === index,
                  handleChange: this.handleFieldChange.bind(this, 'from'),
                  balanceTemplate: balanceTemplate
                }}
              />
            ))}
          </Slider>
          <div className={`${displayName}-separator`}>
            <div className={`${displayName}-separator-i`} />
          </div>
          <Slider
            {...{
              className: `${displayName}-slider`,
              arrows: false,
              dots: true,
              infinite: false,
              initialSlide: toActiveIndex,
              afterChange: this.handleActiveChange.bind(this, 'to')
            }}>
            {_.map(to, (item: ExchangeInnerItemType, index: number) => (
              <ExchangeField
                {...{
                  ...item,
                  key: index,
                  type: 'to',
                  isActive: toActiveIndex === index,
                  handleChange: this.handleFieldChange.bind(this, 'to'),
                  balanceTemplate: balanceTemplate,
                  rateCode: _.get(fromActive, 'currencyCode')
                }}
              />
            ))}
          </Slider>
          <div className={`${displayName}-buttons`}>
            <button
              disabled={isButtonDisabled}
              tabIndex={3}
              className={`${displayName}-button ${isButtonDisabled ? 'is-disabled' : ''}`}
              type="submit">
              {submitButtonLabel}
            </button>
          </div>
        </div>
        <div className={`${displayName}-loading`}>
          <div className={`${displayName}-loading-i`}>{loadingLabel}</div>
        </div>
      </form>
    );
  }
};

export const component = classes[displayName];

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(classes[displayName]);

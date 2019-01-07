// @flow

import {Component} from 'react';
import {connect} from 'react-redux';
import {dataCurrencyUpdateRatesAC} from './actions';
import type {DataManagerComponentType} from './types';

const displayName = 'DataManager';
const classes = {};

const mapDispatchToProps = dispatch => {
  return {
    dataCurrencyUpdateRates: () => dispatch(dataCurrencyUpdateRatesAC())
  };
};

classes[displayName] = class extends Component<DataManagerComponentType> {
  intervalId: IntervalID;

  static displayName = displayName;

  componentDidMount(): void {
    const {dataCurrencyUpdateRates} = this.props;
    dataCurrencyUpdateRates();

    this.intervalId = setInterval(() => {
      dataCurrencyUpdateRates();
    }, 10000);
  }

  componentWillUnmount(): void {
    clearInterval(this.intervalId);
  }

  render() {
    return null;
  }
};

export const component = classes[displayName];

export default connect(
  null,
  mapDispatchToProps
)(classes[displayName]);

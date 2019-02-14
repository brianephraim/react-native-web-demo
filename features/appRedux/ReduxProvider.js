/*
  This module encapsulates react-redux setup boilerplate for the app.
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

// window.store is handy for development.
window.store = store;

class ReduxProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default ReduxProvider;

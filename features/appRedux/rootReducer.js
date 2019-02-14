/*
  This module is for aggregating the various reducers in the app.
*/

import { combineReducers } from 'redux';

import { newsReducers } from '../withNews/withNewsData';
import { newsApiSettingsReducers } from '../withNews/withNewsApiSettings'

const rootReducer = combineReducers({
  ...newsReducers,
  ...newsApiSettingsReducers,
});

export default rootReducer;

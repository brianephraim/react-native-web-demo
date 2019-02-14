import { combineReducers } from 'redux';

import { newsReducers } from '../withNewsData';
import { newsApiSettingsReducers } from '../withNewsApiSettings'

const rootReducer = combineReducers({
  ...newsReducers,
  ...newsApiSettingsReducers,
});

export default rootReducer;

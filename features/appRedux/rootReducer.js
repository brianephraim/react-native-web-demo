import { combineReducers } from 'redux';

import { newsReducers } from '../withNewsData';

const rootReducer = combineReducers({
  ...newsReducers,
});

export default rootReducer;

/*
  This module is a higher-order-component (HOC).
  It wraps other components.
  Wrapped components will receive prop methods to
  change the search settings values, and also it will
  receive props for the values of those settings.

  This module also exports redux reducers for these values.
  The reducers, actions, and connection boilerplate
  is co-located in this file for convenience
  because the logic of these parts is intertwined,
  and each part is very simple.
*/

import { connect } from 'react-redux';
import { combineReducers } from 'redux';

const mapStateToProps = ({ newsApiSettings }) => {
  return newsApiSettings;
};

const mapDispatchToProps = {
  setSearchTerm: searchTerm => dispatch =>
    dispatch({
      type: 'SET_NEWS_SEARCH_TERM',
      searchTerm,
    }),
  setSortBy: sortBy => dispatch =>
    dispatch({
      type: 'SET_NEWS_SORT_BY',
      sortBy,
    }),
};

export const newsApiSettingsReducers = {
  newsApiSettings: combineReducers({
    searchTerm: (state = '', action) => {
      switch (action.type) {
        case 'SET_NEWS_SEARCH_TERM':
          return action.searchTerm;
        default:
          return state;
      }
    },
    sortBy: (state = '', action) => {
      switch (action.type) {
        case 'SET_NEWS_SORT_BY':
          console.log('action', action);
          return action.sortBy;
        default:
          return state;
      }
    },
  }),
};

const connectNewsApiSettings = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withNewsApiSettings = connectNewsApiSettings;

export default withNewsApiSettings;

/*
  This module is a higher-order-component (HOC).
  It wraps other components.
  Wrapped components will receive prop methods to
  set data, set loading state,
  and also will receive props containing the news data,
  as well as data for managing pagination/infinite scroll.

  This module also exports redux reducers for these values.
  The reducers, actions, and connection boilerplate
  is co-located in this file for convenience
  because the logic of these parts is intertwined,
  and each part is very simple.
*/

import { connect } from 'react-redux';
import { combineReducers } from 'redux';

const mapStateToProps = ({ newsData }) => {
  return newsData;
};

const mapDispatchToProps = {
  setLoading: isLoading => dispatch =>
    dispatch({
      type: 'SET_NEWS_LOADING',
      isLoading,
    }),
  setNewsData: newsData => dispatch =>
    dispatch({
      type: 'SET_NEWS_DATA',
      ...newsData,
    }),
};

function parseArticles(articles){
  return articles.filter(item => item.urlToImage && item.content).map(item => ({
    ...item,
    uriObject: { uri: item.urlToImage },
  }));
}
export const newsReducers = {
  newsData: combineReducers({
    isLoading: (state = false, action) => {
      switch (action.type) {
        case 'SET_NEWS_LOADING':
          return action.isLoading;
        case 'SET_NEWS_DATA':
          return false;
        default:
          return state;
      }
    },
    articles: (state = [], action) => {
      switch (action.type) {
        case 'SET_NEWS_DATA': {
          const parsedArticles = parseArticles(action.articles);
          return !action.page ? parsedArticles : [
            ...state,
            ...parsedArticles,
          ];
        }
        default:
          return state;
      }
    },
    currentCount: (state = 0, action) => {
      switch (action.type) {
        case 'SET_NEWS_DATA':
          return !action.page ? action.articles.length : action.articles.length + state;
        default:
          return state;
      }
    },
    totalResults: (state = 0, action) => {
      switch (action.type) {
        case 'SET_NEWS_DATA':{
          return action.totalResults;
        }

        default:
          return state;
      }
    },
    currentPage: (state = 1, action) => {
      switch (action.type) {
        case 'SET_NEWS_DATA':
          return action.page || 1;
        default:
          return state;
      }
    },
  }),
};

const withNewsData = connect(
  mapStateToProps,
  mapDispatchToProps
);



export default withNewsData;

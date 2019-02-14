import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { combineReducers } from 'redux';

const mapStateToProps = ({ news }) => {
  return news;
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

export const newsReducers = {
  news: combineReducers({
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
        case 'SET_NEWS_DATA':
          console.log('action', action);
          return action.articles.map(item => ({
            ...item,
            uriObject: { uri: item.urlToImage },
          }));
        default:
          return state;
      }
    },
    totalResults: (state = 0, action) => {
      switch (action.type) {
        case 'SET_NEWS_DATA':
          return action.totalResults;
        default:
          return state;
      }
    },
    currentPage: (state = 1, action) => {
      switch (action.type) {
        case 'SET_NEWS_DATA':
          return action.totalResults;
        default:
          return state;
      }
    },
  }),
};

const connectNewsData = connect(
  mapStateToProps,
  mapDispatchToProps
);

function withNewsData(Comp) {
  class WithNewsData extends PureComponent {
    static propTypes = {
      setLoading: PropTypes.func.isRequired,
      setNewsData: PropTypes.func.isRequired,
    };
    async componentDidMount() {
      this.props.setLoading(true);
      const url =
        'https://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        'apiKey=0750fd6773de4038bbcbb4d5d99083a9';
      const req = new Request(url);
      let fetchResponse;
      try {
        fetchResponse = await fetch(req).then(response => response.json());
        if (fetchResponse.status !== 'ok') {
          console.log(fetchResponse);
          throw new Error(JSON.stringify(fetchResponse));
        }
        this.props.setNewsData(fetchResponse);
      } catch (e) {
        console.warn('WithNewsData fetch error', e);
        this.props.setLoading(false);
      }
    }
    render() {
      return <Comp {...this.props} />;
    }
  }
  return connectNewsData(WithNewsData);
}

export default withNewsData;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { combineReducers,compose } from 'redux';
import withNewsApiSettings from './withNewsApiSettings';
import fetchNewsApi from './fetchNewsApi';

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
          return action.articles.filter(item => item.urlToImage && item.content).map(item => ({
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

const composedPreliminaryHoc = compose(
  connectNewsData,
  withNewsApiSettings,
);
function withNewsData(Comp) {
  class WithNewsData extends PureComponent {
    static propTypes = {
      setLoading: PropTypes.func.isRequired,
      setNewsData: PropTypes.func.isRequired,
      sortBy: PropTypes.string.isRequired,
      searchTerm: PropTypes.string.isRequired,
    };
    async fetchNewsApi(){
      this.props.setLoading(true);
      let fetchResponse;
      try {
        const {sortBy,searchTerm} = this.props;
        fetchResponse = await fetchNewsApi({
          sortBy,
          searchTerm,
        });
        this.props.setNewsData(fetchResponse);
      } catch (e) {
        console.warn('WithNewsData fetch error', e);
        this.props.setLoading(false);
      }
    }
    componentDidMount() {
      this.fetchNewsApi();
    }
    componentDidUpdate(prevProps) {
      if (this.props.sortBy !== prevProps.sortBy || this.props.searchTerm !== prevProps.searchTerm) {
        this.fetchNewsApi();
      }
    }
    render() {
      return <Comp {...this.props} />;
    }
  }

  return composedPreliminaryHoc(WithNewsData);
}

export default withNewsData;

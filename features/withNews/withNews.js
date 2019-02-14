/*
  This module is a higher-order-component (HOC).
  It wraps other components.
  Wrapped components will then fetch news data when mounted,
  will fetch a new set of data when search settings change,
  will receive a prop method to fetch the next page,
  and will receive props from `withNewsData` and `withNewsApiSettings`.
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import withNewsApiSettings from '../withNews/withNewsApiSettings';
import fetchNewsApi from '../fetchNewsApi';
import withNewsData from '../withNews/withNewsData';

const composedPreliminaryHoc = compose(
  withNewsData,
  withNewsApiSettings
);
function withNews(Comp) {
  class WithNews extends PureComponent {
    static propTypes = {
      setLoading: PropTypes.func.isRequired,
      setNewsData: PropTypes.func.isRequired,
      sortBy: PropTypes.string.isRequired,
      searchTerm: PropTypes.string.isRequired,
      currentCount: PropTypes.number.isRequired,
      totalResults: PropTypes.number.isRequired,
      currentPage: PropTypes.number.isRequired,
    };
    async fetchNewsApi(page) {
      this.props.setLoading(true);
      let fetchResponse;
      try {
        const { sortBy, searchTerm } = this.props;
        fetchResponse = await fetchNewsApi({
          sortBy,
          searchTerm,
          page,
        });
        this.props.setNewsData({
          ...fetchResponse,
          page,
        });
      } catch (e) {
        console.warn('WithNews fetch error', e);
        this.props.setLoading(false);
      }
    }
    componentDidMount() {
      this.fetchNewsApi();
    }
    componentDidUpdate(prevProps) {
      if (
        this.props.sortBy !== prevProps.sortBy ||
        this.props.searchTerm !== prevProps.searchTerm
      ) {
        this.fetchNewsApi();
      }
    }
    fetchNextPage = () => {
      const { currentCount, totalResults, currentPage } = this.props;
      if (currentCount < totalResults) {
        this.fetchNewsApi(currentPage + 1);
      }
    };
    render() {
      return (
        <Comp
          {...this.props}
          fetchNextPage={this.fetchNextPage}
          apiSettingsKey={`${this.props.sortBy}_${this.props.searchTerm}`}
        />
      );
    }
  }

  return composedPreliminaryHoc(WithNews);
}

export default withNews;

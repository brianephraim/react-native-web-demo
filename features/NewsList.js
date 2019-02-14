/*
  This module is a component that renders
  an list of news articles.
  The list is infinite scrollable,
  and thanks to FlatList functionality,
  items scrolled off screen will unmount
  until scrolled back to improve memory efficiency.

  The list items are hydrate with data via the
  `withNews` HOC.

  The list has 2 columns that have fluid width
  with min and max widths.

  A search header component is injected into this component.

*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import withNews from './withNews';
import NewsSearchBar from './NewsSearchBar';

const styles = StyleSheet.create({
  listWrap: {
    flex:1,
  },
  list: {
    backgroundColor: '#EDECEC',
    width: '100%',
    paddingBottom: 26,
  },
  columnWrapperStyle: {
    width: '100%',
    minWidth: 670,
    maxWidth: 1040,
    alignSelf: 'center',
    paddingTop: 26,
    paddingLeft: 37,
    paddingRight: 33,
  },
  item: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    width: '50%',
    height: 555,
    flexDirection: 'column',
  },
  itemInner: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  image: { paddingTop: '56.25%', width: '100%' },
  header: {
    color: '#222222',
    fontFamily: 'Lato',
    marginHorizontal: 47,
    marginTop: 42,
    marginBottom: 11,
    fontSize: 24,
    fontWeight: '700',
  },
  text: {
    color: '#4f4f4f',
    fontFamily: 'Lato',
    marginHorizontal: 47,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 22,
    // maxHeight:30,
  },
  linkButton: {
    backgroundColor: '#313131',
    alignSelf: 'flex-start',
    marginHorizontal: 47,
    marginBottom: 46,
    color: '#ffffff',
    minWidth: 146,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    fontSize: 14,
    borderRadius: 3,
  },
  activityIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const stickyHeaderIndices = [0];
class NewsList extends PureComponent {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    fetchNextPage: PropTypes.func.isRequired,
    apiSettingsKey: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };
  onEndReached = () => {
    this.props.fetchNextPage();
  };
  keyExtractor = item => {
    return item.url;
  };
  renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemInner}>
          <View>
            <Image style={styles.image} source={item.uriObject} />
            <Text style={styles.header} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.text} numberOfLines={2}>
              {`${item.content.slice(0, 180).trim()}...`}
            </Text>
          </View>
          <Text
            href={item.url}
            accessibilityRole="link"
            target="_blank"
            style={styles.linkButton}
          >
            Read More
          </Text>
        </View>
      </View>
    );
  };
  render() {
    console.log('tt', this.props);
    return (
      <View style={styles.listWrap}>
        <FlatList
          refreshing={this.props.isLoading}
          key={this.props.apiSettingsKey}
          onEndReached={this.onEndReached}
          stickyHeaderIndices={stickyHeaderIndices}
          ListHeaderComponent={NewsSearchBar}
          style={styles.list}
          data={this.props.articles}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
        />
        {this.props.isLoading && (
          <ActivityIndicator style={styles.activityIndicator} />
        )}
      </View>
    );
  }
}

export default withNews(NewsList);

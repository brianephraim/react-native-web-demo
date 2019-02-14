import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import NewsList from './NewsList';
import NewsSearchBar from './NewsSearchBar';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrapInner: {
    maxWidth: 1040,
    minWidth: 670,
    flex: 1,
  },
});

class AppEntry extends PureComponent {
  render() {
    return (
      <View style={styles.wrap}>
        <View style={styles.wrapInner}>
          <NewsSearchBar />
          <NewsList />
        </View>
      </View>
    );
  }
}

export default AppEntry;

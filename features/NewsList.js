import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import withNewsData from './withNewsData';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#EDECEC',
    width: '100%',
    paddingLeft: 37,
    paddingRight: 33,
    paddingTop: 26,
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
    color: '#ffffff',
    minWidth: 146,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    fontSize: 14,
    borderRadius: 3,
  },
});

let i = 0;
const listData = [];
while (i++ < 1000) {
  listData.push({ key: `key_${i}`, value: `value_${i}` });
}
class NewsList extends PureComponent {
  constructor() {
    super();
    this.state = {
      articlesColumns: [],
    };
  }
  static propTypes = {
    articles: PropTypes.array.isRequired,
  };
  keyExtractor = item => {
    return item.title;
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemInner}>
          <Image style={styles.image} source={item.uriObject} />
          <Text style={styles.header} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.text} numberOfLines={2}>
            {item.content ? item.content.split('[+')[0] : item.description}
          </Text>
          <Text
            href={item.url}
            accessibilityRole="link"
            target="_blank"
            style={styles.linkButton}
          >
            Read More
          </Text>
          {/* <Text>author: {item.author}</Text>
          <View style={{
            backgroundColor:'pink',
            alignSelf:'center',
            height:0,
            paddingTop: '56.25%',
            width: '100%',
            borderWidth:1,
            borderColor:'black',
          }} />
          <Image
            style={{paddingTop: '56.25%',
            width: '100%',}}
            source={{uri: item.urlToImage}}
          />
          <Text>content: {item.content && item.content.substring(0, 100)}</Text>
          <Text>publishedAt: {item.publishedAt}</Text>
          <Text>title: {item.title}</Text>
          <Text>url: {item.url}</Text>
          <Text>urlToImage: {item.urlToImage}</Text>
          <Text>source: {item.source.name}</Text> */}
        </View>
      </View>
    );
  };
  render() {
    return (
      <FlatList
        style={styles.list}
        datax={this.state.articlesColumns}
        data={this.props.articles}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        numColumns={2}
      />
    );
  }
}

export default withNewsData(NewsList);

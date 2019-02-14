import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import withNewsApiSettings from './withNewsApiSettings';
import Dropdown from './Dropdown';

const styles = StyleSheet.create({
  headerWrap: {
    backgroundColor: '#454545',
    flexDirection:'row',
    justifyContent:'center',
  },
  headerWrapInner: {
    maxWidth: 1040,
    minWidth: 670,
    paddingLeft: 46,
    paddingRight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 64,
    flex:1
  },
  textInput: {
    backgroundColor: '#313131',
    color: '#ffffff',
    flex: 1,
    height: 40,
    paddingLeft: 15,
    fontSize: 14,
    fontFamily: 'Lato',
    marginRight: 9,
  },
  formButton: {
    backgroundColor: '#E31F3B',
    width: 147,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'Lato',
  },
});

class NewsSearchBar extends PureComponent {
  static propTypes = {
    setSearchTerm: PropTypes.func.isRequired,
    setSortBy: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
  };
  state = {
    searchTermEntry: '',
  };
  onChangeSort = (event) => {
    this.props.setSortBy(event.target.value);
  };
  onChangeSearchTermEntry = (event) => {
    this.setState({searchTermEntry:event.target.value});
  };
  onPressSearch = () => {
    this.props.setSearchTerm(this.state.searchTermEntry);
  };
  render() {
    return (
      <View style={styles.headerWrap}>
        <View style={styles.headerWrapInner}>
          <TextInput
            style={styles.textInput}
            placeholder="Some search term"
            placeholderTextColor="#ffffff"
            value={this.state.searchTermEntry}
            onChange={this.onChangeSearchTermEntry}
          />
          <Dropdown onChange={this.onChangeSort} value={this.props.sortBy} />
          <TouchableOpacity
            onPress={this.onPressSearch}
          >
            <Text style={styles.formButton}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNewsApiSettings(NewsSearchBar);

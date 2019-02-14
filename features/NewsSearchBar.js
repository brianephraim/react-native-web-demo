import React, { PureComponent } from 'react';
// import AppNavigatorSwitch from "./AppNavigatorSwitch";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Dropdown from './Dropdown';

const styles = StyleSheet.create({
  headerWrap: {
    backgroundColor: '#454545',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 46,
    paddingRight: 42,
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
    // backgroundColor: 'red'
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
  render() {
    return (
      <View style={styles.headerWrap}>
        <TextInput
          style={styles.textInput}
          placeholder="Some search term"
          placeholderTextColor="#ffffff"
        />
        <Dropdown />
        <TouchableOpacity>
          <Text style={styles.formButton}>Search</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default NewsSearchBar;

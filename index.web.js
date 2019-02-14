/*
  This module bootstraps the app with react-native-web.
*/

import { AppRegistry } from 'react-native';
import AppEntry from './features/AppEntry';

AppRegistry.registerComponent('ReactNativePlusWeb', () => AppEntry);

AppRegistry.runApplication('ReactNativePlusWeb', {
  rootTag: document.getElementById('root'),
});

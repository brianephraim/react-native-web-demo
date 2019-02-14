import React, { PureComponent } from 'react';
import ReduxProvider from './appRedux/ReduxProvider';
import BrowseNewsScreen from './BrowseNewsScreen';

class AppEntry extends PureComponent {
  render() {
    return (
      <ReduxProvider>
        <BrowseNewsScreen />
      </ReduxProvider>
    );
  }
}
/*  */
export default AppEntry;

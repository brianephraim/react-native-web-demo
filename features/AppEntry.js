/*
  This module is where app logic starts.
  All we are doing here right now is wrapping
  the NewsList with the ReduxProvider.
  This app only consists of the the NewsList as a screen.
  But if the app had more screens,
  a router instance would be here.
  If the app was more complex,
  there would be more provider wrappers.
*/
import React, { PureComponent } from 'react';
import ReduxProvider from './appRedux/ReduxProvider';
import NewsList from './NewsList';

class AppEntry extends PureComponent {
  render() {
    return (
      <ReduxProvider>
        <NewsList />
      </ReduxProvider>
    );
  }
}

export default AppEntry;

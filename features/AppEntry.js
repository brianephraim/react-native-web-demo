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

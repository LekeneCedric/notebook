import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Routes from './src/navigation';
import Provider_ from './provider_';

const App = () => {
  return (
    <Provider store={store}>
      <Provider_ />
      <Routes />
    </Provider>
  );
};

export default App;

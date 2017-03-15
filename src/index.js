import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import App from './App';
import store from './store';
import loadFont from './utils/font-loader';

loadFont({
  name: 'open-sans',
  path: '/fonts/open-sans.woff.css'
});

loadFont({
  name: 'open-sans-bold',
  path: '/fonts/open-sans-bold.woff.css'
});

loadFont({
  name: 'open-sans-light',
  path: '/fonts/open-sans-light.woff.css'
});

ReactDOM.render(
  <Provider store={store()}>
    <App />
  </Provider>,
  document.getElementById('root')
);

import App from './App';
import store from './store';

import './styles/fonts.scss';

const {Provider} = ReactRedux;

ReactDOM.render(
  <Provider store={store()}>
    <App />
  </Provider>,
  document.getElementById('root')
);

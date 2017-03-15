import App from './App';
import store from './store';
import loadFont from './utils/font-loader';

const {Provider} = ReactRedux;

loadFont({
  name: 'open-sans',
  path: '/fonts/open-sans.woff.css'
});

ReactDOM.render(
  <Provider store={store()}>
    <App />
  </Provider>,
  document.getElementById('root')
);

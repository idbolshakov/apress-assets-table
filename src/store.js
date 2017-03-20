import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSagas from './App/sagas';

const {createStore, applyMiddleware, compose} = Redux;
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSagas);

export default store;

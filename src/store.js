import rootReducer from './reducers';

const {createStore, compose} = Redux;

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      window.devToolsExtension ? window.devToolsExtension() : f => f,
  ));

  return store;
}

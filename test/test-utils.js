import {Provider} from 'react-redux';
import {createStore} from 'redux';
import React from 'react';
import {mount} from 'enzyme';

export const mountProvider = (test, initStore) =>
  mount(
    <Provider store={createStore(() => initStore)}>
      {test}
    </Provider>
  );

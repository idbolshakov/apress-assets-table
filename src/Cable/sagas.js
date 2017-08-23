import {put, select} from 'redux-saga/effects';

import {CABLE_SET_QUERY} from './actions';
import {CONFIG_NO_CHANGE, CONFIG_LOAD_START} from '../Filter/actions';

const getUpdatedCable = state => state.cable;

export default function* proccess() {
  const query = {};
  const state = yield select();

  if (state.config.isChange) {
    Object.keys(state.config.params)
      .forEach((key) => { query[key] = JSON.stringify(state.config.params[key]); });

    yield put({type: CABLE_SET_QUERY, payload: query});
    yield put({
      type: CONFIG_LOAD_START,
      payload: {config: state.config.config, location: yield select(getUpdatedCable)}
    });
    yield put({type: CONFIG_NO_CHANGE, payload: {}});
  }
}

import {call, put} from 'redux-saga/effects';
import {HELP_LOAD_SUCCESS} from './actions';
import {api} from '../utils';

const objToParams = (obj) => {
  const params = [];

  Object.keys(obj).forEach((key) => { params.push(`${key}=${obj[key]}`); });

  return params.join('&');
};

const getHelp = () =>
  api.get(`${app.config.help.url}?${objToParams(app.config.help.data)}`)
    .then(response => response.data);

export default function* loadHelp() {
  const help = yield call(getHelp);
  yield put({type: HELP_LOAD_SUCCESS, payload: help.hints});
}

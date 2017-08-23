import {call, put, select} from 'redux-saga/effects';
import {api} from '../utils';
import {TABLE_EDITOR_LOAD_SUCCESS, TABLE_EDITOR_LOAD_START} from './actions';
import {CONFIG_SET_SCENARIO} from '../Filter/actions';
import {ERROR_ADD, ERROR_REMOVE} from '../Error/actions';

let scenario = app.config.scenarios.current.slug;

const getTableData = data =>
  api.post(app.config.dataUrl, data)
    .then(response => response.data);

const getConfig = props => props.config.config || {};

export default function* loadTableData(action) {
  try {
    scenario = action.payload.scenario || scenario;
    yield put({type: ERROR_REMOVE, payload: {target: 'table'}});
    yield put({type: CONFIG_SET_SCENARIO, payload: scenario});
    const config = action.payload.config ? action.payload.config : yield select(getConfig);
    const table = yield call(getTableData, {config, scenario: config.scenario || scenario});
    yield put({type: TABLE_EDITOR_LOAD_SUCCESS, payload: table});
  } catch (err) {
    yield put({
      type: ERROR_ADD,
      payload: {
        type: 'server',
        target: 'table',
        title: 'Не удалось загрузить таблицу',
        action: TABLE_EDITOR_LOAD_START
      }
    });
  }
}

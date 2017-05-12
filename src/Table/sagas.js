import {call, put, select} from 'redux-saga/effects';
import {api} from '../utils';
import {TABLE_EDITOR_LOAD_SUCCESS, TABLE_EDITOR_LOAD_START} from './actions';
import {ERROR_ADD, ERROR_REMOVE} from '../Error/actions';

const initScenario = app.config.scenarios.current.slug;

const getTableData = config =>
  api.post(app.config.dataUrl, {config, scenario: initScenario})
    .then(response => response.data);

const getConfig = props => props.config.config;

export default function* loadTableData() {
  try {
    yield put({type: ERROR_REMOVE, payload: {target: 'table'}});
    const config = yield select(getConfig);
    const table = yield call(getTableData.bind({}, config));
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

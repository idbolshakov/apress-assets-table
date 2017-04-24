import {call, put, takeLatest} from 'redux-saga/effects';

const getTableData = () =>
  fetch('/_mock/table.json')
    .then(response => response.json());

const getRubricatorData = () =>
  fetch('/_mock/tree.json')
    .then(response => response.json());

const getHelp = () =>
  fetch('/_mock/help.json')
    .then(response => response.json());

export function* loadTableData() {
  const tableData = yield call(getTableData);
  yield put({type: 'TABLE_EDITOR_LOAD_SUCCESS', payload: tableData});
  yield put({type: 'CLEAR_HISTORY', payload: {}});
}

export function* loadRubricatorData() {
  const trubricatorData = yield call(getRubricatorData);
  yield put({type: 'TREE_LOAD_SUCCESS', payload: trubricatorData.tree_nodes});
}

export function* loadHelp() {
  try {
    const help = yield call(getHelp);
    yield put({type: 'HELP_LOAD_SUCCESS', payload: help.hints});
  } catch (err) {
    yield put({
      type: 'ERROR_ADD',
      payload: {
        type: 'server',
        title: 'Не удалось загрузить справку',
        action: 'HELP_LOAD_START'
      }
    });
  }
}

export function* save({payload}) {
  yield put({type: 'SAVE_CREATE_DIFF', payload});
}

export default function* subscribeForLoadTableData() {
  yield takeLatest('TABLE_EDITOR_LOAD_START', loadTableData);
  yield takeLatest('TREE_LOAD_START', loadRubricatorData);
  yield takeLatest('HELP_LOAD_START', loadHelp);
  yield takeLatest('SAVE_START', save);
}

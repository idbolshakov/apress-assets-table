import {call, put, takeLatest} from 'redux-saga/effects';

const getTableData = () =>
  fetch('/_mock/table.json')
    .then(response => response.json());

const getRubricatorData = () =>
  fetch('/_mock/tree.json')
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

export default function* subscribeForLoadTableData() {
  yield takeLatest('TABLE_EDITOR_LOAD_START', loadTableData);
  yield takeLatest('TREE_LOAD_START', loadRubricatorData);
}

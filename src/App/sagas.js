import {call, put, takeLatest} from 'redux-saga/effects';

const getTableData = () =>
  fetch('/_mock/table.json')
    .then(response => response.json());

export function* loadTableData() {
  const tableData = yield call(getTableData);
  yield put({type: 'LOAD_TABLE_DATA_SUCSESS', payload: tableData});
}

export default function* subscribeForLoadTableData() {
  yield takeLatest('LOAD_TABLE_DATA_START', loadTableData);
}

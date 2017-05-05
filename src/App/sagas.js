import {call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import * as imageEditorSagas from '../ImageEditor/sagas';
import loadTableData from '../Table/sagas';
import {loadRubricatorData, setRubricatorPosition} from '../Tree/sagas';
import {saveCreateDiff, save} from '../SaveControl/sagas';

const getHelp = () =>
  fetch('/_mock/help.json')
    .then(response => response.json());

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

export default function* subscribeForLoadTableData() {
  yield takeLatest('TABLE_EDITOR_LOAD_START', loadTableData);
  yield takeLatest('TREE_LOAD_START', loadRubricatorData);
  yield takeEvery('TREE_MOVE_NODE', setRubricatorPosition);
  yield takeLatest('HELP_LOAD_START', loadHelp);
  yield takeLatest('SAVE_CREATE_DIFF', saveCreateDiff);
  yield takeLatest('SAVE_START', save);
  yield takeLatest('IMAGE_EDITOR_UPDATE_IMAGES', imageEditorSagas.updateImages);
}

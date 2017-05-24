import {takeLatest, takeEvery} from 'redux-saga/effects';
import * as imageEditorSagas from '../ImageEditor/sagas';
import loadTableData from '../Table/sagas';
import loadHelp from '../Help/sagas';
import {loadRubricatorData, setRubricatorPosition} from '../Tree/sagas';
import {saveCreateDiff, save} from '../SaveControl/sagas';


export default function* subscribeForLoadTableData() {
  yield takeLatest('TABLE_EDITOR_LOAD_START', loadTableData);
  yield takeLatest('TREE_LOAD_START', loadRubricatorData);
  yield takeEvery('TREE_MOVE_NODE_REQUEST', setRubricatorPosition);
  yield takeLatest('HELP_LOAD_START', loadHelp);
  yield takeLatest('SAVE_CREATE_DIFF', saveCreateDiff);
  yield takeLatest('SAVE_START', save);
  yield takeLatest('IMAGE_EDITOR_UPDATE_IMAGES', imageEditorSagas.updateImages);
}

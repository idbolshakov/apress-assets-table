/* eslint  import/prefer-default-export: 0 */
import {put, select} from 'redux-saga/effects';
import {api} from '../utils';
import * as tableActions from '../Table/actions';
import * as dialogsActions from '../dialogs/actions';
import {saveStart, saveSuccess, saveFail} from './actions';

const UPLOAD_URL = app.config.imageUploadUrl;
const MODEL_NAME = app.config.imageModelName;

export function* updateImages(action) {
  const {images, files} = action.payload;
  const {activeRow, activeCell} = yield select(state => state.table.focus);

  yield put(saveStart());

  if (files.length) {
    const formData = new FormData();

    formData.append('model', MODEL_NAME);

    files.forEach((file) => {
      formData.append('images[]', file);
    });

    try {
      const res = yield api.post(UPLOAD_URL, formData);
      yield put(saveSuccess());
      const uploadedImages = res.data.ids.map((id, index) => ({src: files[index].preview, id}));
      yield put(tableActions.editImages({
        images: [...images, ...uploadedImages],
        activeRow,
        activeCell
      }));
      yield put(dialogsActions.hideImageEditor());
    } catch (error) {
      yield put(saveFail({error}));
    }
  } else {
    yield put(tableActions.editImages({images, activeRow, activeCell}));
    yield put(dialogsActions.hideImageEditor());
  }
}

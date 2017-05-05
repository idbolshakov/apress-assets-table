/* eslint  import/prefer-default-export: 0 */
import {put, select} from 'redux-saga/effects';
import {api} from '../utils';
import * as tableActions from '../Table/actions';
import * as dialogsActions from '../dialogs/actions';
import {saveStart, saveSuccess, saveFail} from './actions';

const UPLOAD_URL = app.config.imagesTigerUploadUrl;

export function* updateImages(action) {
  // ToDo: тут еще все изменится, бек не приняли
  const {images, files} = action.payload;
  const {activeRow, activeCell} = yield select(state => state.focus);

  yield put(saveStart());

  if (files.length) {
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
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

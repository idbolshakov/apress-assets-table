/* eslint  import/prefer-default-export: 0 */
import {put, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {api} from '../utils';
import * as actions from './actions';

const API_URL = app.config.companySettingsShowProductGroupsUrl;

export function* init() {
  yield put(actions.getStart());
  try {
    const res = yield api.get(API_URL);

    yield put(actions.getDone({showProductGroups: res.data.show_product_groups}));

    if (res.data.show_product_groups === false) {
      yield put(actions.showTooltip());
      yield call(delay, 20000);
      yield put(actions.hideTooltip());
    }
  } catch (error) {
    yield put(actions.getFail());
  }
}

export function* changeCategoryView(action) {
  const {showProductGroups} = action.payload;

  yield put(actions.updateStart());

  try {
    const res = yield api.put(API_URL, {show_product_groups: showProductGroups});

    yield put(actions.updateDone({showProductGroups: res.data.show_product_groups}));
  } catch (error) {
    yield put(actions.updateFail());
  }
}

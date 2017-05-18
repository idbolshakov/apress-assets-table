import {put, call, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import _isEqual from 'lodash/isEqual';
import {api} from '../utils';
import {TREE_LOAD_START} from '../Tree/actions';
import {TABLE_EDITOR_ROW_ADD_ID, TABLE_EDITOR_ROW_ADD_DEFAULT_ID} from '../Table/actions';
import {ERROR_REMOVE} from '../Error/actions';
import {SAVE_SUCCESS, SAVE_DIFF} from './actions';

let newId = -100000;

const putSave = rows =>
  api.put(app.config.urlSaveTiger, {rows})
    .then(response => response.data);

const pollingJob = jobId =>
  api.get(`${app.config.urlJob}/${jobId}`)
    .then(response => response.data);

const getSave = props => props.save;

const getFieldId = () => 'check';

const find = (secondRow, row) =>
  (row.id && secondRow.id && row.id === secondRow.id) ||
  (row.check && secondRow.check &&
  row.check.common.id === secondRow.check.common.id);

const transformForServer = records =>
  records.map((record) => {
    const newObj = {
      id: record.check.common.id,
      columns: {}
    };

    Object.keys(record).forEach((key) => {
      if (key !== 'check') {
        if (record[key].common) {
          // кастомное сохранение для поля с фотографиями
          if (record[key].common.images) {
            // привязка массива с фото
            if (record[key].common.images[0].src === '') {
              newObj.columns[key] = {images: []};
            } else {
              newObj.columns[key] =
                {images: record[key].common.images.map(image => ({id: image.id}))};
            }
          } else {
            newObj.columns[key] = record[key].common;
          }
        } else {
          newObj[key] = record[key];
        }
      }
    });

    return newObj;
  });

const validate = (column, row) => {
  if (row[column] && typeof row[column] === 'object' && row[column] !== null) {
    switch (column) {
      case 'name':
        return !!row.name.common.text;

      default:
        return true;
    }
  }

  return true;
};

const clearEmptyFields = (obj) => {
  if (typeof obj === 'object' && obj !== null) {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      const childField = clearEmptyFields(obj[key]);

      if (childField && Object.keys(childField).length) {
        newObj[key] = childField;
      }

      if (childField && typeof childField !== 'object') {
        newObj[key] = childField;
      }
    });

    return newObj;
  }

  return obj;
};

const getDeletedItems = (cur, prev) => {
  const deletedItems = [];
  prev.forEach((prevChild) => {
    const curChild = cur.find(find.bind({}, prevChild));

    if (!curChild) {
      deletedItems.push({
        check: {
          common: {
            id: prevChild.check.common.id
          }
        },
        destroy: true
      });
    }
  });

  return deletedItems;
};

const getNewItems = (cur, prev) => {
  const newItems = [];
  cur.forEach((curChild) => {
    const prevChild = prev.find(find.bind({}, curChild));

    if (!prevChild && validate('name', curChild)) {
      newItems.push(clearEmptyFields(curChild));
    }
  });

  return newItems;
};

const getDiff = (cur, prev) => {
  if (Array.isArray(prev) && ((cur.length && cur[0].src) || (prev.length && prev[0].src))) {
    if (!(_isEqual(cur, prev))) {
      if (!cur.length) {
        return [{src: ''}];
      }
      return cur;
    }
  }

  if (Array.isArray(prev) && prev.length) {
    const tmpDiff = [];
    prev.forEach((prevChild) => {
      const curChild = cur.find(find.bind({}, prevChild));
      if (curChild) {
        const childDiff = getDiff(curChild, prevChild);

        if (childDiff && typeof childDiff === 'object' && Object.keys(childDiff).length) {
          if (Object.keys(prevChild).includes(getFieldId())) {
            childDiff[getFieldId()] = prevChild[getFieldId()];
          }

          tmpDiff.push(childDiff);
        }

        if (childDiff && typeof childDiff !== 'object') {
          tmpDiff.push(childDiff);
        }
      }
    });
    return tmpDiff;
  }

  if (typeof prev === 'object' && prev !== null) {
    const objDiff = {};
    Object.keys(prev).forEach((childKey) => {
      if (validate(childKey, cur)) {
        const childDiff = getDiff(cur[childKey], prev[childKey]);

        if (childDiff && Object.keys(childDiff).length) {
          objDiff[childKey] = childDiff;
        }

        if ((childDiff && typeof childDiff !== 'object') || childDiff === null) {
          objDiff[childKey] = childDiff;
        }
      }
    });

    return objDiff;
  }

  return cur !== prev ? (cur || null) : undefined;
};

const createDiff = (curState, prevState) => {
  const diff = getDiff(curState, prevState);
  const deletedItems = getDeletedItems(curState, prevState);
  const newItems = getNewItems(curState, prevState);

  return transformForServer([...diff, ...deletedItems, ...newItems]);
};

export function* saveCreateDiff(action) {
  try {
    const diff = createDiff(action.payload.curState, action.payload.prevState);
    const state = yield select(getSave);
    let waitingState = state.waitingState;
    if (waitingState.length) {
      diff.forEach((record) => {
        const waitingItem = waitingState.find(item => item.id === record.id);

        if (waitingItem) {
          if (waitingItem.destroy && !record.destroy) {
            delete waitingItem.destroy;
          }

          Object.keys(record).forEach((key) => {
            if (typeof record[key] === 'object' && record[key] !== null) {
              waitingItem[key] = {...waitingItem[key], ...record[key]};
            } else {
              waitingItem[key] = record[key];
            }
          });
        } else {
          waitingState.push(record);
        }
      });
    } else {
      waitingState = diff;
    }

    yield put({
      type: SAVE_DIFF,
      payload: {
        waitingState,
        prevState: action.payload.curState
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export function* save() {
  try {
    yield put({type: ERROR_REMOVE, payload: {target: 'save'}});

    const saveProps = yield select(getSave);

    if (saveProps.saveState.length) {
      const job = yield call(putSave.bind({}, saveProps.saveState));
      let response = {};

      while (true) {
        yield call(delay, 1000);
        response = yield call(pollingJob.bind({}, job.job_id));

        if (response.failed || response.succeeded) {
          break;
        }
      }

      if (response.succeeded) {
        const deletedItems = saveProps.saveState.filter(row => row.destroy);
        if (deletedItems.length) {
          yield put({
            type: TABLE_EDITOR_ROW_ADD_DEFAULT_ID,
            payload: deletedItems.map((item) => {
              const data = {
                id: item.id,
                record_id: newId
              };
              newId -= 1;

              return data;
            })
          });
        }

        yield put({type: TABLE_EDITOR_ROW_ADD_ID, payload: response.payload});
        yield put({type: TREE_LOAD_START, payload: null});
      }
    }

    yield put({type: SAVE_SUCCESS, payload: {error: false}});
  } catch (err) {
    yield put({type: SAVE_SUCCESS, payload: {error: true}});
  }
}

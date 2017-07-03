import {put, call, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import _isEqual from 'lodash/isEqual';
import {api} from '../utils';
import {TREE_LOAD_START} from '../Tree/actions';
import {TABLE_EDITOR_ROW_ADD_ID, TABLE_EDITOR_ROW_ADD_DEFAULT_ID} from '../Table/actions';
import {ERROR_REMOVE} from '../Error/actions';
import {SAVE_SUCCESS, SAVE_DIFF} from './actions';

let newId = -100000;

export const putSave = rows =>
  api.put(app.config.urlSaveTiger, {rows})
    .then(response => response.data);

export const pollingJob = jobId =>
  api.get(`${app.config.urlJob}/${jobId}`)
    .then(response => response.data);

export const getSave = props => props.save;

const find = (secondRow, row) =>
  (row.id && secondRow.id && row.id === secondRow.id) ||
  (row.check && secondRow.check &&
  row.check.common.id === secondRow.check.common.id);

export const transformForServer = records =>
  records.map((record) => {
    const newObj = {
      id: record.check.common.id,
      columns: {}
    };

    Object.keys(record).forEach((key) => {
      if (key !== 'check') {
        if (record[key].common) {
          newObj.columns[key] = record[key].common;
        } else {
          newObj[key] = record[key];
        }
      }
    });

    return newObj;
  });

export const getDeletedItems = (cur, prev) => {
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

export const getCheckDifference = currentState => ({
  check: {
    common: {
      id: currentState.check.common.id
    }
  }
});

export const getProductGroupDifference = (currentState, previousState) => {
  const currentParentId = currentState.product_group.common.parent_id;
  const previousParentId = previousState.product_group.common.parent_id;

  if (currentParentId !== previousParentId ||
    String(currentState.check.common.id).includes('-')) {
    return {
      product_group: {
        common: {
          parent_id: currentParentId || null
        }
      }
    };
  }

  return null;
};

export const getTextCellDifference = (currentState, previousState, currentCellKey) => {
  const currentText = currentState[currentCellKey].common.text;
  const previousText = previousState[currentCellKey].common.text;

  if (currentText !== previousText) {
    return {
      [currentCellKey]: {
        common: {
          text: currentText
        }
      }
    };
  }

  return null;
};

export const getPhotoDifference = (currentState, previousState) => {
  const currentImages = currentState.photo.common.images;
  const previousImages = previousState.photo.common.images;

  if (!_isEqual(currentImages, previousImages)) {
    return {
      photo: {
        common: {
          images: currentImages.map(image => ({id: image.id}))
        }
      }
    };
  }

  return null;
};

export const getRowDifference = (currentState, previousState) => {
  let differenceRow = {};

  Object.keys(currentState).forEach((currentCellKey) => {
    switch (currentCellKey) {
      case 'check':
        differenceRow = {
          ...differenceRow,
          ...getCheckDifference(currentState)
        };
        break;

      case 'product_group':
        differenceRow = {
          ...differenceRow,
          ...getProductGroupDifference(currentState, previousState)
        };
        break;

      case 'photo':
        differenceRow = {
          ...differenceRow,
          ...getPhotoDifference(currentState, previousState)
        };
        break;

      case 'description':
      case 'detailed_description':
      case 'h1':
      case 'name':
      case 'page_description':
      case 'tag_title':
      case 'url':
        differenceRow = {
          ...differenceRow,
          ...getTextCellDifference(currentState, previousState, currentCellKey)
        };
        break;

      default:
        break;
    }
  });

  return differenceRow;
};

export const getRowsDifference = (currentState, previousState) => {
  const differenceState = currentState.map((currentRow) => {
    let differenceRow = {};
    const previousRow = previousState
      .find(row => row.check.common.id === currentRow.check.common.id);

    if (currentRow.name.common.text) {
      if (previousRow) {
        differenceRow = getRowDifference(currentRow, previousRow);
      } else {
        differenceRow = currentRow;
      }
    } else {
      differenceRow = {
        id: currentRow.check.common.id,
        invalid: true
      };
    }

    return differenceRow;
  });

  return differenceState.filter(differenceRow => Object.keys(differenceRow).length > 1);
};

export const getDifferenceState = (currentState, previousState) => {
  const differenceState = [
    ...getRowsDifference(currentState, previousState),
    ...getDeletedItems(currentState, previousState)
  ];
  const invalidDifferenceState = differenceState.filter(differenceRow => differenceRow.invalid);
  const validDifferenceState = differenceState.filter(differenceRow => !differenceRow.invalid);

  return {
    validDifferenceState: transformForServer(validDifferenceState),
    invalidDifferenceState
  };
};

export const mergeDifference = (difference, waitingState = []) => {
  difference.forEach((differenceRow) => {
    let waitingRow = waitingState.find(_waitingRow => _waitingRow.id === differenceRow.id);

    if (waitingRow) {
      if (!(differenceRow.id < 0 && differenceRow.destroy)) {
        if (waitingRow.destroy && !differenceRow.destroy) {
          delete waitingRow.destroy;
        }

        Object.keys(differenceRow).forEach((differenceRowKey) => {
          if (typeof differenceRow[differenceRowKey] === 'object' &&
            differenceRow[differenceRowKey] !== null) {
            waitingRow[differenceRowKey] = {
              ...waitingRow[differenceRowKey],
              ...differenceRow[differenceRowKey]
            };
          } else {
            waitingRow[differenceRowKey] = differenceRow[differenceRowKey];
          }
        });
      } else {
        waitingRow = undefined;
      }
    } else if (!(differenceRow.id < 0 && differenceRow.destroy)) {
      waitingState.push(differenceRow);
    }
  });

  return waitingState.filter(row => !!row);
};

export const setInvalidDifferenceForCurrentState = (currentState, previousState, difference) => {
  if (difference.length) {
    return currentState.map((currentRow) => {
      const differenceRow = difference
        .find(_differenceRow => currentRow.check.common.id === _differenceRow.id);

      if (differenceRow) {
        const previousRow = previousState
          .find(_previousRow => differenceRow.id === _previousRow.check.common.id);

        if (previousRow) {
          return previousRow;
        }

        return currentRow;
      }

      return currentRow;
    });
  }

  return currentState;
};
export function* saveCreateDiff(action) {
  const {
    validDifferenceState,
    invalidDifferenceState
  } = yield getDifferenceState(action.payload.curState, action.payload.prevState);
  const saveSate = yield select(getSave);
  const waitingState = yield mergeDifference(validDifferenceState, saveSate.waitingState);
  const currentState = yield setInvalidDifferenceForCurrentState(
    [...action.payload.curState],
    action.payload.prevState,
    invalidDifferenceState
  );

  yield put({
    type: SAVE_DIFF,
    payload: {
      waitingState,
      prevState: currentState
    }
  });
}
window.saveCreateDiff = saveCreateDiff;

export function* save() {
  try {
    yield put({type: ERROR_REMOVE, payload: {target: 'save'}});

    const saveProps = yield select(getSave);
    if (saveProps.saveState.length) {
      const job = yield call(putSave, saveProps.saveState);
      let response = {};

      while (true) {
        yield call(delay, 1000);
        response = yield call(pollingJob, job.job_id);

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

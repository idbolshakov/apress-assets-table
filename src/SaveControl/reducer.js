import {
  SAVE_SUCCESS,
  SAVE_REPEAT,
  SAVE_CREATE_DIFF,
  SAVE_PROGRESS
} from './actions';
import {
  TABLE_EDITOR_LOAD_SUCCESS,
  TABLE_EDITOR_SET_TEXT,
  TABLE_EDITOR_CELL_END_DRAG,
  TABLE_EDITOR_ROW_ADD_DEFAULT_ID,
  TABLE_EDITOR_ROW_ADD_ID,
  TABLE_EDITOR_SET_IMAGES,
} from '../Table/actions';

const initialState = {
  isSave: false,
  isError: false,
  prevState: [],
  saveProgress: false,
  waitingState: [],
  saveState: []
};


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
          newObj.columns[key] = record[key].common;
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

export default function (state = initialState, action) {
  switch (action.type) {
    case TABLE_EDITOR_LOAD_SUCCESS:
      return {
        ...state,
        prevState: action.payload.rows
      };

    case SAVE_REPEAT:
    case TABLE_EDITOR_CELL_END_DRAG:
    case TABLE_EDITOR_SET_TEXT:
    case TABLE_EDITOR_SET_IMAGES:
    case 'HISTORY_PREV':
    case 'HISTORY_NEXT':
      return {
        ...state,
        isSave: true
      };

    case SAVE_CREATE_DIFF: {
      const diff = createDiff(action.payload.curState, action.payload.prevState);
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

      return {
        ...state,
        waitingState,
        isSave: false,
        prevState: action.payload.curState
      };
    }

    case SAVE_PROGRESS:
      return {
        ...state,
        saveState: state.waitingState,
        isProgress: true,
        isError: false,
        waitingState: []
      };

    case TABLE_EDITOR_ROW_ADD_DEFAULT_ID:
    case TABLE_EDITOR_ROW_ADD_ID: {
      const tmpPrevState = state.prevState.map((row) => {
        const payloadItem = action.payload.find(payloadRow =>
          row.check.common.id === payloadRow.id);

        if (payloadItem) {
          return {
            ...row,
            check: {
              ...row.check,
              common: {
                ...row.check.common,
                id: payloadItem.record_id
              }
            }
          };
        }

        return row;
      });

      const tmpWaitingState = state.waitingState.map((row) => {
        const payloadItem = action.payload.find(payloadRow => row.id === payloadRow.id);

        if (payloadItem) {
          return {
            ...row,
            id: payloadItem.record_id
          };
        }

        return row;
      });

      return {
        ...state,
        waitingState: tmpWaitingState,
        prevState: tmpPrevState
      };
    }

    case SAVE_SUCCESS: {
      if (!action.payload.error) {
        return {
          ...state,
          saveState: [],
          isProgress: false,
        };
      }

      const saveState = state.saveState;

      state.waitingState.forEach((record) => {
        const saveItem = saveState.find(item => item.id === record.id);

        if (saveItem) {
          if (saveItem.destroy && !record.destroy) {
            delete saveItem.destroy;
          }

          Object.keys(record).forEach((key) => {
            console.log(saveItem, record, key);
            if (typeof record[key] === 'object' && record[key] !== null) {
              saveItem[key] = {...saveItem[key], ...record[key]};
            } else {
              saveItem[key] = record[key];
            }
          });
        } else {
          saveState.push(record);
        }
      });

      return {
        ...state,
        saveState: [],
        waitingState: saveState,
        isProgress: false,
        isSave: true,
        isError: true
      };
    }

    default:
      return state;
  }
}

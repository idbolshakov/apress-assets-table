import {
  SAVE_SUCCESS,
  SAVE_REPEAT,
  SAVE_CREATE_DIFF,
  SAVE_START,
  SAVE_DIFF
} from './actions';
import {
  TABLE_EDITOR_LOAD_SUCCESS,
  TABLE_EDITOR_SET_TEXT,
  TABLE_EDITOR_ROW_ADD_DEFAULT_ID,
  TABLE_EDITOR_ROW_ADD_ID,
  TABLE_EDITOR_SET_IMAGES,
  TABLE_EDITOR_ROW_ADD,
  TABLE_EDITOR_CELL_SELECT_END
} from '../Table/actions';
import rows from '../Table/rowReducer';

const initialState = {
  isSave: false,
  isError: false,
  prevState: [],
  isProgress: false,
  fetchDiff: false,
  waitingState: [],
  saveState: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TABLE_EDITOR_LOAD_SUCCESS:
      return {
        ...state,
        prevState: [...action.payload.rows]
      };

    case SAVE_REPEAT:
    case TABLE_EDITOR_SET_TEXT:
    case TABLE_EDITOR_SET_IMAGES:
    case TABLE_EDITOR_ROW_ADD:
    case TABLE_EDITOR_CELL_SELECT_END:
    case 'HISTORY_PREV':
    case 'HISTORY_NEXT':
      return {
        ...state,
        isSave: true
      };

    case SAVE_CREATE_DIFF:
      return {
        ...state,
        fetchDiff: true,
        isSave: false,
      };

    case SAVE_DIFF:
      return {
        ...state,
        waitingState: action.payload.waitingState,
        fetchDiff: false,
        prevState: action.payload.prevState
      };

    case SAVE_START: {
      const saveState = [];
      const waitingState = [];

      state.waitingState.forEach((row) => {
        const columns = row.columns;

        if (row.id > 0 && columns.product_group) {
          delete columns.product_group;
          if (!Object.keys(columns).length) {
            return;
          }
        }

        if (columns.product_group && columns.product_group.parent_id < 0) {
          waitingState.push(row);
        } else {
          saveState.push(row);
        }
      });

      return {
        ...state,
        saveState,
        waitingState,
        isProgress: true,
        isError: false
      };
    }

    case TABLE_EDITOR_ROW_ADD_DEFAULT_ID:
    case TABLE_EDITOR_ROW_ADD_ID: {
      const tmpWaitingState = state.waitingState.map((row) => {
        const payloadItem = action.payload.find(payloadRow => row.id === payloadRow.id);
        const payloadChildItem = action.payload.find(payloadRow =>
          row.columns.product_group && row.columns.product_group.parent_id === payloadRow.id);

        if (payloadItem) {
          return {
            ...row,
            id: payloadItem.record_id
          };
        }

        if (payloadChildItem) {
          return {
            ...row,
            columns: {
              ...row.columns,
              product_group: {
                parent_id: payloadChildItem.record_id
              }
            }
          };
        }

        return row;
      });

      return {
        ...state,
        waitingState: tmpWaitingState,
        prevState: rows(state.prevState, action)
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

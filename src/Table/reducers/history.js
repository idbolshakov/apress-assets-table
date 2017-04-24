import rows from '../reducerRow';
import {
  TABLE_EDITOR_LOAD_SUCCESS,
  TABLE_EDITOR_SET_TEXT,
  TABLE_EDITOR_CELL_END_DRAG,
  TABLE_EDITOR_ROW_ADD,
  TABLE_EDITOR_ROW_ADD_ID,
  TABLE_EDITOR_ROW_ADD_DEFAULT_ID,
  HISTORY_NEXT,
  HISTORY_PREV
} from '../actions';

const initialState = {
  prev: [],
  next: [],
  current: []
};

export default function history(state = initialState, action) {
  switch (action.type) {
    case TABLE_EDITOR_LOAD_SUCCESS:
      return {
        ...state,
        current: rows(state.current, action),
        next: [],
        prev: []
      };

    case TABLE_EDITOR_SET_TEXT:
    case TABLE_EDITOR_CELL_END_DRAG:
    case TABLE_EDITOR_ROW_ADD:
      return {
        ...state,
        prev: [state.current, ...state.prev],
        current: rows(state.current, action),
        next: []
      };

    case TABLE_EDITOR_ROW_ADD_ID: {
      const newPrev = state.prev.map(prev =>
        prev.map((item) => {
          const payloadItem = action.payload.find(row => item.check.common.id === row.id);

          if (payloadItem) {
            return {
              ...item,
              check: {
                ...item.check,
                common: {
                  ...item.check.common,
                  id: payloadItem.record_id
                }
              }
            };
          }

          return item;
        })
      );

      return {
        ...state,
        prev: newPrev,
        current: rows(state.current, action),
      };
    }

    case TABLE_EDITOR_ROW_ADD_DEFAULT_ID: {
      const newNext = state.next.map(next =>
        next.map((item) => {
          const payloadItem = action.payload.find(row => item.check.common.id === row.id);

          if (payloadItem) {
            return {
              ...item,
              check: {
                ...item.check,
                common: {
                  ...item.check.common,
                  id: payloadItem.record_id
                }
              }
            };
          }

          return item;
        })
      );

      return {
        ...state,
        next: newNext,
      };
    }

    case HISTORY_PREV:
      return {
        ...state,
        current: state.prev[0],
        prev: state.prev.slice(1, state.prev.length),
        next: [state.current, ...state.next]
      };

    case HISTORY_NEXT:
      return {
        ...state,
        current: state.next[0],
        prev: [state.current, ...state.prev],
        next: state.next.slice(1, state.next.length),
      };

    default:
      return state;
  }
}

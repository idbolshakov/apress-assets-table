import {SAVE_PROGRESS, SAVE_SUCCESS} from './actions';
import {TABLE_EDITOR_LOAD_SUCCESS, TABLE_EDITOR_SET_TEXT} from '../Table/actions';

const initialState = {
  isSave: false,
  isError: false,
  error: [],
  prevProps: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TABLE_EDITOR_LOAD_SUCCESS:
      return {
        ...state,
        prevProps: action.payload.rows
      };

    case TABLE_EDITOR_SET_TEXT:
    case '@@redux-undo/UNDO':
    case '@@redux-undo/REDO':
      return {
        ...state,
        isSave: true
      };

    case SAVE_PROGRESS:
      return {
        ...state,
        isSave: false,
        isProgress: true,
        prevProps: action.payload
      };

    case SAVE_SUCCESS:
      return {
        ...state,
        isProgress: false,
        isError: action.payload.error.length,
        error: action.payload.error,
      };

    default:
      return state;
  }
}

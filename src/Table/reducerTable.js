import {TABLE_EDITOR_LOAD_START, TABLE_EDITOR_LOAD_SUCCESS} from './actions';

const initialState = {
  columns: [],
  isLoad: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TABLE_EDITOR_LOAD_START:
      return {
        ...state,
        isLoad: false
      };

    case TABLE_EDITOR_LOAD_SUCCESS:
      return {
        ...state,
        columns: action.payload.columns,
        total: action.payload.total,
        isLoad: true
      };

    default:
      return state;
  }
}

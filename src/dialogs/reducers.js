import * as types from './actions';

const initialState = {
  removeRowConfirmOpen: false,
  removeEmptyRowConfirmOpen: false,
  removeRowsConfirmOpen: false,
  imageEditor: false,
  selectedIds: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_REMOVE_ROW_CONFIRMATION:
      return {
        ...initialState,
        removeRowConfirmOpen: true,
        selectedIds: [action.payload.id]
      };

    case types.SHOW_REMOVE_ROWS_CONFIRMATION:
      return {...initialState, removeRowsConfirmOpen: true};

    case types.SHOW_REMOVE_EMPTY_ROWS_CONFIRMATION:
      return {...initialState, removeEmptyRowConfirmOpen: true};

    case types.SHOW_IMAGE_EDITOR:
      return {...initialState, imageEditor: true};

    case types.HIDE_REMOVE_ROW_CONFIRMATION:
    case types.HIDE_REMOVE_ROWS_CONFIRMATION:
    case types.HIDE_REMOVE_EMPTY_ROWS_CONFIRMATION:
    case types.HIDE_IMAGE_EDITOR:
      return initialState;

    default:
      return state;
  }
};

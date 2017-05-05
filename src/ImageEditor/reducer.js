import * as types from './actions';

const initialState = {
  row: {},
  images: [],
  isFetching: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.IMAGE_EDITOR_EDIT_IMAGES:
      return {
        ...initialState,
        row: action.payload.row,
        images: action.payload.images || [],
      };

    case types.IMAGE_EDITOR_SAVE_IMAGES_START:
      return {
        ...state,
        isFetching: true,
      };

    case types.IMAGE_EDITOR_SAVE_IMAGES_FAIL:
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case types.IMAGE_EDITOR_CLEAN:
    case types.IMAGE_EDITOR_SAVE_IMAGES_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

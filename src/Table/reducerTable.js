import {LOAD_TABLE_DATA_START, LOAD_TABLE_DATA_SUCCESS} from './actions';

const initialState = {
  columns: [],
  isLoad: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_TABLE_DATA_START:
      return {
        ...state,
        isLoad: false
      };

    case LOAD_TABLE_DATA_SUCCESS:
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

import {LOAD_TABLE_DATA_SUCCESS, SET_DATA_TEXT_CELL} from './actions';

export default function rows(state = [], action) {
  switch (action.type) {
    case LOAD_TABLE_DATA_SUCCESS:
      return action.payload.rows;

    case SET_DATA_TEXT_CELL:
      return state.map((row) => {
        if (row.check.common.id === action.payload.id) {
          const cell = row[action.payload.name];

          return {
            ...row,
            [action.payload.name]: {
              ...cell,
              common: {
                ...cell.common,
                [action.payload.field]: action.payload.text
              }
            }
          };
        }

        return row;
      });

    default:
      return state;
  }
}

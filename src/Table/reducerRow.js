import {TABLE_EDITOR_LOAD_SUCCESS, TABLE_EDITOR_SET_TEXT} from './actions';

export default function rows(state = [], action) {
  switch (action.type) {
    case TABLE_EDITOR_LOAD_SUCCESS:
      return action.payload.rows;

    case TABLE_EDITOR_SET_TEXT:
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

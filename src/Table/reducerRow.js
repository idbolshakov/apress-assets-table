import {
  TABLE_EDITOR_LOAD_SUCCESS,
  TABLE_EDITOR_SET_TEXT,
  TABLE_EDITOR_CELL_END_DRAG,
  TABLE_EDITOR_ROW_ADD,
  TABLE_EDITOR_ROW_ADD_ID
} from './actions';

let newId = -1;

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

    case TABLE_EDITOR_CELL_END_DRAG: {
      let cellsFrom = [];
      const copyToLength = action.payload.selectionData.idTo.length;

      state.forEach((row) => {
        if (action.payload.selectionData.ids.find(id => row.check.common.id === id)) {
          cellsFrom.push(row[action.payload.name]);
        }
      });

      if (copyToLength > cellsFrom.length) {
        const count = copyToLength / cellsFrom.length;
        for (let i = 0; i < count; i++) {
          cellsFrom = cellsFrom.concat(cellsFrom);
        }
      }

      let iterator = 0;
      return state.map((row) => {
        if (action.payload.selectionData.idTo.find(id => row.check.common.id === id)) {
          const cell = cellsFrom[iterator];
          iterator++;

          return {
            ...row,
            [action.payload.name]: {
              ...cell,
            }
          };
        }

        return row;
      });
    }

    case TABLE_EDITOR_ROW_ADD: {
      const target = (action.payload && action.payload.target) ?
        state.indexOf(action.payload.target) : 0;
      const newstate = [...state];
      const newRow = {
        ...action.payload.new_row,
        check: {
          ...action.payload.new_row.check,
          common: {
            ...action.payload.new_row.check.common,
            id: newId
          }
        }
      };

      newId -= 1;

      newstate.splice(target, 0, newRow);

      return newstate;
    }

    case TABLE_EDITOR_ROW_ADD_ID:
      return state.map((row) => {
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

    default:
      return state;
  }
}

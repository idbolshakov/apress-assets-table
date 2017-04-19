import {
  TABLE_EDITOR_LOAD_SUCCESS,
  TABLE_EDITOR_SET_TEXT,
  TABLE_EDITOR_CELL_END_DRAG,
  TABLE_EDITOR_ROW_ADD
} from './actions';

let newId = -1;

const createNewRow = (parent) => {
  const row = {};

  Object.keys(parent).forEach((key) => {
    row[key] = {
      common: {}
    };

    Object.keys(parent[key].common).forEach((commonKey) => {
      if (key === 'check' && commonKey === 'id') {
        row[key].common[commonKey] = newId;
        newId -= 1;
      } else if (key === 'product_group' && commonKey === 'ancestors') {
        row[key].common[commonKey] = [];
      } else {
        row[key].common[commonKey] = null;
      }
    });
  });

  return row;
};

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
      const newRow = createNewRow(state[0]);

      newstate.splice(target, 0, newRow);

      return newstate;
    }

    default:
      return state;
  }
}

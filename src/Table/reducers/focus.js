import * as types from '../actions';

const initialState = {
  activeRow: null,
  activeCell: null,
  edit: false,
  rows: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TABLE_EDITOR_CELL_SELECT_START:
      return {...state, activeRow: null, activeCell: null};

    case types.TABLE_EDITOR_START_TEXT_EDIT:
      return {...state, edit: true};

    case types.TABLE_EDITOR_END_TEXT_EDIT:
      return {...state, edit: false};

    case types.TABLE_EDITOR_CELL_FOCUS_NEXT: {
      const rows = action.payload.rows;
      const cells = Object.keys(rows[0]);
      const index = cells.findIndex(cell => cell === state.activeCell);
      const activeCell = cells[index === -1 ? 0 : index + 1];

      return {...state, activeCell: activeCell || state.activeCell};
    }

    case types.TABLE_EDITOR_CELL_FOCUS_PREV: {
      const rows = action.payload.rows;
      const cells = Object.keys(rows[0]);
      const index = cells.findIndex(cell => cell === state.activeCell);
      const activeCell = cells[index === -1 ? 0 : index - 1];

      return {...state, activeCell: activeCell || state.activeCell};
    }

    case types.TABLE_EDITOR_CELL_FOCUS_DOWN: {
      const rows = action.payload.rows;
      const index = rows.findIndex(row => row.check.common.id === state.activeRow);
      const activeRow = rows[index === -1 ? 0 : index + 1];

      return {...state, activeRow: activeRow ? activeRow.check.common.id : state.activeRow};
    }

    case types.TABLE_EDITOR_CELL_FOCUS_UP: {
      const rows = action.payload.rows;
      const index = rows.findIndex(row => row.check.common.id === state.activeRow);
      const activeRow = rows[index === -1 ? 0 : index - 1];

      return {...state, activeRow: activeRow ? activeRow.check.common.id : state.activeRow};
    }

    case types.TABLE_EDITOR_CELL_FOCUS_SET: {
      return {...state, activeRow: action.payload.id, activeCell: action.payload.name};
    }

    case types.TABLE_EDITOR_ROW_ADD_ID: {
      const payloadItem = action.payload.find(row => row.id === state.activeRow);

      return {
        ...state,
        activeRow: payloadItem ? payloadItem.record_id : state.activeRow
      };
    }

    default:
      return state;
  }
};

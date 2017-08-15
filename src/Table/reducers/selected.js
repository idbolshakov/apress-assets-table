import * as types from '../actions';

const initialState = {
  isSelecting: false,
  isDragging: false,
  cellFrom: {},
  cellTo: {},
  cellDragged: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TABLE_EDITOR_CELL_SELECT_START:
      return {
        ...state,
        cellFrom: {
          row: action.payload.row,
          column: action.payload.column
        },
        cellTo: {
          row: action.payload.row,
          column: action.payload.column
        },
        isSelecting: true,
      };

    case types.TABLE_EDITOR_CELL_SELECT_END:
      return {
        ...state,
        isSelecting: false,
        isDragging: false,
      };

    case types.TABLE_EDITOR_CELL_SELECT_CONTINUE:
      if (state.isSelecting) {
        return {
          ...state,
          cellTo: {
            row: action.payload.row,
            column: state.cellFrom.column
          },
        };
      }
      if (state.isDragging) {
        return {
          ...state,
          cellDragged: {
            row: action.payload.row,
            column: state.cellFrom.column
          },
        };
      }
      return state;

    case types.TABLE_EDITOR_CELL_START_DRAG:
      return {
        ...state,
        isSelecting: false,
        isDragging: true,
        cellDragged: {
          row: action.payload.row,
          column: state.cellFrom.column
        }
      };

    case types.TABLE_EDITOR_CELL_SELECT_RESET:
      return initialState;

    default:
      return state;
  }
};

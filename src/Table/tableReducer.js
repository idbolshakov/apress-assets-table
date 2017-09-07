import _cloneDeep from 'lodash/cloneDeep';
import selected from './reducers/selected';
import focus from './reducers/focus';
import history from './reducers/history';
import {CONFIG_SET_PER_PAGE} from '../Filter/actions';
import {
  TABLE_EDITOR_LOAD_START,
  TABLE_EDITOR_LOAD_SUCCESS,
  TABLE_EDITOR_SET_CHECK,
  TABLE_EDITOR_SET_CHECK_ALL,
  TABLE_EDITOR_SET_CHECK_ALL_RESET,
  TABLE_EDITOR_CELL_SELECT_END,
  TABLE_EDITOR_CELL_SELECT_START,
  TABLE_EDITOR_CELL_SELECT_CONTINUE,
  TABLE_EDITOR_CELL_START_DRAG,
  TABLE_EDITOR_CELL_SELECT_RESET,
  TABLE_EDITOR_START_TEXT_EDIT,
  TABLE_EDITOR_END_TEXT_EDIT,
  TABLE_EDITOR_CELL_FOCUS_NEXT,
  TABLE_EDITOR_CELL_FOCUS_PREV,
  TABLE_EDITOR_CELL_FOCUS_DOWN,
  TABLE_EDITOR_CELL_FOCUS_UP,
  TABLE_EDITOR_CELL_FOCUS_SET,
  TABLE_EDITOR_ROW_ADD_ID,
  TABLE_EDITOR_ROW_REMOVE,
  TABLE_EDITOR_SET_TEXT,
  TABLE_EDITOR_ROW_ADD,
  TABLE_EDITOR_SET_IMAGES,
  TABLE_EDITOR_ROW_ADD_DEFAULT_ID,
  HISTORY_PREV,
  HISTORY_NEXT
} from './actions';

const initialState = {
  columns: [],
  checked: [],
  isLoaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TABLE_EDITOR_LOAD_START:
      return {
        ...state,
        isLoaded: false
      };

    case TABLE_EDITOR_LOAD_SUCCESS:
      return {
        ...state,
        columns: action.payload.columns,
        new_row: action.payload.new_row,
        total: action.payload.total,
        isLoaded: true,
        history: history(state.history, action)
      };

    case TABLE_EDITOR_SET_CHECK:
      return {
        ...state,
        checked: action.payload.checked ?
          [...state.checked, action.payload.id] :
          state.checked.filter(id => id !== action.payload.id)
      };

    case TABLE_EDITOR_SET_CHECK_ALL_RESET:
      return {
        ...state,
        checked: initialState.checked,
      };

    case CONFIG_SET_PER_PAGE:
    case TABLE_EDITOR_SET_CHECK_ALL:
      return {
        ...state,
        checked: action.payload.checked ? action.payload.id : []
      };

    case TABLE_EDITOR_CELL_SELECT_END: {
      if (state.selected.isDragging) {
        const {cellFrom, cellTo, cellDragged} = state.selected;
        const lowerCell = cellFrom.row > cellTo.row ? cellFrom : cellTo;
        const upperCell = cellFrom.row < cellTo.row ? cellFrom : cellTo;
        const selectionHeight = (lowerCell.row - upperCell.row) + 1;
        const column = cellFrom.column;
        const newRows = _cloneDeep(state.history.current);
        let changed = false;

        if (cellDragged.row > lowerCell.row) {
          let rowOffset = 0;
          for (let rowNum = lowerCell.row + 1; rowNum <= cellDragged.row;
               rowNum++, rowOffset = (rowOffset + 1) % selectionHeight) {
            const columnName = Object.keys(newRows[rowNum])[column];
            if (newRows[rowNum][columnName] !== newRows[upperCell.row + rowOffset][columnName]) {
              changed = true;
              newRows[rowNum][columnName] = newRows[upperCell.row + rowOffset][columnName];
            }
          }
        } else {
          if (cellDragged.row < lowerCell.row) {
            let rowOffset = selectionHeight - 1;
            for (let rowNum = upperCell.row - 1; rowNum >= cellDragged.row;
                 rowNum--, rowOffset = ((rowOffset - 1) + selectionHeight) % selectionHeight) {
              const columnName = Object.keys(newRows[rowNum])[column];
              if (newRows[rowNum][columnName] !== newRows[upperCell.row + rowOffset][columnName]) {
                changed = true;
                newRows[rowNum][columnName] = newRows[upperCell.row + rowOffset][columnName];
              }
            }
          }
        }
        if (changed) {
          return {
            ...state,
            history: history({...state.history, newRows}, action),
            selected: selected(state.selected, action)};
        }
        return {...state, selected: selected(state.selected, action), history: history(state.history, action)};
      }
      return {...state, selected: selected(state.selected, action), history: history(state.history, action)};
    }

    case TABLE_EDITOR_CELL_SELECT_START:
      return {...state, selected: selected(state.selected, action), focus: focus(state.focus, action)};

    case TABLE_EDITOR_CELL_SELECT_CONTINUE:
    case TABLE_EDITOR_CELL_START_DRAG:
    case TABLE_EDITOR_CELL_SELECT_RESET:
      return {...state, selected: selected(state.selected, action)};

    case TABLE_EDITOR_START_TEXT_EDIT:
    case TABLE_EDITOR_END_TEXT_EDIT:
    case TABLE_EDITOR_CELL_FOCUS_NEXT:
    case TABLE_EDITOR_CELL_FOCUS_PREV:
    case TABLE_EDITOR_CELL_FOCUS_DOWN:
    case TABLE_EDITOR_CELL_FOCUS_UP:
    case TABLE_EDITOR_CELL_FOCUS_SET:
    case TABLE_EDITOR_ROW_ADD_ID:
      return {...state, focus: focus(state.focus, action), history: history(state.history, action)};

    case TABLE_EDITOR_ROW_REMOVE:
    case TABLE_EDITOR_SET_TEXT:
    case TABLE_EDITOR_ROW_ADD:
    case TABLE_EDITOR_SET_IMAGES:
    case TABLE_EDITOR_ROW_ADD_DEFAULT_ID:
    case HISTORY_PREV:
    case HISTORY_NEXT:
      return {...state, history: history(state.history, action)};

    default:
      return {
        ...state,
        history: history(state.history, action),
        focus: focus(state.focus, action),
        selected: selected(state.selected, action)
      };
  }
};

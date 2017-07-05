import * as types from '../actions';

const initialState = {
  ids: [],
  idTo: [],
  isSelected: false,
  isDragging: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TABLE_EDITOR_CELL_SELECT_START:
      return {
        ...state,
        ids: [action.payload.id],
        idTo: [],
        name: action.payload.name,
        isSelected: true
      };

    case types.TABLE_EDITOR_CELL_START_DRAG:
      return {
        ...state,
        isSelected: false,
        isDragging: true,
      };

    case types.TABLE_EDITOR_CELL_SELECT_ADD:
      return {...state, ids: [...state.ids, action.payload.id]};

    case types.TABLE_EDITOR_CELL_SELECT_ADD_TO:
      return {...state, idTo: [...state.idTo, action.payload.id]};

    case types.TABLE_EDITOR_CELL_SELECT_REMOVE:
      return {
        ...state,
        ids: state.ids.filter((id, index) =>
          (id !== action.payload.id && state.ids.length - 1 !== index)),
      };
    case types.TABLE_EDITOR_CELL_SELECT_REMOVE_TO:
      return {
        ...state,
        idTo: state.idTo.filter((id, index) =>
          (id !== action.payload.id && state.idTo.length - 1 !== index)),
      };

    case types.TABLE_EDITOR_CELL_SELECT_END:
      return {...state, isSelected: false};

    case types.TABLE_EDITOR_CELL_END_DRAG:
    case types.TABLE_EDITOR_CELL_END_DRAG_IMAGES:
      return initialState;

    case types.TABLE_EDITOR_ROW_ADD_ID: {
      return {
        ...state,
        ids: state.ids.map((id) => {
          const payloadItem = action.payload.find(row => row.id === id);

          if (payloadItem) {
            return payloadItem.record_id;
          }

          return id;
        })
      };
    }

    default:
      return state;
  }
};

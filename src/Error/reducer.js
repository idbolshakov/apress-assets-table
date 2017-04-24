import {ERROR_ADD, ERROR_REMOVE} from './actions';

let errorId = 0;

const gerErrorId = () => (errorId += 1);

export default function (state = [], action) {
  switch (action.type) {
    case ERROR_ADD:
      return [
        ...state,
        {
          id: gerErrorId(),
          type: action.payload.type,
          target: action.payload.target,
          title: action.payload.title,
          rowId: action.payload.row_id,
          action: action.payload.action,
        }
      ];

    case ERROR_REMOVE: {
      if (action.payload.target) {
        return state.filter(error => action.payload.target !== error.target);
      }

      return state.filter(error => error.id !== action.payload.id);
    }

    default:
      return state;
  }
}

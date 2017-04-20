import {HELP_LOAD_SUCCESS} from './actions';

export default function help(state = [], action) {
  switch (action.type) {
    case HELP_LOAD_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}

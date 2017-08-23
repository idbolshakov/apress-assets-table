import {CABLE_INIT, CABLE_SET_QUERY} from './actions';

const initialState = {
  pathname: '/',
  search: '',
  hash: '',
  query: {}
};

export default function cable(state = initialState, action) {
  switch (action.type) {
    case CABLE_INIT:
      return action.payload ? {
        ...state,
        ...action.payload
      } : state;

    case CABLE_SET_QUERY:
      return {
        ...state,
        query: action.payload
      };

    default:
      return state;
  }
}

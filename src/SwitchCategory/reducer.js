import * as actionsType from './actions';

const initialState = {
  showProductGroups: null,
  tooltipOpen: false,
  inited: false,
  isFetching: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsType.SWITCH_CATEGORY_REQUEST_START:
      return {
        ...state,
        isFetching: true,
      };

    case actionsType.SWITCH_CATEGORY_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        showProductGroups: action.payload.showProductGroups,
        inited: true,
      };

    case actionsType.SWITCH_CATEGORY_REQUEST_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case actionsType.SWITCH_CATEGORY_UPDATE_START:
      return {
        ...state,
      };

    case actionsType.SWITCH_CATEGORY_UPDATE_SUCCESS:
      return {
        ...state,
        showProductGroups: action.payload.showProductGroups,
      };

    case actionsType.SWITCH_CATEGORY_UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case actionsType.SWITCH_CATEGORY_SHOW_TOOLTIP:
      return {
        ...state,
        tooltipOpen: true,
      };

    case actionsType.SWITCH_CATEGORY_HIDE_TOOLTIP:
      return {
        ...state,
        tooltipOpen: false,
      };

    default:
      return state;
  }
};

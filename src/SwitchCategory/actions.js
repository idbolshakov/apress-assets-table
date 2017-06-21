export const SWITCH_CATEGORY_REQUEST_START = 'SWITCH_CATEGORY_REQUEST_START';
export const SWITCH_CATEGORY_REQUEST_ERROR = 'SWITCH_CATEGORY_REQUEST_ERROR';
export const SWITCH_CATEGORY_REQUEST_SUCCESS = 'SWITCH_CATEGORY_REQUEST_SUCCESS';

export const SWITCH_CATEGORY_UPDATE_START = 'SWITCH_CATEGORY_UPDATE_START';
export const SWITCH_CATEGORY_UPDATE_ERROR = 'SWITCH_CATEGORY_UPDATE_ERROR';
export const SWITCH_CATEGORY_UPDATE_SUCCESS = 'SWITCH_CATEGORY_UPDATE_SUCCESS';

export const SWITCH_CATEGORY_UPDATE = 'SWITCH_CATEGORY_UPDATE';
export const SWITCH_CATEGORY_INIT = 'SWITCH_CATEGORY_INIT';

export const SWITCH_CATEGORY_SHOW_TOOLTIP = 'SWITCH_CATEGORY_SHOW_TOOLTIP';
export const SWITCH_CATEGORY_HIDE_TOOLTIP = 'SWITCH_CATEGORY_HIDE_TOOLTIP';

export const init = () => ({
  type: SWITCH_CATEGORY_INIT,
});

export const getStart = () => ({
  type: SWITCH_CATEGORY_REQUEST_START,
});

export const getDone = payload => ({
  type: SWITCH_CATEGORY_REQUEST_SUCCESS,
  payload,
});

export const getFail = payload => ({
  type: SWITCH_CATEGORY_REQUEST_ERROR,
  payload,
  error: true,
});

export const updateStart = payload => ({
  type: SWITCH_CATEGORY_UPDATE_START,
  payload,
});

export const updateDone = payload => ({
  type: SWITCH_CATEGORY_UPDATE_SUCCESS,
  payload,
});

export const updateFail = payload => ({
  type: SWITCH_CATEGORY_UPDATE_ERROR,
  payload,
  error: true,
});

export const switchCategoryUpdate = payload => ({
  type: SWITCH_CATEGORY_UPDATE,
  payload,
});

export const showTooltip = () => ({
  type: SWITCH_CATEGORY_SHOW_TOOLTIP,
});

export const hideTooltip = () => ({
  type: SWITCH_CATEGORY_HIDE_TOOLTIP,
});

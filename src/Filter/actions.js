export const CONFIG_LOAD_START = 'CONFIG_LOAD_START';
export const CONFIG_LOAD_SUCCESS = 'CONFIG_LOAD_SUCCESS';
export const CONFIG_SET_PAGE = 'CONFIG_SET_PAGE';
export const CONFIG_SET_PER_PAGE = 'CONFIG_SET_PER_PAGE';
export const CONFIG_NO_CHANGE = 'CONFIG_NO_CHANGE';
export const CONFIG_SET_FILTER = 'CONFIG_SET_FILTER';
export const CONFIG_SET_SORT = 'CONFIG_SET_SORT';
export const CONFIG_RESET = 'CONFIG_RESET';
export const CONFIG_SET_ID = 'CONFIG_SET_ID';

export const setPage = payload => ({
  type: CONFIG_SET_PAGE,
  payload
});

export const noChange = payload => ({
  type: CONFIG_NO_CHANGE,
  payload
});

export const setPerPage = payload => ({
  type: CONFIG_SET_PER_PAGE,
  payload
});

export const setFilter = payload => ({
  type: CONFIG_SET_FILTER,
  payload
});

export const setSort = payload => ({
  type: CONFIG_SET_SORT,
  payload
});

export const configSetId = payload => ({
  type: CONFIG_SET_ID,
  payload
});

export const loadConfig = payload => ({
  type: CONFIG_LOAD_START,
  payload
});

export const reset = payload => ({
  type: CONFIG_RESET,
  payload
});

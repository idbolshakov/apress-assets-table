export const CABLE_INIT = 'CABLE_INIT';
export const CABLE_SET_QUERY = 'CABLE_SET_QUERY';

export const init = payload => ({
  type: CABLE_INIT,
  payload
});

export const setQuery = payload => ({
  type: CABLE_SET_QUERY,
  payload
});

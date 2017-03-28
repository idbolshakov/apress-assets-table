export const LOAD_TABLE_DATA_START = 'LOAD_TABLE_DATA_START';
export const SET_DATA_TEXT_CELL = 'SET_DATA_TEXT_CELL';

export const loadDataStart = payload => ({
  type: LOAD_TABLE_DATA_START,
  payload
});

export const setDataTextCell = payload => ({
  type: SET_DATA_TEXT_CELL,
  payload
});

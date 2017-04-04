export const LOAD_TABLE_DATA_START = 'LOAD_TABLE_DATA_START';
export const SET_DATA_TEXT_CELL = 'SET_DATA_TEXT_CELL';

export const TABLE_EDITOR_ROW_ADD = 'TABLE_EDITOR_ROW_ADD';
export const TABLE_EDITOR_ROW_REMOVE = 'TABLE_EDITOR_ROW_REMOVE';
export const TABLE_EDITOR_ROW_COPY = 'TABLE_EDITOR_ROW_COPY';

export const loadDataStart = payload => ({
  type: LOAD_TABLE_DATA_START,
  payload
});

export const setDataTextCell = payload => ({
  type: SET_DATA_TEXT_CELL,
  payload
});

export const addNewRow = payload => ({
  type: TABLE_EDITOR_ROW_ADD,
  payload
});

export const removeRow = payload => ({
  type: TABLE_EDITOR_ROW_REMOVE,
  payload
});

export const copyRow = payload => ({
  type: TABLE_EDITOR_ROW_COPY,
  payload
});

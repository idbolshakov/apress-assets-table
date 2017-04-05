export const TABLE_EDITOR_LOAD_START = 'TABLE_EDITOR_LOAD_START';
export const TABLE_EDITOR_LOAD_SUCCESS = 'TABLE_EDITOR_LOAD_SUCCESS';
export const TABLE_EDITOR_SET_TEXT = 'TABLE_EDITOR_SET_TEXT';
export const TABLE_EDITOR_ROW_ADD = 'TABLE_EDITOR_ROW_ADD';
export const TABLE_EDITOR_ROW_REMOVE = 'TABLE_EDITOR_ROW_REMOVE';
export const TABLE_EDITOR_ROW_COPY = 'TABLE_EDITOR_ROW_COPY';

export const load = payload => ({
  type: TABLE_EDITOR_LOAD_START,
  payload
});

export const setText = payload => ({
  type: TABLE_EDITOR_SET_TEXT,
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

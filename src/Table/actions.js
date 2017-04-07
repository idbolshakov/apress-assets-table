export const TABLE_EDITOR_LOAD_START = 'TABLE_EDITOR_LOAD_START';
export const TABLE_EDITOR_LOAD_SUCCESS = 'TABLE_EDITOR_LOAD_SUCCESS';
export const TABLE_EDITOR_SET_TEXT = 'TABLE_EDITOR_SET_TEXT';
export const TABLE_EDITOR_SET_COPY_CHANGE = 'TABLE_EDITOR_SET_COPY_CHANGE';

export const TABLE_EDITOR_ROW_ADD = 'TABLE_EDITOR_ROW_ADD';
export const TABLE_EDITOR_ROW_REMOVE = 'TABLE_EDITOR_ROW_REMOVE';
export const TABLE_EDITOR_ROW_COPY = 'TABLE_EDITOR_ROW_COPY';

export const TABLE_EDITOR_CELL_SELECT_START = 'TABLE_EDITOR_CELL_SELECT_START';
export const TABLE_EDITOR_CELL_SELECT_END = 'TABLE_EDITOR_CELL_SELECT_END';
export const TABLE_EDITOR_CELL_SELECT_ADD = 'TABLE_EDITOR_CELL_SELECT_ADD';
export const TABLE_EDITOR_CELL_SELECT_REMOVE = 'TABLE_EDITOR_CELL_SELECT_REMOVE';

export const TABLE_EDITOR_CELL_SELECT_REMOVE_TO = 'TABLE_EDITOR_CELL_SELECT_REMOVE_TO';

export const TABLE_EDITOR_CELL_SELECT_ADD_TO = 'TABLE_EDITOR_CELL_SELECT_ADD_TO';

export const TABLE_EDITOR_CELL_START_DRAG = 'TABLE_EDITOR_CELL_START_DRAG';
export const TABLE_EDITOR_CELL_END_DRAG = 'TABLE_EDITOR_CELL_END_DRAG';

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

export const startSeletion = payload => ({
  type: TABLE_EDITOR_CELL_SELECT_START,
  payload
});

export const endSeletion = payload => ({
  type: TABLE_EDITOR_CELL_SELECT_END,
  payload
});

export const selectionAdd = payload => ({
  type: TABLE_EDITOR_CELL_SELECT_ADD,
  payload
});

export const selectionAddTo = payload => ({
  type: TABLE_EDITOR_CELL_SELECT_ADD_TO,
  payload
});

export const selectionRemove = payload => ({
  type: TABLE_EDITOR_CELL_SELECT_REMOVE,
  payload
});

export const selectionRemoveTo = payload => ({
  type: TABLE_EDITOR_CELL_SELECT_REMOVE_TO,
  payload
});

export const startDrag = payload => ({
  type: TABLE_EDITOR_CELL_START_DRAG,
  payload
});
export const endDrag = payload => ({
  type: TABLE_EDITOR_CELL_END_DRAG,
  payload
});

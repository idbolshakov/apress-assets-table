export const LOAD_RUBRICATOR_DATA_START = 'LOAD_RUBRICATOR_DATA_START';
export const UPDATE_RUBRICATOR_DATA_START = 'UPDATE_RUBRICATOR_DATA_START';
export const SET_TREE_NODE = 'SET_TREE_NODE';
export const SET_SELECTED = 'SET_SELECTED';
export const SET_EXPANDED = 'SET_EXPANDED';

export const setSelected = payload => ({
  type: SET_SELECTED,
  payload
});

export const setExpanded = payload => ({
  type: SET_EXPANDED,
  payload
});

export const loadDataStart = payload => ({
  type: LOAD_RUBRICATOR_DATA_START,
  payload
});

export const updateTree = payload => ({
  type: UPDATE_RUBRICATOR_DATA_START,
  payload
});

export const setTreeNode = payload => ({
  type: SET_TREE_NODE,
  payload
});

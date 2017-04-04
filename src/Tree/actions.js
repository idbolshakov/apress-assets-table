export const LOAD_RUBRICATOR_DATA_START = 'LOAD_RUBRICATOR_DATA_START';
export const UPDATE_RUBRICATOR_DATA_START = 'UPDATE_RUBRICATOR_DATA_START';
export const LOAD_RUBRICATOR_DATA_SUCCESS = 'LOAD_RUBRICATOR_DATA_SUCCESS';
export const UPDATE_RUBRICATOR_DATA_SUCCESS = 'UPDATE_RUBRICATOR_DATA_SUCCESS';
export const SET_TREE_NODE = 'SET_TREE_NODE';
export const SET_EXPANDED = 'SET_EXPANDED';

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

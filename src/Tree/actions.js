export const TREE_LOAD_START = 'TREE_LOAD_START';
export const TREE_UPDATE_START = 'TREE_UPDATE_START';
export const TREE_LOAD_SUCCESS = 'TREE_LOAD_SUCCESS';
export const TREE_UPDATE_SUCCESS = 'TREE_UPDATE_SUCCESS';
export const TREE_SET_NODE = 'TREE_SET_NODE';
export const TREE_SET_EXPANDED = 'TREE_SET_EXPANDED';
export const TREE_MOVE_NODE = 'TREE_MOVE_NODE';
export const TREE_MOVE_NODE_REQUEST = 'TREE_MOVE_NODE_REQUEST';
export const REMOVE_NODE = 'REMOVE_NODE';

export const setExpanded = payload => ({
  type: TREE_SET_EXPANDED,
  payload
});

export const load = payload => ({
  type: TREE_LOAD_START,
  payload
});

export const update = payload => ({
  type: TREE_UPDATE_START,
  payload
});

export const setNode = payload => ({
  type: TREE_SET_NODE,
  payload
});

export const moveNodeRequest = payload => ({
  type: TREE_MOVE_NODE_REQUEST,
  payload
});

export const moveNode = payload => ({
  type: TREE_MOVE_NODE,
  payload
});

export const removeNode = payload => ({
  type: REMOVE_NODE,
  payload
});

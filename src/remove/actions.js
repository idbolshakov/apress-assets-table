export const REQUEST_INFO_ABOUT_GROUP_START = 'REQUEST_INFO_ABOUT_GROUP_START';
export const REQUEST_INFO_ABOUT_GROUP_ERROR = 'REQUEST_INFO_ABOUT_GROUP_ERROR';
export const REQUEST_INFO_ABOUT_GROUP_SUCCESS = 'REQUEST_INFO_ABOUT_GROUP_SUCCESS';

export const DELETE_GROUP_START = 'DELETE_GROUP_START';
export const DELETE_GROUP_ERROR = 'DELETE_GROUP_ERROR';
export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS';

export const REMOVE_GROUP = 'REMOVE_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const REMOVE_GROUP_START = 'REMOVE_GROUP_START';
export const DELETE_GROUP_UPDATE_PROGRESS = 'DELETE_GROUP_UPDATE_PROGRESS';

export const REMOVE_SELECT_GROUP_TO_GO = 'REMOVE_SELECT_GROUP_TO_GO';

export const REMOVE_EMPTY_GROUPS = 'REMOVE_EMPTY_GROUPS';
export const REMOVE_EMPTY_GROUPS_START = 'REMOVE_EMPTY_GROUPS_START';
export const REMOVE_EMPTY_GROUPS_ERROR = 'REMOVE_EMPTY_GROUPS_ERROR';
export const REMOVE_EMPTY_GROUPS_SUCCESS = 'REMOVE_EMPTY_GROUPS_SUCCESS';

export const REMOVE_GROUPS = 'REMOVE_GROUPS';

export const removeGroup = data => ({
  type: REMOVE_GROUP,
  payload: data,
});

export const removeGroups = data => ({
  type: REMOVE_GROUPS,
  payload: data,
});

export const requestAboutChildren = () => ({
  type: REQUEST_INFO_ABOUT_GROUP_START
});

export const requestAboutChildrenDone = data => ({
  type: REQUEST_INFO_ABOUT_GROUP_SUCCESS,
  payload: data,
});

export const removeGroupFetchJob = data => ({
  type: REMOVE_GROUP_START,
  payload: data,
});

export const deleteGroupStart = () => ({
  type: DELETE_GROUP_START,
});

export const deleteGroup = data => ({
  type: DELETE_GROUP,
  payload: data,
});

export const deleteGroupProgress = data => ({
  type: DELETE_GROUP_UPDATE_PROGRESS,
  payload: data,
});

export const progressUpdate = data => ({
  type: DELETE_GROUP_UPDATE_PROGRESS,
  payload: data,
});

export const selectNode = data => ({
  type: REMOVE_SELECT_GROUP_TO_GO,
  payload: data,
});

export const removeEmptyGroups = data => ({
  type: REMOVE_EMPTY_GROUPS,
  payload: data,
});

export const removeEmptyGroupsDone = data => ({
  type: REMOVE_EMPTY_GROUPS_SUCCESS,
  payload: data,
});

export const removeEmptyGroupsStart = data => ({
  type: REMOVE_EMPTY_GROUPS_START,
  payload: data,
});

export const groupRemoveFail = data => ({
  type: DELETE_GROUP_ERROR,
  payload: data.error,
  error: true,
});

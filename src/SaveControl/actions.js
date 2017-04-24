export const SAVE_START = 'SAVE_START';
export const SAVE_SUCCESS = 'SAVE_SUCCESS';
export const SAVE_PROGRESS = 'SAVE_PROGRESS';
export const SAVE_REPEAT = 'SAVE_REPEAT';
export const SAVE_CREATE_DIFF = 'SAVE_CREATE_DIFF';

export const saveStart = payload => ({
  type: SAVE_START,
  payload
});

export const saveDiff = payload => ({
  type: SAVE_CREATE_DIFF,
  payload
});

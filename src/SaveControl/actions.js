export const SAVE_START = 'SAVE_START';
export const SAVE_SUCCESS = 'SAVE_SUCCESS';
export const SAVE_PROGRESS = 'SAVE_PROGRESS';
export const SAVE_REPEAT = 'SAVE_REPEAT';
export const SAVE_CREATE_DIFF = 'SAVE_CREATE_DIFF';
export const SAVE_DIFF = 'SAVE_DIFF';

export const saveStart = () => ({
  type: SAVE_START
});

export const saveSuccess = payload => ({
  type: SAVE_SUCCESS,
  payload
});

export const saveCreateDiff = payload => ({
  type: SAVE_CREATE_DIFF,
  payload
});

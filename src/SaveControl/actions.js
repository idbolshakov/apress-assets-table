export const SAVE_START = 'SAVE_START';
export const SAVE_PROGRESS = 'SAVE_PROGRESS';
export const SAVE_SUCCESS = 'SAVE_SUCCESS';

export const saveStart = payload => ({
  type: SAVE_START,
  payload
});

export const saveProgress = payload => ({
  type: SAVE_PROGRESS,
  payload
});
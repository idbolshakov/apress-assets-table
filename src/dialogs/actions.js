export const SHOW_REMOVE_ROW_CONFIRMATION = 'SHOW_REMOVE_ROW_CONFIRMATION';
export const HIDE_REMOVE_ROW_CONFIRMATION = 'HIDE_REMOVE_ROW_CONFIRMATION';

export const SHOW_REMOVE_ROWS_CONFIRMATION = 'SHOW_REMOVE_ROWS_CONFIRMATION';
export const HIDE_REMOVE_ROWS_CONFIRMATION = 'HIDE_REMOVE_ROWS_CONFIRMATION';

export const SHOW_REMOVE_EMPTY_ROWS_CONFIRMATION = 'SHOW_REMOVE_EMPTY_ROWS_CONFIRMATION';
export const HIDE_REMOVE_EMPTY_ROWS_CONFIRMATION = 'HIDE_REMOVE_EMPTY_ROWS_CONFIRMATION';

export const SHOW_IMAGE_EDITOR = 'SHOW_IMAGE_EDITOR';
export const HIDE_IMAGE_EDITOR = 'HIDE_IMAGE_EDITOR ';

export const showRemoveConfirmation = payload => ({
  type: SHOW_REMOVE_ROW_CONFIRMATION,
  payload
});

export const hideRemoveConfirmation = payload => ({
  type: HIDE_REMOVE_ROW_CONFIRMATION,
  payload
});

export const showMassRemoveConfirmation = payload => ({
  type: SHOW_REMOVE_ROWS_CONFIRMATION,
  payload
});

export const hideMassRemoveConfirmation = payload => ({
  type: HIDE_REMOVE_ROWS_CONFIRMATION,
  payload
});

export const showRemoveEmptyRowsConfirmation = payload => ({
  type: SHOW_REMOVE_EMPTY_ROWS_CONFIRMATION,
  payload
});

export const hideRemoveEmptyRowsConfirmation = payload => ({
  type: HIDE_REMOVE_EMPTY_ROWS_CONFIRMATION,
  payload
});

export const showImageEditor = payload => ({
  type: SHOW_IMAGE_EDITOR,
  payload
});

export const hideImageEditor = payload => ({
  type: HIDE_IMAGE_EDITOR,
  payload
});

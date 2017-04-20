export const IMAGE_EDITOR_EDIT_IMAGES = 'IMAGE_EDITOR_EDIT_IMAGES';
export const IMAGE_EDITOR_SAVE_IMAGES_START = 'IMAGE_EDITOR_SAVE_IMAGES_START';
export const IMAGE_EDITOR_SAVE_IMAGES_SUCCESS = 'IMAGE_EDITOR_SAVE_IMAGES_SUCCESS';
export const IMAGE_EDITOR_SAVE_IMAGES_FAIL = 'IMAGE_EDITOR_SAVE_IMAGES_FAIL';
export const IMAGE_EDITOR_REMOVE_IMAGE = 'IMAGE_EDITOR_REMOVE_IMAGE';
export const IMAGE_EDITOR_CLEAN = 'IMAGE_EDITOR_CLEAN';
export const IMAGE_EDITOR_UPDATE_IMAGES = 'IMAGE_EDITOR_UPDATE_IMAGES';


export const cleanImages = payload => ({
  type: IMAGE_EDITOR_CLEAN,
  payload,
});
export const updateImages = payload => ({type: IMAGE_EDITOR_UPDATE_IMAGES, payload});
export const saveSuccess = () => ({type: IMAGE_EDITOR_SAVE_IMAGES_SUCCESS});
export const saveStart = () => ({type: IMAGE_EDITOR_SAVE_IMAGES_START});
export const saveFail = data => ({
  type: IMAGE_EDITOR_SAVE_IMAGES_FAIL,
  error: true,
  payload: data.error,
});

export const editImages = payload => (dispatch, getState) => {
  const activeRow = getState().history.current.find(row =>
    payload.id === row.check.common.id);

  return (
    dispatch({
      type: IMAGE_EDITOR_EDIT_IMAGES,
      payload: {
        ...payload,
        images: activeRow[payload.name].common.images || []
      }
    })
  );
};

export const cleanEditor = () => ({type: IMAGE_EDITOR_CLEAN});

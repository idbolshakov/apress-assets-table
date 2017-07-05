import * as actions from '../actions';

describe('actions', () => {
  it('should create an action to update images', () => {
    const expectedAction = {
      type: actions.IMAGE_EDITOR_UPDATE_IMAGES,
      payload: {
        files: [],
        images: [],
      }
    };

    expect(
      actions.updateImages({
        files: [],
        images: [],
      })).toEqual(expectedAction);
  });
});

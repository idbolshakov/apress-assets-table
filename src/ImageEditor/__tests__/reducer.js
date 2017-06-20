import reducer from '../reducer';
import * as actions from '../actions';

describe('imageEditor reducer', () => {
  const initialState = {
    row: {},
    images: [],
    isFetching: false,
    error: false,
  };

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle IMAGE_EDITOR_SAVE_IMAGES_SUCCESS', () => {
    expect(
      reducer([], actions.saveSuccess())
    ).toEqual(initialState);
  });

});

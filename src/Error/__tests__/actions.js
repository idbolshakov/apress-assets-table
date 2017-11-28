import * as actions from '../actions';

describe('actions', () => {
  it('should create an action to add error', () => {
    const someData = {};
    expect(actions.add(someData))
      .toEqual({
        type: actions.ERROR_ADD,
        payload: someData
      });
  });

  it('should create an action to remove error', () => {
    const someData = {};
    expect(actions.remove(someData))
      .toEqual({
        type: actions.ERROR_REMOVE,
        payload: someData
      });
  });
});
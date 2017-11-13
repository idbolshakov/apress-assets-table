import * as actions from '../actions';

describe('actions', () => {
  it('should create an action to save start', () => {
    expect(actions.saveStart()).toEqual({type: actions.SAVE_START});
  });

  it('should create an action to save success', () => {
    const someData = {};
    expect(actions.saveSuccess(someData))
      .toEqual({
        type: actions.SAVE_SUCCESS,
        payload: someData
      });
  });

  it('should create an action to save create diff', () => {
    const expectedAction = {
      type: actions.SAVE_CREATE_DIFF,
      payload: {
        curState: [],
        prevState: []
      }
    };

    expect(actions.saveCreateDiff({curState: [], prevState: []}))
      .toEqual(expectedAction);
  });
});

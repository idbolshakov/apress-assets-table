import * as actions from '../actions';

describe('actions', () => {
  it('should create an action to save start', () => {
    const expectedAction = {
      type: actions.SAVE_START,
      payload: undefined
    };

    expect(actions.saveStart()).toEqual(expectedAction);
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

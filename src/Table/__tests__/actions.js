import * as tableActions from '../actions';

describe('actions', () => {
  const someData = {};

  it('copyRow', () => {
    expect(tableActions.copyRow(someData)).toEqual({
      type: tableActions.TABLE_EDITOR_ROW_COPY,
      payload: someData
    });
  });

  it('copyRowSuccess', () => {
    expect(tableActions.copyRowSuccess(someData)).toEqual({
      type: tableActions.TABLE_EDITOR_ROW_COPY_SUCCESS,
      payload: someData
    });
  });
});

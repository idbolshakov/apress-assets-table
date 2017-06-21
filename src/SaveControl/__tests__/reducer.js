import deepFreeze from 'deep-freeze';
import reducer from '../reducer';
import * as actions from '../actions';
import * as actionsTable from '../../Table/actions';

describe('reducer', () => {
  const initialState = {
    isSave: false,
    isError: false,
    prevState: [],
    isProgress: false,
    fetchDiff: false,
    waitingState: [],
    saveState: []
  };
  const rows = [{
    'check': {
      'common': {
        'id': 7
      }
    },
    'name': {
      'common': {
        'text': 'name 1'
      }
    }
  }];
  const saveState = [{
    'id': 7,
    'columns': {
      'name': {
        'text': 'test name 1'
      }
    }
  }];

  it('should return the initial initialState', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle TABLE_EDITOR_LOAD_SUCCESS', () => {
    expect(
      reducer(
        deepFreeze(initialState),
        {
          type: actionsTable.TABLE_EDITOR_LOAD_SUCCESS,
          payload: {
            rows: rows
          }
        }
      )
    ).toEqual({...initialState, prevState: rows});
  });

  it('should handle SAVE_REPEAT', () => {
    expect(reducer(deepFreeze(initialState), {type: actions.SAVE_REPEAT, payload: {}}))
      .toEqual({...initialState, isSave: true});
  });

  it('should handle TABLE_EDITOR_CELL_END_DRAG', () => {
    expect(reducer(deepFreeze(initialState), {
      type: actionsTable.TABLE_EDITOR_CELL_END_DRAG,
      payload: {}
    })).toEqual({...initialState, isSave: true});
  });

  it('should handle TABLE_EDITOR_CELL_END_DRAG_IMAGES', () => {
    expect(reducer(deepFreeze(initialState), {
      type: actionsTable.TABLE_EDITOR_CELL_END_DRAG_IMAGES,
      payload: {}
    })).toEqual({...initialState, isSave: true});
  });

  it('should handle TABLE_EDITOR_SET_TEXT', () => {
    expect(reducer(deepFreeze(initialState), {
      type: actionsTable.TABLE_EDITOR_SET_TEXT,
      payload: {}
    })).toEqual({...initialState, isSave: true});
  });

  it('should handle TABLE_EDITOR_SET_IMAGES', () => {
    expect(reducer(deepFreeze(initialState), {
      type: actionsTable.TABLE_EDITOR_SET_IMAGES,
      payload: {}
    })).toEqual({...initialState, isSave: true});
  });

  it('should handle TABLE_EDITOR_ROW_ADD', () => {
    expect(reducer(deepFreeze(initialState), {
      type: actionsTable.TABLE_EDITOR_ROW_ADD,
      payload: {}
    })).toEqual({...initialState, isSave: true});
  });

  it('should handle HISTORY_PREV', () => {
    expect(reducer(deepFreeze(initialState), {type: actionsTable.HISTORY_PREV, payload: {}}))
      .toEqual({...initialState, isSave: true});
  });

  it('should handle HISTORY_NEXT', () => {
    expect(reducer(deepFreeze(initialState), {type: actionsTable.HISTORY_NEXT, payload: {}}))
      .toEqual({...initialState, isSave: true});
  });

  it('should handle SAVE_CREATE_DIFF', () => {
    expect(reducer(deepFreeze(initialState), {type: actions.SAVE_CREATE_DIFF, payload: {}}))
      .toEqual({...initialState, fetchDiff: true, isSave: false});
  });

  it('should handle SAVE_DIFF', () => {
    expect(reducer(
      deepFreeze(initialState),
      {
        type: actions.SAVE_DIFF,
        payload: {
          waitingState: saveState,
          prevState: rows,
        }
      }
    )).toEqual({
      ...initialState,
      waitingState: saveState,
      prevState: rows,
      fetchDiff: false,
    });
  });

  it('should handle SAVE_START', function() {
    expect(reducer(
      deepFreeze({
        ...initialState,
        waitingState: saveState
      }),
      {type: actions.SAVE_START, payload: {}}
    ))
    .toEqual({
      ...initialState,
      saveState: saveState,
      waitingState: [],
      isProgress: true,
      isError: false,
    });
  });

  it('should handle TABLE_EDITOR_ROW_ADD_ID and TABLE_EDITOR_ROW_ADD_DEFAULT_ID', function() {
    const expectPrevState = [{
      'check': {
        'common': {
          'id': -7
        }
      },
      'name': {
        'common': {
          'text': 'name 1'
        }
      }
    }];

    const expectWaitingState = [{
      'id': -7,
      'columns': {
        'name': {
          'text': 'test name 1'
        }
      }
    }];

    expect(reducer(
      deepFreeze({
        ...initialState,
        prevState: rows,
        waitingState: saveState
      }),
      {
        type: actionsTable.TABLE_EDITOR_ROW_ADD_ID,
        payload: [{id: 7, record_id: -7}]
      }
    )).toEqual({
      ...initialState,
      prevState: expectPrevState,
      waitingState: expectWaitingState
    });
  });

  it('should handle SAVE_SUCCESS no error', function() {
    expect(reducer(deepFreeze(initialState), {type: actions.SAVE_SUCCESS, payload: {}}))
      .toEqual({...initialState, saveState: [], isProgress: false});
  });

  it('should handle SAVE_SUCCESS error', function() {
    expect(reducer(
      deepFreeze({...initialState, saveState: saveState}),
      {type: actions.SAVE_SUCCESS, payload: {error: true}}
    )).toEqual({
      ...initialState,
      saveState: [],
      waitingState: saveState,
      isProgress: false,
      isSave: true,
      isError: true
    });
  });
});

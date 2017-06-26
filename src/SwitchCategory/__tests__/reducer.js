import reducer from '../reducer';
import * as actions from '../actions';

describe('SwitchCategory reducer', () => {
  it('Должен вернуть исходное состояние', () => {
    const initialState = {
      showProductGroups: null,
      tooltipOpen: false,
      inited: false,
      isFetching: false,
      error: false,
    };
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('Должен обработать SWITCH_CATEGORY_REQUEST_START', () => {
    expect(
      reducer({}, {
        type: actions.SWITCH_CATEGORY_REQUEST_START,
      })
    ).toEqual({
      isFetching: true,
    });
  });

  it('Должен обработать SWITCH_CATEGORY_REQUEST_SUCCESS', () => {
    expect(
      reducer({}, {
        type: actions.SWITCH_CATEGORY_REQUEST_SUCCESS,
        payload: {showProductGroups: true},
      })
    ).toEqual({
      isFetching: false,
      showProductGroups: true,
      inited: true,
    });
  });

  it('Должен обработать SWITCH_CATEGORY_REQUEST_ERROR', () => {
    expect(
      reducer({}, {
        type: actions.SWITCH_CATEGORY_REQUEST_ERROR,
        error: true,
        payload: new Error(),
      })
    ).toEqual({
      isFetching: false,
      error: new Error(),
    });
  });

  it('Должен обработать SWITCH_CATEGORY_UPDATE_START', () => {
    expect(
      reducer({}, {
        type: actions.SWITCH_CATEGORY_UPDATE_START,
        error: true,
        payload: new Error(),
      })
    ).toEqual({});
  });

  it('Должен обработать SWITCH_CATEGORY_UPDATE_SUCCESS', () => {
    expect(
      reducer({}, {
        type: actions.SWITCH_CATEGORY_UPDATE_SUCCESS,
        payload: {showProductGroups: true}
      })
    ).toEqual({
      showProductGroups: true,
    });
  });

  it('Должен обработать SWITCH_CATEGORY_UPDATE_ERROR', () => {
    expect(
      reducer({}, {
        type: actions.SWITCH_CATEGORY_UPDATE_ERROR,
        payload: new Error(),
        error: true,
      })
    ).toEqual({
      error: new Error()
    });
  });

  it('Должен обработать SWITCH_CATEGORY_SHOW_TOOLTIP', () => {
    expect(
      reducer({}, {
        type: actions.SWITCH_CATEGORY_SHOW_TOOLTIP,
      })
    ).toEqual({
      tooltipOpen: true,
    });
  });

  it('Должен обработать SWITCH_CATEGORY_HIDE_TOOLTIP', () => {
    expect(
      reducer({}, {
        type: actions.SWITCH_CATEGORY_HIDE_TOOLTIP,
      })
    ).toEqual({
      tooltipOpen: false,
    });
  });
});

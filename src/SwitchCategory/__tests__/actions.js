import * as actions from '../actions';

describe('SwitchCategory actions', () => {
  it('Должен создать дейстсвие инициализации переключения группы', () => {
    const expectedAction = {
      type: actions.SWITCH_CATEGORY_INIT,
    }
    expect(actions.init()).toEqual(expectedAction);
  });

  it('Должен создать действие начала запроса за статусом переключения групп', () => {
    const expectedAction = {
      type: actions.SWITCH_CATEGORY_REQUEST_START,
    }
    expect(actions.getStart()).toEqual(expectedAction);
  });

  it('Должен создать действие успешного завершения запроса за статусом переключения групп', () => {
    const expectedAction = {
      type: actions.SWITCH_CATEGORY_REQUEST_SUCCESS,
      payload: {showProductGroups: true}
    }
    expect(actions.getDone({showProductGroups: true})).toEqual(expectedAction);
  });

  it('Должен создать действие ошибки завершения запроса за статусом переключения групп', () => {
    const expectedAction = {
      type: actions.SWITCH_CATEGORY_REQUEST_ERROR,
      payload: {error: new Error()},
      error: true,
    };
    expect(actions.getFail({error: new Error()})).toEqual(expectedAction);
  });

  it('Должен создать действие начала обновления состояния переключения групп', () => {
    const expectedAction = {
      type: actions.SWITCH_CATEGORY_UPDATE_START,
      payload: {show_product_groups: true}
    };
    expect(actions.updateStart({show_product_groups: true})).toEqual(expectedAction);
  });

  it('Должен создать действие успешного обновления состояния переключения групп', () => {
    const expectedAction = {
      type: actions.SWITCH_CATEGORY_UPDATE_SUCCESS,
      payload: {show_product_groups: false}
    };
    expect(actions.updateDone({show_product_groups: false})).toEqual(expectedAction);
  });

  it('Должен создать действие ошибки обновления состояния переключения групп', () => {
    const expectedAction = {
      type: actions.SWITCH_CATEGORY_UPDATE_ERROR,
      payload: {error: new Error()},
      error: true,
    };
    expect(actions.updateFail({error: new Error()})).toEqual(expectedAction);
  });

  it('Должен создать действие переключения состояния групп', () => {
    const expectedAction = {
      type: actions.SWITCH_CATEGORY_UPDATE,
      payload: {showProductGroups: true},
    }
    expect(actions.switchCategoryUpdate({showProductGroups: true})).toEqual(expectedAction);
  });

  it('Должен создать действие показа подсказки', () => {
    const expectedAction = {
      type: actions.SWITCH_CATEGORY_SHOW_TOOLTIP,
    }
    expect(actions.showTooltip()).toEqual(expectedAction);
  });

  it('Должен создать действие закрытия подсказки', () => {
    const expectedAction = {
      type: actions.SWITCH_CATEGORY_HIDE_TOOLTIP,
    }
    expect(actions.hideTooltip()).toEqual(expectedAction);
  });
});

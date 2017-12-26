import React from 'react';
import SwitchCategory from '../SwitchCategory';
import {mountProvider} from '../../../test/testUtils';

describe('component-conatiner SwitchCategory', () => {
  it('Первичный рендринг, компонент еще не инициализирован', () => {
    const initStore = {
      switchCategoryView: {
        isFetching: true,
        tooltipOpen: false,
        showProductGroups: true,
        inited: false,
      }
    };

    expect(mountProvider(<SwitchCategory />, initStore)).toMatchSnapshot();
  });

  it('должен показать подсказку', () => {
    const initStore = {
      switchCategoryView: {
        isFetching: false,
        tooltipOpen: true,
        showProductGroups: false,
        inited: true,
      }
    };

    expect(mountProvider(<SwitchCategory />, initStore)).toMatchSnapshot();
  });

  it('должен показать дропдаун выбора', () => {
    const initStore = {
      switchCategoryView: {
        isFetching: false,
        tooltipOpen: false,
        showProductGroups: false,
        inited: true,
      }
    };
    const enzymeWrapper = mountProvider(<SwitchCategory />, initStore);

    expect(enzymeWrapper).toMatchSnapshot();

    enzymeWrapper.find('.e-switch-category-change').simulate('click');

    expect(enzymeWrapper).toMatchSnapshot();
  });
});

import React from 'react';
import {shallow} from 'enzyme';
import SetItem from '../SetItem';

describe('component SetItem', () => {
  const onSelect = jest.fn();
  const component = shallow(
    <SetItem
      onSelect={onSelect}
      title={'Заголовок'}
      checked={false}
    >
        description
      </SetItem>
    );

    it('Должен рендриться', () => {
      expect(component).toMatchSnapshot();
    });

    it('Должен обрабатывать onSelect', () => {
      component.find('.e-switch-cat-menu-type').simulate('click');
      expect(onSelect).toBeCalled();
    });
});

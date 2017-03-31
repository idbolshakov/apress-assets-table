/* eslint no-console: 0 */
import React from 'react';
import DropDownMenu from './DropDownMenu';
import {block} from '../utils';

const menuItems = {
  title: 'Некий заголовок',
  items: [
    {
      id: 1,
      title: 'Все (24)',
      active: false,
    },
    {
      id: 2,
      title: 'Заполнен (18)',
      active: false,
    },
    {
      id: 'test-1',
      title: 'не заполнен (6)',
      active: true,
    },
    {
      id: 'test-4',
      title: <b>проверка проверка</b>,
      active: false,
    }
  ]
};

const be = block('example');

export default class DropDownExample extends React.Component {

  render() {
    return (
      <div>
        <h3>DropDownMenu:</h3>
        <DropDownMenu
          items={menuItems.items}
          title={menuItems.title}
          onSelect={(id, e) => { console.log('selected', id, e); }}
        >
          <div className={be('just-inline-block')}>Кастомный елемент</div>
        </DropDownMenu>
        {' '} | {' '}
        <DropDownMenu
          items={menuItems.items}
          mix={'test-mix-1 test-mix-2'}
          onSelect={(id, e) => { console.log('selected', id, e); }}
        >
          <div className={be('just-inline-block')}>Без тайтла</div>
        </DropDownMenu>
      </div>
    );
  }
}

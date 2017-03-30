import React, {PropTypes} from 'react';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import {block} from '../utils';

const b = block('e-table');

// mock data
const menuItems = {
  title: 'ЗАГОЛОВОК h1',
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
      title: <b><i>проверка проверка</i></b>,
      active: true,
    }
  ]
};
// ----

const createCell = (cell, index) =>
  <th key={index} className={b('header-cell').mix(`is-${cell.name.replace(/_/g, '-')}`)}>
    <DropDownMenu
      title={menuItems.title}
      items={menuItems.items}
      onSelect={(id, e) => { console.log(id, e); }}
    >
      <div className={b('header-title')}>{cell.common.title}</div>
    </DropDownMenu>
  </th>;

const Header = props =>
  <tr className={b('tr')}>{props.table.columns.map(createCell)}</tr>;

Header.propTypes = {
  table: PropTypes.object,
};

export default Header;

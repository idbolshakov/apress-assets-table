import React, {PropTypes} from 'react';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import Checkbox from '../Checkbox/Checkbox';
import {block} from '../utils';

const b = block('e-table');

const mapFilterOptionsToMenu = options => options.map(option => ({
  title: option.title,
  id: option.value,
}));


const createCell = (cell, index, selectAllRow, selectFilter, selectSort) => {
  const renderFilterTitle = () => (
    <DropDownMenu
      title={cell.common.title}
      items={mapFilterOptionsToMenu(cell.filter.options)}
      onSelect={id => selectFilter({id, name: cell.name})}
    >
      <div className={b('header-title').is({filter: true})}>{cell.common.title}</div>
    </DropDownMenu>
  );

  const renderSorting = () => (
    <DropDownMenu
      title='Сортировать'
      items={[
        {
          title: 'Все',
          id: '',
        },
        {
          title: 'А - Я',
          id: 'up',
        },
        {
          title: 'Я - А',
          id: 'down',
        },
      ]}
      onSelect={id => selectSort({id, name: cell.name})}
    >
      <div
        className={b('sorter').is({
          sorted: cell.sorter.direction,
          'sorted-down': cell.sorter.direction === 'down'
        })}
      />
    </DropDownMenu>
    );

  const renderSimpleTitle = () => (
    !cell.common.blank && <div className={b('header-title')}>{cell.common.title}</div>
  );

  return (
    <th key={index} className={b('header-cell').mix(`is-${cell.name.replace(/_/g, '-')}`)}>
      {cell.name === 'check' && <Checkbox onChange={selectAllRow} />}
      {cell.filter ? renderFilterTitle() : renderSimpleTitle()}
      {cell.sorter && renderSorting()}
    </th>
  );
};


const Header = props =>
  <tr className={b('tr')}>
    {props.table.columns.map((cell, index) =>
      createCell(cell, index,
        () => { console.log('selectAllRow - dispatch'); },
        props.selectFilter,
        props.selectSort,
      ))}
  </tr>;

Header.propTypes = {
  table: PropTypes.object,
};

export default Header;

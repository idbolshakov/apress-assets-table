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
      onSelect={(id) => { selectFilter(id); }}
    >
      <div className={b('header-title').is({filter: true})}>{cell.common.title}</div>
    </DropDownMenu>
  );

  const renderSorting = () => (
    <DropDownMenu
      title='Сортировать'
      items={[
        {
          title: 'А - Я',
          id: 'ASC',
        },
        {
          title: 'Я - А',
          id: 'DESC',
        },
      ]}
      onSelect={(id) => { selectSort(id); }}
    >
      <div className={b('sorter').is({sorted: cell.sorter.direction})} />
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
        () => { console.log('selectFilter - disaptch'); },
        () => { console.log('selectSort - dispatch'); }
      ))}
  </tr>;

Header.propTypes = {
  table: PropTypes.object,
};

export default Header;

import React, {PropTypes} from 'react';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import Checkbox from '../Checkbox/Checkbox';
import {block} from '../utils';

const b = block('e-table');

export default class Header extends React.Component {
  static propTypes = {
    table: PropTypes.object,
  };

  mapFilterOptionsToMenu = options => options.map(option => ({
    title: option.title,
    id: option.value,
  }));

  createCell = (cell, index, selectFilter, selectSort) => {
    const renderFilterTitle = () => (
      <DropDownMenu
        title={cell.common.title}
        items={this.mapFilterOptionsToMenu(cell.filter.options)}
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
      <div key={index} className={b('header-cell').mix(`is-${cell.name.replace(/_/g, '-')}`)}>
        {cell.name === 'check' &&
          <Checkbox
            checked={this.props.countRow === this.props.table.checked.length}
            onChange={this.ckeckedAll}
          />}
        {cell.filter ? renderFilterTitle() : renderSimpleTitle()}
        {cell.sorter && renderSorting()}
      </div>
    );
  };

  ckeckedAll = (checked) => {
    this.props.setCheckAll({checked, id: this.props.table.rows.map(row => row.check.common.id)});
  }

  render() {
    return (
      <div className={b('tr')}>
        {this.props.table.columns.map((cell, index) =>
          this.createCell(cell, index,
            this.props.selectFilter,
            this.props.selectSort,
          ))}
      </div>
    );
  }
}

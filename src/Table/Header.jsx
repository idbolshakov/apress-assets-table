import React, {PropTypes} from 'react';
import {block} from '../utils';

const b = block('e-table');

const createCell = (cell, index) =>
  <th key={index} className={b('header-cell').mix(`is-${cell.name.replace(/_/g, '-')}`)}>
    {cell.common.title}
  </th>;

const Header = props =>
  <tr className={b('tr')}>{props.table.columns.map(createCell)}</tr>;

Header.propTypes = {
  table: PropTypes.object,
};

export default Header;

import React, {PropTypes} from 'react';
import {block} from '../utils';

const b = block('e-table');

const HeaderCell = props =>
  <th className={b('header-cell').mix(`is-${props.cell.name.replace(/_/g, '-')}`)}>
    {props.cell.common.title}
  </th>;

HeaderCell.propTypes = {
  cell: PropTypes.object,
};

export default HeaderCell;

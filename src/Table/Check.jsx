import React, {PropTypes} from 'react';
import {block} from '../utils';

const b = block('e-table');

const CheckCell = props =>
  <td className={b('cell').mix(`is-${props.cell.name}`)}>0</td>;

CheckCell.propTypes = {
  cell: PropTypes.object,
};

export default CheckCell;

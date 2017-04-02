import React, {PropTypes} from 'react';
import Checkbox from '../Checkbox/Checkbox';
import {block} from '../utils';

const b = block('e-table');

const CheckCell = props =>
  <td className={b('cell').mix(`is-${props.cell.name}`)}>
    <Checkbox
      onChange={() => {}}
      checked
    />
  </td>;

CheckCell.propTypes = {
  cell: PropTypes.object,
};

export default CheckCell;

import React, {PropTypes} from 'react';
import Text from './Text';
import Check from './Check';
import Image from './Image';
import Path from './Path';
import {block} from '../utils';

const b = block('e-table');

const Cell = ({row, props}, cell, index) => {
  const cellName = cell.replace(/_/g, '-');
  const dataRow = {
    id: row.check.common.id,
    data: row[cell],
    name: cellName,
    placeholder: props.placeholder[cell],
    config: props.config[cellName],
  };
  const componentsCell = {
    text: <Text key={index} cell={dataRow} setData={props.actions.setDataTextCell} />,
    check: <Check key={index} cell={dataRow} />,
    img: <Image key={index} cell={dataRow} />,
    path: <Path key={index} cell={dataRow} />,
  };

  return componentsCell[props.config[cellName].type];
};

const Row = (props, row) =>
  <tr key={row.check.common.id} className={b('body-tr')}>
    {Object.keys(row).map(Cell.bind({}, {row, props}))}
  </tr>;

const Body = props =>
  <tbody className={b('body')}>
    {props.table.rows.map(Row.bind({}, props))}
  </tbody>;

Body.propTypes = {
  table: PropTypes.object,
};

export default Body;

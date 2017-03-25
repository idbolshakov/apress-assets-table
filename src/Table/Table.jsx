import React, {PropTypes} from 'react';
import Header from './Header';
import Body from './Body';
import {block} from '../utils';
import './e-table.scss';

const b = block('e-table');

const Table = props =>
  <div className={b}>
    <table className={b('wrapper')}>
      <thead>
        <Header table={props.table} />
      </thead>
      <Body
        table={props.table}
        config={props.config}
        placeholder={props.placeholder}
        actions={props.actions}
      />
    </table>
  </div>;

Table.propTypes = {
  table: PropTypes.object,
  config: PropTypes.object,
  placeholder: PropTypes.object
};

export default Table;

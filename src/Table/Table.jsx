import React, {PropTypes, Component} from 'react';
import {block} from '../utils';
import HeaderCell from '../HeaderCell/HeaderCell';
import Row from '../Row/Row';
import './e-table.scss';

const b = block('e-table');

export default class Table extends Component {
  static propTypes = {
    tableData: PropTypes.object,
  };
  render() {
    const headerCell = this.props.tableData.columns.map((column, index) =>
      <HeaderCell key={index} cell={column} />
    );
    const rowComponent = this.props.tableData.rows.map((row, index) =>
      <Row
        key={index}
        row={row}
        configCell={this.props.configCell}
        placeholder={this.props.placeholder}
      />
    );

    return (
      <div className={b('wrapper')}>
        <table className={b}>
          <thead>
            <tr className={b('tr')}>
              {headerCell}
            </tr>
          </thead>
          <tbody className={b('body')}>
            {rowComponent}
          </tbody>
        </table>
      </div>
    );
  }
}

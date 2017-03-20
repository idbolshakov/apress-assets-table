import {block} from '../utils';
import HeaderCell from '../HeaderCell/HeaderCell';
import Row from '../Row/Row';
import './e-table.scss';

const {PropTypes, Component} = React;
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
      <table className={b}>
        <thead>
          <tr>
            {headerCell}
          </tr>
        </thead>
        <tbody>
          {rowComponent}
        </tbody>
      </table>
    );
  }
}

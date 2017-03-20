import {block} from '../utils';

const b = block('e-table');
const {PropTypes, Component} = React;

export default class PathCell extends Component {
  static propTypes = {
    cell: PropTypes.shape({
      data: PropTypes.shape({
        common: PropTypes.shape({
          text: PropTypes.string,
        })
      }),
      name: PropTypes.string,
      placeholder: PropTypes.string
    })
  };

  render() {
    let text = null;

    if (this.props.cell.data.common.text) {
      text = <div>{this.props.cell.data.common.text}</div>;
    } else {
      text = <div className={b('cell-placeholder')}>{this.props.cell.placeholder}</div>;
    }

    return <td className={b('cell').mix(`is-${this.props.cell.name}`)}>{text}</td>;
  }
}

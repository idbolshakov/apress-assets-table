import React, {PropTypes, Component} from 'react';
import {block} from '../utils';

const b = block('e-table');

export default class PathCell extends Component {
  static propTypes = {
    cell: PropTypes.shape({
      data: PropTypes.shape({
        common: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          ancestors: PropTypes.array,
        })
      }),
      name: PropTypes.string
    })
  };

  render() {
    const ancestorsLength = this.props.cell.data.common.ancestors.length;
    let path = null;

    if (this.props.cell.data.common.ancestors.length) {
      path = this.props.cell.data.common.ancestors.map((ancestor, index) => {
        if (index + 1 !== ancestorsLength) {
          return (
            <span key={index} className={b('path-text').mix(b('path-arrow'))}>
              {ancestor.name}
            </span>
          );
        }

        return <span key={index} className={b('path-text')}>{ancestor.name}</span>;
      });
    } else {
      path = <span className={b('path-text')}>{this.props.cell.data.common.name}</span>;
    }

    return (
      <td className={b('cell').mix(`is-${this.props.cell.name}`)}>
        <div className={b('path-cell')}>{path}</div>
      </td>
    );
  }
}

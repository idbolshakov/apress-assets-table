import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {setFocus} from './actions';
import {block} from '../utils';

const b = block('e-table');

class PathCell extends Component {
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

  handleCellClick = () => {
    this.props.dispatch(setFocus({name: this.props.cell.name, id: this.props.cell.id}));
  }

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
      <td
        onClick={this.handleCellClick}
        tabIndex={-1}
        ref={($td) => { $td && this.props.cell.isFocus && $td.focus(); }}
        className={b('cell').mix(`is-${this.props.cell.classMix}`)
          .is({focus: this.props.cell.isFocus})}
      >
        <div className={b('path-cell')}>{path}</div>
      </td>
    );
  }
}


export default connect()(PathCell);

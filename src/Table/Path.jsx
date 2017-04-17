import React, {PropTypes, Component} from 'react';
import RcDropdown from 'rc-dropdown';
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

  state = {
    visible: false,
  }

  handleCellClick = () => {
    this.props.dispatch(setFocus({name: this.props.cell.name, id: this.props.cell.id}));
  }

  render() {
    const originalAncestorsLength = this.props.cell.data.common.ancestors.length;
    let path = null;
    let fullPath = null;

    if (originalAncestorsLength > 3) {
      const ancestors = this.props.cell.data.common.ancestors.slice(0, 3);
      const ancestorsLength = ancestors.length;
      path = ancestors.map((ancestor, index) =>
        <span
          key={index}
          className={b('path-text').is({
            'path-arrow': true,
            last: index + 1 === ancestorsLength && originalAncestorsLength > 3
          })}
        >
          {ancestor.name}
        </span>);

      fullPath = this.props.cell.data.common.ancestors.map((ancestor, index) =>
        <span className={b('path-text')}>
          {ancestor.name}
          <span
            className={b('path-text').is({'path-arrow': index + 1 !== originalAncestorsLength})}
          />
        </span>);
    } else if (originalAncestorsLength) {
      const ancestors = this.props.cell.data.common.ancestors;
      const ancestorsLength = ancestors.length;
      path = ancestors.map((ancestor, index) =>
        <span
          key={index}
          className={b('path-text').is({'path-arrow': index + 1 !== ancestorsLength})}
        >
          {ancestor.name}
        </span>);
    } else {
      path = <span className={b('path-text')}>Все группы</span>;
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
        {fullPath && <RcDropdown
          visible={this.state.visible}
          trigger={['hover']}
          overlay={
            <div className={b('preview')}>
              <div className={b('preview-body')}>{fullPath}</div>
            </div>
          }
          onVisibleChange={(visible) => { this.setState({visible}); }}
          closeOnSelect={false}
        >
          <div className={b('cell-preview-icon')} />
        </RcDropdown>}
      </td>
    );
  }
}

export default connect()(PathCell);

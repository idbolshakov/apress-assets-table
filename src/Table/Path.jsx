import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RcDropdown from 'rc-dropdown';
import _isEqual from 'lodash/isEqual';
import {block} from '../utils';


const b = block('e-table');

export default class PathCell extends Component {

  static propTypes = {
    cell: PropTypes.shape({
      classMix: PropTypes.string,
      isFocus: PropTypes.bool,
      data: PropTypes.shape({
        common: PropTypes.shape({
          ancestors: PropTypes.array
        })
      })
    }),
    handleResetSelection: PropTypes.func,
    handleSelection: PropTypes.func,
    handleEndSelection: PropTypes.func,
    handleCellClick: PropTypes.func
  };

  state = {
    visible: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
  }

  render() {
    const {handleCellClick, handleSelection, handleEndSelection, handleResetSelection, cell} = this.props;
    const {classMix, isFocus, data} = cell;
    const ancestors = data.common.ancestors;
    const originalAncestorsLength = ancestors.length;
    let path = null;
    let fullPath = null;
    const maxPathLength = 3;

    if (originalAncestorsLength > maxPathLength) {
      const displayedAncestors = ancestors.slice(0, maxPathLength);
      path = displayedAncestors.map((ancestor, index) =>
        <span
          key={index}
          className={b('path-text').is({
            'path-arrow': true,
            last: index + 1 === displayedAncestors.length && originalAncestorsLength > maxPathLength
          })}
        >
          {ancestor.name}
        </span>);

      fullPath = ancestors.map((ancestor, index) =>
        <span className={b('path-text')}>
          {ancestor.name}
          <span
            className={b('path-text').is({'path-arrow': index + 1 !== originalAncestorsLength})}
          />
        </span>);
    } else {
      if (originalAncestorsLength >= 1 && originalAncestorsLength <= maxPathLength) {
        path = ancestors.map((ancestor, index) =>
          <span
            key={index}
            className={b('path-text').is({'path-arrow': index + 1 !== originalAncestorsLength})}
          >
            {ancestor.name}
          </span>);
      } else {
        path = <span className={b('path-text')}>Все группы</span>;
      }
    }

    return (
      <div
        onClick={handleCellClick}
        tabIndex={-1}
        ref={($td) => { $td && isFocus && $td.focus(); }}
        className={b('cell').mix(`is-${classMix}`)
          .is({focus: isFocus})}
        onMouseEnter={handleSelection}
        onMouseUp={handleEndSelection}
        onMouseDown={handleResetSelection}
      >
        <div className={b('path-cell')}>{path}</div>
        {fullPath &&
          <RcDropdown
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
          </RcDropdown>
        }
      </div>
    );
  }
}

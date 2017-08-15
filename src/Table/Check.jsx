/* eslint react/no-unused-prop-types: 0 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _isEqual from 'lodash/isEqual';
import Checkbox from '../Checkbox/Checkbox';
import {block} from '../utils';


const b = block('e-table');

export default class CheckCell extends Component {

  static propTypes = {
    cell: PropTypes.shape({
      classMix: PropTypes.string,
      isFocus: PropTypes.bool,
      data: PropTypes.shape({
        common: PropTypes.shape({
          id: PropTypes.number
        })
      })
    }),
    checked: PropTypes.bool,
    endSelection: PropTypes.func,
    handleResetSelection: PropTypes.func,
    handleSelection: PropTypes.func,
    handleStartSelection: PropTypes.func,
    resetSelection: PropTypes.func,
    setCheck: PropTypes.func,
    setFocus: PropTypes.func,
    startDrag: PropTypes.func,
    startSelection: PropTypes.func
  };

  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  handleChecked = (checked) => {
    this.props.setCheck({checked, id: this.props.cell.data.common.id});
  };

  handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      setTimeout(() => { this.handleChecked(!this.props.checked); }, 100);
    }
  };

  render() {
    const {handleCellClick, handleSelection, handleEndSelection, handleResetSelection, checked, cell} = this.props;
    const {classMix, isFocus} = cell;

    return (
      <div
        tabIndex={-1}
        ref={($td) => { $td && isFocus && $td.focus(); }}
        className={b('cell').mix(`is-${classMix}`).is({focus: isFocus})}
        onClick={handleCellClick}
        onKeyDown={this.handleKeyPress}
        onMouseEnter={handleSelection}
        onMouseUp={handleEndSelection}
        onMouseDown={handleResetSelection}
      >
        <Checkbox
          onChange={this.handleChecked}
          checked={checked}
        />
      </div>
    );
  }
}

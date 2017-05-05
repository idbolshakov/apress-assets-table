/* eslint react/no-unused-prop-types: 0 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setFocus} from './actions';
import Checkbox from '../Checkbox/Checkbox';
import {block} from '../utils';

const b = block('e-table');

class CheckCell extends React.Component {
  static propTypes = {cell: PropTypes.object};

  handleCellClick = () => {
    this.props.dispatch(setFocus({name: this.props.cell.name, id: this.props.cell.id}));
  }

  handleChecked = (checked) => {
    this.props.setCheck({checked, id: this.props.cell.data.common.id});
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setTimeout(() => { this.handleChecked(!this.props.checked); }, 100);
    }
  }

  render() {
    const props = this.props;
    return (
      <div
        tabIndex={-1}
        ref={($td) => { $td && props.cell.isFocus && $td.focus(); }}
        className={b('cell').mix(`is-${props.cell.classMix}`).is({focus: props.cell.isFocus})}
        onClick={this.handleCellClick}
        onKeyDown={this.handleKeyPress}
      >
        <Checkbox
          onChange={this.handleChecked}
          checked={this.props.checked}
        />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(CheckCell);

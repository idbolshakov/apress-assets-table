/* eslint react/no-unused-prop-types: 0 */
import React, {PropTypes} from 'react';
import _throttle from 'lodash/throttle';
import {connect} from 'react-redux';
import {ActionCreators as UndoActionCreators} from 'redux-undo';
import Header from './Header';
import Body from './Body';
import {block} from '../utils';
import './e-table.scss';
import {focusNext, focusPrev, focusDown, focusUp} from './actions';

const b = block('e-table');

class Table extends React.Component {
  static propTypes = {
    table: PropTypes.object,
    config: PropTypes.object,
    placeholder: PropTypes.object
  }

  state = {
    scrollLeft: 0,
  }

  componentDidMount() {
    this.$node.addEventListener('scroll', this.handleTableScroll, false);
  }

  componentWillUnmount() {
    this.$node.removeEventListener('scroll', this.handleTableScroll, false);
  }

  tableScroll = () => { this.setState({scrollLeft: this.$node.scrollLeft}); }

  handleTableScroll = _throttle(() => { this.tableScroll(); }, 500);

  handleKeyDown = (e) => {
    if (!this.props.edit) {
      if (e.keyCode === 90 && (e.ctrlKey || e.metaKey)) {
        console.log('ctr key was pressed during the click');
        this.props.dispatch(UndoActionCreators.undo());
      }
      if (e.keyCode === 89 && (e.ctrlKey || e.metaKey)) {
        console.log('ctr key was pressed during the click');
        this.props.dispatch(UndoActionCreators.redo());
      }
      e.preventDefault();
      if (e.keyCode === 38) {
        this.props.dispatch(focusUp());
      } else if (e.keyCode === 40) {
        this.props.dispatch(focusDown());
      } else if (e.keyCode === 37) {
        this.props.dispatch(focusPrev());
      } else if (e.keyCode === 39) {
        this.props.dispatch(focusNext());
      }
    }
  }

  render() {
    const props = this.props;
    return (
      <div
        tabIndex={-1}
        onKeyDown={this.handleKeyDown}
        ref={(node) => { this.$node = node; }}
        className={b}
      >
        <table className={b('wrapper')}>
          <thead>
            <Header
              table={props.table}
              selectFilter={props.selectFilter}
              selectSort={props.selectSort}
            />
          </thead>
          <Body
            table={props.table}
            config={props.config}
            placeholder={props.placeholder}
            actions={props.actions}
            $rootNode={this.$node}
            scrollLeft={this.state.scrollLeft}
          />
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({edit: state.focus.edit});

export default connect(mapStateToProps)(Table);

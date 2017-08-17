/* eslint react/no-unused-prop-types: 0 */
import React, {PropTypes} from 'react';
import _throttle from 'lodash/throttle';
import {connect} from 'react-redux';
import _isEqual from 'lodash/isEqual';
import Header from './Header';
import Body from './Body';
import {block} from '../utils';
import './e-table.scss';
import {
  focusNext,
  focusPrev,
  focusDown,
  focusUp,
  historyNext,
  historyPrev
} from './actions';

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

  shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
  }

  componentWillUnmount() {
    this.$node.removeEventListener('scroll', this.handleTableScroll, false);
  }

  tableScroll = () => { this.setState({scrollLeft: this.$node.scrollLeft}); }

  handleTableScroll = _throttle(() => { this.tableScroll(); }, 500);

  handleKeyDown = (e) => {
    if (!this.props.edit) {
      if (e.keyCode === 90 && (e.ctrlKey || e.metaKey)) {
        if (this.props.history.prev.length) {
          console.log('ctr key was pressed during the click');
          this.props.dispatch(historyPrev());
        }
      }
      if (e.keyCode === 89 && (e.ctrlKey || e.metaKey)) {
        if (this.props.history.next.length) {
          console.log('ctr key was pressed during the click');
          this.props.dispatch(historyNext());
        }
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
        className={b.mix(`is-columns-${props.table.columns.length}`)}
      >
        {props.table.isLoaded ?
          <div className={b('wrapper')}>
            <div className={b('header')}>
              <Header
                table={props.table}
                selectFilter={props.selectFilter}
                selectSort={props.selectSort}
                setCheckAll={props.actions.setCheckAll}
                countRow={props.countRow}
              />
            </div>
            <Body
              table={props.table}
              config={props.config}
              placeholder={props.placeholder}
              actions={props.actions}
              $rootNode={this.$node}
              scrollLeft={this.state.scrollLeft}
              readonly={props.readonly}
            />
          </div> :
          <div className='e-spinner' />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  edit: state.focus.edit,
  history: state.history,
});

export default connect(mapStateToProps)(Table);

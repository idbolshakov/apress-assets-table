/* eslint react/no-unused-prop-types: 0 */
import React, {PropTypes} from 'react';
import _throttle from 'lodash/throttle';
import Header from './Header';
import Body from './Body';
import {block} from '../utils';
import './e-table.scss';

const b = block('e-table');

export default class Table extends React.Component {
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

  render() {
    const props = this.props;
    return (
      <div ref={(node) => { this.$node = node; }} className={b}>
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

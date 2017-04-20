import React, {PropTypes} from 'react';
import _throttle from 'lodash/throttle';
import {block} from '../utils';
import './e-search.scss';

const b = block('e-search');

export default class Search extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  handlerKeyUp = _throttle(value => this.props.onChange(value), 500);

  render() {
    return (
      <input
        className={b}
        onKeyUp={e => this.handlerKeyUp(e.target.value)}
      />
    );
  }
}


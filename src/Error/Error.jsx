import React from 'react';
import {connect} from 'react-redux';
import _isEqual from 'lodash/isEqual';
import {remove} from './actions';
import {block} from '../utils';

import './e-error.scss';

const b = block('e-error');

class ComponentError extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  createServerError = error =>
    <div className={b}>
      <p className={b('title')}>{error.title}</p>
      <a
        className={b('repeat')}
        onClick={() => {
          this.props.dispatch({type: error.action});
          this.props.dispatch(remove({id: error.id}));
        }}
      >
        Повторить
      </a>
      <div
        className={b('close')}
        onClick={() => this.props.dispatch(remove({id: error.id}))}
      />
    </div>;

  createDefaultError = error =>
    <div className={b}>
      <div className={b('title')}>{error.title}</div>
      <div
        className={b('close')}
        onClick={() => this.props.dispatch(remove({id: error.id}))}
      />
    </div>;

  createError = (error) => {
    switch (error.type) {
      case 'server':
        return this.createServerError(error);

      default:
        return this.createDefaultError(error);
    }
  }


  render() {
    return (
      <div className={b('wrapper')}>
        {this.props.errors.slice(0, 3).map(this.createError)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.error,
});

export default connect(mapStateToProps)(ComponentError);

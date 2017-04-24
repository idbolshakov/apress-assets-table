import React, {Component} from 'react';
import {block} from '../utils';

import './e-save-control.scss';

const b = block('e-save-control');

export default class SaveControl extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.save.isSave) {
      nextProps.actions.saveStart({
        curState: nextProps.rows,
        prevState: nextProps.save.prevState
      });
    }

    if (!nextProps.save.isProgress && nextProps.save.waitingState.length) {
      nextProps.actions.saveStart({
        curState: nextProps.rows,
        prevState: nextProps.save.prevState
      });
    }
  }

  render() {
    let message = this.props.message.success;

    if (this.props.save.isError) {
      message = this.props.message.error;
    }

    if (this.props.save.isProgress) {
      message = this.props.message.progress;
    }

    return (
      <div
        className={b.is({
          success: !this.props.save.isError && !this.props.save.isProgress,
          error: this.props.save.isError,
          progress: this.props.save.isProgress
        })}
      >
        {message}
      </div>
    );
  }
}

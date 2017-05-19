/* eslint no-param-reassign: 0 */
import React, {Component} from 'react';
import {block} from '../utils';

import './e-save-control.scss';

const b = block('e-save-control');

export default class SaveControl extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.save.isSave && !nextProps.save.fetchDiff) {
      nextProps.actions.saveCreateDiff({
        curState: nextProps.rows,
        prevState: nextProps.save.prevState
      });
    }

    if (!nextProps.save.isProgress &&
      !nextProps.save.fetchDiff &&
      nextProps.save.waitingState.length) {
      nextProps.actions.saveStart();
    }

    if (nextProps.save.isProgress ||
      nextProps.save.waitingState.length ||
      nextProps.save.fetchDiff) {
      window.onbeforeunload = (e) => {
        const message = 'Возможно внесенные изменения не сохранятся';

        if (e) { e.returnValue = message; }

        return message;
      };
    } else {
      window.onbeforeunload = null;
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

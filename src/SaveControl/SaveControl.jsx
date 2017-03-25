import React, {Component} from 'react';
import {block} from '../utils';

import './e-save-control.scss';

const b = block('e-save-control');

export default class SaveControl extends Component {
  componentDidUpdate() {
    if (this.props.save.isSave && !this.props.save.isProgress) {
      this.props.actions.saveProgress(this.props.rows);
      this.props.actions.saveStart(
        this.getDiffRows(this.props.rows, this.props.save.prevProps)
      );
    }
  }

  getDiffRows(curState, prevState) {
    const diff = {};
    const prevStateObj = {};
    const curStateObj = {};
    let cellDiff;

    curState.forEach((curRow) => {
      curStateObj[curRow.check.common.id] = {...curRow};
    });

    prevState.forEach((prevRow) => {
      prevStateObj[prevRow.check.common.id] = {...prevRow};
      if (!curStateObj[prevRow.check.common.id]) {
        curStateObj[prevRow.check.common.id] = {
          delete: true
        };
      }
    });

    Object.keys(curStateObj).forEach((key) => {
      if (prevStateObj[key]) {
        cellDiff = this.getDiffCell(curStateObj[key], prevStateObj[key]);

        if (cellDiff) {
          diff[key] = cellDiff;
        }
      } else {
        diff[key] = curStateObj[key];
      }
    });

    return diff;
  }

  getDiffCell = (curRow, prevRow) => {
    const diff = {};

    Object.keys(prevRow).forEach((cellKey) => {
      Object.keys(prevRow[cellKey].common).forEach((key) => {
        if (prevRow[cellKey].common[key] !== curRow[cellKey].common[key]) {
          diff[cellKey] = {
            ...diff[cellKey],
            [key]: curRow[cellKey].common[key]
          };
        }
      });
    });

    return Object.keys(diff).length ? diff : null;
  };

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

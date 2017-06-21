import React from 'react';
import PropTypes from 'prop-types';
import {block} from '../utils';
import './e-save-control.scss';

const b = block('e-save-control');

const getMessage = (message, isError, isProgress) => {
  if (isError) {
    return message.error;
  }

  if (isProgress) {
    return message.progress;
  }

  return message.success;
};

const SaveControl = props =>
  <div
    className={b.is({
      success: !props.isError && !props.isProgress,
      error: props.isError,
      progress: props.isProgress || props.removeInProgrees
    })}
  >
    {getMessage(props.message, props.isError, props.isProgress)}
  </div>;

SaveControl.propTypes = {
  isProgress: PropTypes.bool,
  isError: PropTypes.bool,
  removeInProgrees: PropTypes.bool,
  message: PropTypes.shape({
    error: PropTypes.string,
    progress: PropTypes.string,
    success: PropTypes.string
  })
};

export default SaveControl;

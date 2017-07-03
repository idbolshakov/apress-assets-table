import React from 'react';
import PropTypes from 'prop-types';
import {block} from '../utils';
import './e-button.scss';

const b = block('e-button');

const Button = props =>
  <button
    type='button'
    disabled={props.disabled}
    onClick={(e) => { e.preventDefault(); props.onClick(); }}
    className={b.mix(props.mix)}
  >
    {props.children}
  </button>;

Button.propTypes = {
  onClick: PropTypes.func,
  mix: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  mix: '',
};

export default Button;

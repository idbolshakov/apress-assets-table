import React from 'react';
import PropTypes from 'prop-types';
import {block} from '../utils';
import './e-toggler.scss';

const b = block('e-toggler');

const Toggler = props =>
  <div
    onClick={props.onToggle}
    className={b.mix(props.mix).is({on: props.on})}
    title={props.title}
  />;

Toggler.propTypes = {
  onToggle: PropTypes.func.isRequired,
  mix: PropTypes.string,
  title: PropTypes.string,
};

Toggler.defaultProps = {
  disabled: false,
  onClick: () => {},
};

export default Toggler;

/* eslint-disable */
import React from 'react';
import {block} from '../utils';


const b = block('d');

const DropDown = props =>
  <div
    onClick={() => props.onChange(!props.checked)}
    className={b.is({checked: props.checked}).mix(props.mix)}
  />;

export default DropDown;

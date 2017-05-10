import React from 'react';
import RcSelect from 'rc-select';
import 'rc-select/assets/index.css';
import {block} from '../utils';
import './e-select.scss';

const b = block('e-select');

const Select = props =>
  <RcSelect
    notFoundContent='Ничего не найдено'
    disabled={React.Children.count(props.children) <= 1}
    dropdownMatchSelectWidth={false}
    className={b.mix(props.mix)()}
    dropdownClassName='e-select-drop-down'
    {...props}
  >
    {props.children}
  </RcSelect>;

export default Select;

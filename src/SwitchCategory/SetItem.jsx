import React, {PropTypes} from 'react';
import {block} from '../utils';
import Checkbox from '../Checkbox/Checkbox';

const bm = block('e-switch-cat-menu');

const SetItem = props =>
  <div
    onClick={props.onSelect}
    className={bm('type').mix(props.mix)()}
  >
    <div className={bm('radio-set')()}>
      <Checkbox
        mix={bm('radio').mix('is-radio')()}
        checked={props.checked}
        onChange={() => {}}
      />
      <div>{props.title}</div>
    </div>
    <label
      className='e-label'
      htmlFor
    >
      <div className={bm('description')()}>
        {props.children}
      </div>
    </label>
  </div>;

SetItem.propTypes = {
  onSelect: PropTypes.func,
  mix: PropTypes.string,
  checked: PropTypes.bool,
  title: PropTypes.node
};

export default SetItem;

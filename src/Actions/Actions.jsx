import React, {PropTypes} from 'react';
import {block} from '../utils';
import './e-actions.scss';

const b = block('e-actions');

const Actions = props =>
  <div className={b.mix(props.mix)()}>
    {props.onAdd &&
    <div onClick={props.onAdd} title='Добавить' className={b('action').is({add: 1})} />
    }
    {props.onCopy &&
    <div onClick={props.onCopy} title='Копировать' className={b('action').is({copy: 1})} />
    }
    {props.onRemove &&
    <div onClick={props.onRemove} title='Удалить' className={b('action').is({delete: 1})} />
    }
  </div>;

Actions.propTypes = {
  mix: PropTypes.string,
  onAdd: PropTypes.func,
  onCopy: PropTypes.func,
  onRemove: PropTypes.func,
};

Actions.defaultProps = {
  mix: '',
};

export default Actions;

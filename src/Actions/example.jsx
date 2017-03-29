/* eslint no-console: 0 */
/* eslint no-alert: 0 */
import React from 'react';
import {block} from '../utils';
import './e-actions.scss';

const b = block('e-actions');

export default class ActionsExample extends React.Component {

  render() {
    return (
      <div className='example-wrapper'>
        <h3>Actions:</h3>
        <div className={b}>
          <div title='Добавить' className={b('action').is({add: 1})} />
          <div title='Копировать' className={b('action').is({copy: 1})} />
          <div title='Удалить' className={b('action').is({delete: 1})} />
        </div>
      </div>
    );
  }
}

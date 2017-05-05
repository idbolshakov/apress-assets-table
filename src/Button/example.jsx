/* eslint no-console: 0 */
/* eslint no-alert: 0 */
import React from 'react';
import Button from './Button';

export default class ButtonExample extends React.Component {

  render() {
    return (
      <div>
        <h3>Button:</h3>
        <Button onClick={() => { alert('button 1 clicked'); }}>ДОБАВИТЬ ГРУППУ</Button> {' '}
        <Button>Отмена</Button> <Button mix='is-good'>Сохранить и продолжить</Button> {' '}
        <Button disabled onClick={() => { alert('button 2 clicked'); }} mix='test-mix'>
          disabled
        </Button> {' '}
        <Button
          onClick={() => {}}
          mix='is-big-size'
        >
          Большая кнопка
        </Button> {' '}
        <Button
          onClick={() => {}}
          mix='is-cancel is-big-size'
        >
          Большая кнопка
        </Button>
      </div>
    );
  }
}

import React from 'react';
import Button from './Button';

export default class App extends React.Component {

  render() {
    return (
      <div style={{marginBottom: 20}}>
        <h3>Button:</h3>
        <Button onClick={() => { alert('button 1 clicked'); }}>ДОБАВИТЬ ГРУППУ</Button> {' '}
        <Button mix='test-mix'>
          <i>Рыба кот</i>
        </Button> {' '}
        <Button disabled onClick={() => { alert('button 2 clicked'); }} mix='test-mix'>
          disabled
        </Button>
      </div>
    );
  }
}

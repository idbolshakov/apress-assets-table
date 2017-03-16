/* eslint no-console: 0 */
/* eslint no-alert: 0 */
import Button from './Button';

export default class ButtonExample extends React.Component {

  render() {
    return (
      <div>
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

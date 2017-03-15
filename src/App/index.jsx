import ButtonExample from '../Button/example';
import TogglerExample from '../Toggler/example';
import HeaderExample from '../Header/example';

import './style.scss';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderExample />
        <ButtonExample />
        <TogglerExample />
      </div>
    );
  }
}

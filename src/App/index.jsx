import ButtonExample from '../Button/example';
import TogglerExample from '../Toggler/example';
import HeaderExample from '../Header/example';
import PaginationExample from '../Pagination/example';
import ComboSelectExample from '../ComboSelect/example';

import './style.scss';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderExample />
        <ButtonExample />
        <TogglerExample />
        <PaginationExample />
        <ComboSelectExample />
      </div>
    );
  }
}

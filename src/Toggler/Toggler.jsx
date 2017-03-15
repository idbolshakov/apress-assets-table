import {block} from '../utils';
import './e-toggler.scss';

const {PropTypes} = React;
const b = block('e-toggler');

const Toggler = props =>
  <div onClick={props.onToggle} className={b.mix(props.mix).is({on: props.on})} />;

Toggler.propTypes = {
  onToggle: PropTypes.func.isRequired,
  mix: PropTypes.string,
};

Toggler.defaultProps = {
  disabled: false,
  onClick: () => {},
};

export default Toggler;

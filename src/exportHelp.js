import Help from './Help/Help';
import * as actions from './Help/actions';
import reducer from './Help/reducer';
import './styles/fonts.scss';
import loadHelp from './Help/sagas';

export {
  Help,
  actions,
  reducer
};

export const sagas = {
  loadHelp
};

import {combineReducers} from 'redux';
import table from './Table/reducerTable';
import tree from './Tree/reducer';
import save from './SaveControl/reducer';
import selected from './Table/reducers/selected';
import focus from './Table/reducers/focus';
import history from './Table/reducers/history';
import help from './Help/reducer';
import error from './Error/reducer';
import dialogs from './dialogs/reducers';
import imageEditor from './ImageEditor/reducer';


export default combineReducers({
  table,
  tree,
  save,
  history,
  selected,
  focus,
  help,
  error,
  dialogs,
  imageEditor,
});

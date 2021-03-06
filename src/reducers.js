import {combineReducers} from 'redux';
import table from './Table/tableReducer';
import tree from './Tree/reducer';
import save from './SaveControl/reducer';
import help from './Help/reducer';
import error from './Error/reducer';
import dialogs from './dialogs/reducers';
import imageEditor from './ImageEditor/reducer';
import remove from './remove/reducer';
import switchCategoryView from './SwitchCategory/reducer';


export default combineReducers({
  table,
  imageEditor,
  tree,
  save,
  help,
  error,
  dialogs,
  remove,
  switchCategoryView,

  config: () => ({})
});

import {combineReducers} from 'redux';
import undoable, {distinctState} from 'redux-undo';
import table from './Table/reducerTable';
import rows from './Table/reducerRow';
import tree from './Tree/reducer';
import save from './SaveControl/reducer';
import selected from './Table/reducers/selected';
import focus from './Table/reducers/focus';


export default combineReducers({
  table,
  tree,
  save,
  rows: undoable(rows, {
    filter: distinctState(),
    clearHistoryType: ['CLEAR_HISTORY'],
    initTypes: ['CLEAR_HISTORY']
  }),
  selected,
  focus,
});

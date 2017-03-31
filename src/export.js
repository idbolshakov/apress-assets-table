import Header from './Header/Header';
import Table from './Table/Table';
import ComboSelect from './ComboSelect/ComboSelect';
import Pagination from './Pagination/Pagination';
import Tree from './Tree/Tree';
import FloatPanel from './FloatPanel/FloatPanel';
import Button from './Button/Button';
import SaveControl from './SaveControl/SaveControl';
import Scroller from './Scroller/Scroller';
import ActionsPanel from './ActionsPanel/ActionsPanel';

import * as actionsTree from './Tree/actions';
import * as actionsTable from './Table/actions';
import * as actionsSaveControl from './SaveControl/actions';

import reducerTree from './Tree/reducer';
import reducerTable from './Table/reducerTable';
import reducerRow from './Table/reducerRow';
import reducerSaveControl from './SaveControl/reducer';

import './styles/fonts.scss';
import './styles/global.scss';

export const reducers = {
  reducerTable,
  reducerRow,
  reducerTree,
  reducerSaveControl
};
export const actions = {
  actionsTree,
  actionsTable,
  actionsSaveControl,
};
export const components = {
  Table,
  Header,
  Pagination,
  ComboSelect,
  Tree,
  reducerTree,
  actionsTree,
  Button,
  FloatPanel,
  SaveControl,
  Scroller,
  ActionsPanel
};

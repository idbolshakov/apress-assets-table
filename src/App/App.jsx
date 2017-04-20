import React from 'react';
import {connect} from 'react-redux';
import {ActionCreators as UndoActionCreators} from 'redux-undo';
import {bindActionCreators} from 'redux';
import ButtonExample from '../Button/example';
import TogglerExample from '../Toggler/example';
import HeaderExample from '../Header/example';
import PaginationExample from '../Pagination/example';
import ComboSelectExample from '../ComboSelect/example';
import TableExample from '../Table/example';
import ScrollerExample from '../Scroller/example';
import ActionsPanelExample from '../ActionsPanel/example';
import TreeExample from '../Tree/example';
import SaveControl from '../SaveControl/SaveControl';
import FloatPanelExample from '../FloatPanel/example';
import CheckboxExample from '../Checkbox/example';
import ActionsExample from '../Actions/example';
import DropDownExample from '../DropDownMenu/example';
import DialogExample from '../Dialog/example';
import HelpExample from '../Help/example';
import * as actionsTable from '../Table/actions';
import * as actionsTree from '../Tree/actions';
import * as actionsSave from '../SaveControl/actions';
import {block} from '../utils';

import '../styles/global.scss';
import './style.scss';

const b = block('example-wrapper');

class App extends React.Component {
  componentWillMount() {
    this.props.actionsTable.load();
    this.props.actionsTree.load();
  }

  render() {
    const message = {
      success: 'Все изменения сохранены',
      progress: 'Изменения сохраняются',
      error: 'Ошибка сохранения',
    };

    return (
      <div>
        <div className={b}>
          <HeaderExample />
        </div>
        <div className={b}>
          <DialogExample />
        </div>
        <div className={b}>
          <ButtonExample />
        </div>
        <div className={b}>
          <TogglerExample />
        </div>
        <CheckboxExample />
        <ActionsExample />
        <div className={b}>
          <PaginationExample />
        </div>
        <div className={b}>
          <ComboSelectExample />
        </div>
        <div>
          <ScrollerExample />
        </div>
        <ActionsPanelExample />
        <div className={b}>
          <DropDownExample />
        </div>
        <div className={b}>
          <SaveControl
            save={this.props.save}
            actions={this.props.actionsSave}
            message={message}
            rows={this.props.table.rows}
          />
        </div>
        <div className={b}>
          <button onClick={this.props.onUndo} disabled={!this.props.canUndo}>
            Undo
          </button>
          <button onClick={this.props.onRedo} disabled={!this.props.canRedo}>
            Redo
          </button>
        </div>
        <div style={{marginLeft: 120}}>
          <div className={b('table')}>
            <TableExample
              table={this.props.table}
              actions={this.props.actionsTable}
            />
          </div>
        </div>
        <div className={b('tree')}>
          <TreeExample tree={this.props.tree.data} actions={this.props.actionsTree} />
        </div>
        <div className={b('float-panel')}>
          <FloatPanelExample />
        </div>
        <div className={b('help')}>
          <HelpExample />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  table: {
    ...state.table,
    rows: state.rows.present
  },
  tree: state.tree,
  save: state.save,
  canUndo: state.rows.past.length > 0,
  canRedo: state.rows.future.length > 0
});

const mapDispatchToProps = dispatch => ({
  actionsTable: bindActionCreators(actionsTable, dispatch),
  actionsTree: bindActionCreators(actionsTree, dispatch),
  actionsSave: bindActionCreators(actionsSave, dispatch),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

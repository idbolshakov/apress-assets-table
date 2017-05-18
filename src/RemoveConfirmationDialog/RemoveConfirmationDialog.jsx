import React from 'react';
import {connect} from 'react-redux';
import Dialog from '../Dialog/Dialog';
import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';
import {hideRemoveConfirmation} from '../dialogs/actions';
import {removeRow} from '../Table/actions';
import TreeDndContext from '../Tree/TreeDndContext';
import * as actions from '../Tree/actions';

const moveToWithoutGroup = 'moveToWithoutGroup';
const moveToListGroup = 'moveToListGroup';


class RemoveConfirmationDialog extends React.Component {
  state = {
    selectedAction: moveToWithoutGroup,
  }

  changeAction = (name) => {
    this.setState({
      selectedAction: name,
    });
  }

  removeRowConfirmCancel = () => {
    this.props.dispatch(hideRemoveConfirmation());
  }

  handleRemoveRow = () => {
    const {props, state} = this;
    // destroy: {
    //   move_children_to: 0, # id группы в которую надо перенести подгруппы
    //   move_products_to: 0 # id группы в которую надо перенести товары
    // }
    const destroy = {};

    if (state.selectedAction === moveToListGroup) {
      // ToDo: нужен рубрикатор
      destroy.move_children_to = 0;
      destroy.move_products_to = 0;
    }

    props.dispatch(removeRow({id: props.selectedRowId, destroy}));
  }

  actionSetExpanded = (...args) => this.props.dispatch(actions.setExpanded(...args))

  actionUpdate = (...args) => this.props.dispatch(actions.update(...args))

  actionSetNode = (args) => {
    console.log('selected -> dispatch ->', args.id);
  }

  renderSelectActions() {
    const {props, state} = this;
    return (
      <section className='e-products-actions'>
        <div className='rc-dialog-attention'>
          Внимание! В группе {props.rowName} есть {' '}
          {props.childrenGroups ? 'подгруппы.' : 'товары' }
        </div>
        <div className='e-products-actions-radio-title'>
          Действия с {props.childrenGroups ? 'группами' : 'товарами'} :
        </div>
        <div>
          <div className='e-products-actions-radio-set'>
            <Checkbox
              mix='is-radio e-products-actions-radio'
              onChange={() => this.changeAction(moveToListGroup)}
              checked={state.selectedAction === moveToListGroup}
            />
            <label
              className='e-label'
              htmlFor
              onClick={() => this.changeAction(moveToListGroup)}
            >
              {props.childrenGroups ?
                'Переместить товары в группу “Товары без группы”:' :
                'Удалить подгруппы и переместить товары в группу «Товары без группы»'
              }
            </label>
          </div>
          <div className='e-products-actions-radio-set'>
            <Checkbox
              mix='is-radio e-products-actions-radio'
              onChange={() => this.changeAction(moveToWithoutGroup)}
              checked={state.selectedAction === moveToWithoutGroup}
            />
            <label
              className='e-label'
              htmlFor
              onClick={() => this.changeAction(moveToWithoutGroup)}
            >
              Переместить {props.childrenGroups ? 'группы' : 'товары'} в группу из списка:
            </label>
          </div>
          <div className='e-products-actions-tree-box'>
            {this.props.isLoaded &&
            <TreeDndContext
              tree={this.props.tree}
              config={this.props.config}
              actionSetExpanded={this.actionSetExpanded}
              actionUpdate={this.actionUpdate}
              actionSetNode={this.actionSetNode}
              hasDragNode={false}
              hasSettingsNode={false}
              actionShowRemoveConfirmation={() => {}}
            />
          }
          </div>
        </div>
      </section>
    );
  }

  render() {
    const {props} = this;

    if (!props.removeRowConfirmOpen) {
      return false;
    }

    return (
      <Dialog
        className='is-remove-confirmation'
        visible={props.removeRowConfirmOpen}
        onClose={this.removeRowConfirmCancel}
        title='Удалить выбранную группу ?'
      >
        <div className='rc-dialog-full-width'>
          {(!!this.props.childrenGroups || !!this.props.childrenProducts) &&
            this.renderSelectActions()
          }
          <section className='rc-dialog-button-container'>
            <Button
              onClick={props.handleRemoveRow}
              mix='rc-dialog-button is-good is-big-size'
            >
              Да
            </Button>
            <Button
              onClick={this.removeRowConfirmCancel}
              mix='rc-dialog-button is-cancel is-big-size'
            >
              Не удалять
            </Button>
          </section>
        </div>
      </Dialog>);
  }
}

// Todo: нужен контейнер или брать данные только из рубрикатора, запросив нужный узел, если его нет
const mapStateToProps = state => ({
  removeRowConfirmOpen: state.dialogs.removeRowConfirmOpen,
  selectedRowId: state.dialogs.selectedIds,
  tree: state.tree.data.filter(node => state.dialogs.selectedIds !== node.id),
  rowName: '{Имя группы}',
  // Todo: взять данные из нового апи получения группы
  // (state.history.current.find(row =>
  //   state.dialogs.selectedIds[0] === row.check.common.id).name.common.text),
  childrenGroups: 44,
  childrenProducts: 33,
  isLoaded: state.tree.isLoaded,
  config: state.config
});

export default connect(mapStateToProps)(RemoveConfirmationDialog);

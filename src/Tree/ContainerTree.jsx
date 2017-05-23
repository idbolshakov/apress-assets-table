import TreeDndContext from './TreeDndContext';
import {
  React,
  PropTypes,
  Component,
  connect,
  _isEqual,
  actions,
  configSetId
} from './import';
import {removeGroup} from '../remove/actions';

class ContainerTree extends Component {
  static propTypes = {
    tree: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  actionMoveNodeRequest = (...args) => this.props.dispatch(actions.moveNodeRequest(...args))

  actionMoveNode = (...args) => this.props.dispatch(actions.moveNode(...args))

  actionSetExpanded = (...args) => this.props.dispatch(actions.setExpanded(...args))

  actionUpdate = (...args) => this.props.dispatch(actions.update(...args))

  actionSetNode = (...args) => this.props.dispatch(actions.setNode(...args))

  actionShowRemoveConfirmation = (...args) => this.props.dispatch(removeGroup(...args))

  actionConfigSetId = (...args) => this.props.dispatch(configSetId(...args))

  render() {
    const hasDragNode = true;
    const hasSettingsNode = true;

    if (this.props.isLoaded) {
      return (
        <TreeDndContext
          tree={this.props.tree.data}
          moveNode={this.props.tree.moveNode}
          config={this.props.config}
          actionMoveNodeRequest={this.actionMoveNodeRequest}
          actionMoveNode={this.actionMoveNode}
          actionSetExpanded={this.actionSetExpanded}
          actionUpdate={this.actionUpdate}
          actionSetNode={this.actionSetNode}
          hasDragNode={hasDragNode}
          hasSettingsNode={hasSettingsNode}
          actionShowRemoveConfirmation={this.actionShowRemoveConfirmation}
          actionConfigSetId={this.actionConfigSetId}
        >
          {this.props.children}
        </TreeDndContext>
      );
    }

    return <div className='e-spinner' />;
  }
}

const mapStateToProps = state => ({
  tree: state.tree,
  isLoaded: state.tree.isLoaded,
  config: state.config
});

export default connect(mapStateToProps)(ContainerTree);

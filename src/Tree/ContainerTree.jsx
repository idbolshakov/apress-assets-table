import TreeDndContext from './TreeDndContext';
import {
  React,
  PropTypes,
  Component,
  showRemoveConfirmation,
  connect,
  _isEqual,
  actions,
  configSetId
} from './import';

class ContainerTree extends Component {
  static propTypes = {
    tree: PropTypes.array,
  };

  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  actionMoveNode = (...args) => this.props.dispatch(actions.moveNode(...args))

  actionSetExpanded = (...args) => this.props.dispatch(actions.setExpanded(...args))

  actionUpdate = (...args) => this.props.dispatch(actions.update(...args))

  actionSetNode = (...args) => this.props.dispatch(actions.setNode(...args))

  actionShowRemoveConfirmation = (...args) => this.props.dispatch(showRemoveConfirmation(...args))

  actionConfigSetId = (...args) => this.props.dispatch(configSetId(...args))

  render() {
    const hasDragNode = true;
    const hasSettingsNode = true;

    if (this.props.isLoaded) {
      return (
        <TreeDndContext
          tree={this.props.tree}
          config={this.props.config}
          actionMoveNode={this.actionMoveNode}
          actionSetExpanded={this.actionSetExpanded}
          actionUpdate={this.actionUpdate}
          actionSetNode={this.actionSetNode}
          hasDragNode={hasDragNode}
          hasSettingsNode={hasSettingsNode}
          actionShowRemoveConfirmation={this.actionShowRemoveConfirmation}
          actionConfigSetId={this.actionConfigSetId}
        />
      );
    }

    return <div className='e-spinner' />;
  }
}

const mapStateToProps = state => ({
  tree: state.tree.data,
  isLoaded: state.tree.isLoaded,
  config: state.config
});

export default connect(mapStateToProps)(ContainerTree);

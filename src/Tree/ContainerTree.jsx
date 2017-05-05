import Tree from './Tree';
import TreeLayer from './TreeLayer';
import {
  React,
  PropTypes,
  Component,
  b,
  DragDropContext,
  showRemoveConfirmation,
  HTML5Backend,
  connect,
  _isEqual,
  actions
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

  render() {
    const hasDragNode = true;

    if (this.props.isLoaded) {
      return (
        <div className={b}>
          <Tree
            tree={this.props.tree}
            config={this.props.config}
            actionMoveNode={this.actionMoveNode}
            actionSetExpanded={this.actionSetExpanded}
            actionUpdate={this.actionUpdate}
            actionSetNode={this.actionSetNode}
            hasDragNode={hasDragNode}
            actionShowRemoveConfirmation={this.actionShowRemoveConfirmation}
          >
            {this.props.children}
          </Tree>
          <TreeLayer />
        </div>
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

export default DragDropContext(
  HTML5Backend
)(
  connect(
    mapStateToProps
  )(ContainerTree)
);

import TreeItem from './TreeItem';
import {
  React,
  PropTypes,
  Component,
  DropTarget,
  _throttle,
  _isEqual,
  b,
  constants
} from './import';

class Tree extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,

    actionMoveNode: PropTypes.func,
    actionSetExpanded: PropTypes.func.isRequired,
    actionUpdate: PropTypes.func.isRequired,
    actionSetNode: PropTypes.func.isRequired,
    actionShowRemoveConfirmation: PropTypes.func,
    actionConfigSetId: PropTypes.func,

    tree: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired,
    hasDragNode: PropTypes.bool.isRequired,
  };

  state = {
    isMove: false,
    hover: {
      id: null,
      index: null,
      target: null
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
  }

  setHoverNode = (id, index, target) => this.setState({hover: {id, index, target}});

  moveStart = isMove => this.setState({isMove});

  moveStep = _throttle((...args) => {
    if (this.state.isMove) { this.setHoverNode(...args); }
  }, 50);


  moveEnd = (id) => {
    this.moveStart(false);
    this.props.actionMoveNode({id, hover: this.state.hover});
    this.setHoverNode(null, null, null);
  }

  createTree(tree = this.props.tree) {
    return tree.map((node, index) => node.id &&
      <div key={node.id} className={b('item-wrapper')}>
        <TreeItem
          id={node.id}
          index={index}
          name={node.name}
          count={node['items_count']}
          expandable={node.expandable}
          expanded={node.expanded}
          selected={node.selected}
          urlName={node['url_name']}
          treeNodes={node['tree_nodes']}
          orderUrl={node['order_url']}

          actionSetExpanded={this.props.actionSetExpanded}
          actionUpdate={this.props.actionUpdate}
          actionSetNode={this.props.actionSetNode}
          actionShowRemoveConfirmation={this.props.actionShowRemoveConfirmation}
          actionConfigSetId={this.props.actionConfigSetId}

          moveStart={this.moveStart}
          moveStep={this.moveStep}
          moveEnd={this.moveEnd}

          config={this.props.config}
          hoverNode={this.state.hover}
          hasDragNode={this.props.hasDragNode}
          hasSettingsNode={this.props.hasSettingsNode}
        />
        {Array.isArray(node['tree_nodes']) &&
          <div className={b('list')}>
            {this.createTree(node['tree_nodes'])}
          </div>
        }
      </div>
    );
  }

  render() {
    const {connectDropTarget, children} = this.props;

    return connectDropTarget(
      <div className={b('list')}>
        {children}
        {this.createTree()}
      </div>
    );
  }
}

export default DropTarget(
  constants.TREE,
  {drop() {}},
  connect => ({connectDropTarget: connect.dropTarget()})
)(Tree);

import Tree from './Tree';
import TreeLayer from './TreeLayer';
import {
  React,
  Component,
  b,
  DragDropContext,
  HTML5Backend,
  _isEqual,
  } from './import';

class ContainerTree extends Component {
  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  render() {
    return (
      <div className={b}>
        <Tree
          {...this.props}
        >
          {this.props.children}
        </Tree>
        <TreeLayer />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(ContainerTree);

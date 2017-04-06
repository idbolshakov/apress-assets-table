import React, {PropTypes, Component} from 'react';
import {block} from '../utils';
import TreeItem from './TreeItem';
import './e-tree.scss';

const b = block('e-tree');

export default class Tree extends Component {
  static propTypes = {
    tree: PropTypes.array,
  };

  createTree(tree = this.props.tree) {
    return tree.map(node =>
      <TreeItem
        key={node.id}
        node={node}
        actions={this.props.actions}
        config={this.props.config}
      >
        {node.tree_nodes && node.tree_nodes.length ?
          <div className={b('list')}>{this.createTree(node.tree_nodes)}</div> : ''}
      </TreeItem>
    );
  }

  render() {
    return (
      <div className={b}>
        <div className={b('list')}>
          {this.props.children}
          {this.createTree()}
        </div>
      </div>
    );
  }
}

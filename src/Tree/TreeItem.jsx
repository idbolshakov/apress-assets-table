import React, {PropTypes, Component} from 'react';
import {block} from '../utils';

const b = block('e-tree');

export default class TreeItem extends Component {
  static propTypes = {
    node: PropTypes.shape({
      name: PropTypes.string,
      count: PropTypes.number,
      arrow: PropTypes.bool,
      selected: PropTypes.bool,
      expanded: PropTypes.bool,
    })
  };

  clickExpanded(expanded) {
    this.props.actions.setExpanded({id: this.props.node.id, expanded});

    if (!this.props.node.tree_nodes || !this.props.node.tree_nodes.length) {
      this.props.actions.updateTree({
        id: this.props.node.id,
        url_name: this.props.node.url_name,
        config: this.props.config
      });
    }
  }

  hendlerClickSelected() {
    this.props.actions.setTreeNode({id: this.props.node.id, url_name: this.props.node.url_name});

    if (this.props.node.expandable) {
      this.clickExpanded(true);
    }
  }

  hendlerClickExpanded(e) {
    e.stopPropagation();

    this.clickExpanded(!this.props.node.expanded);
  }

  render() {
    const node = this.props.node;

    return (
      <div className={b('item-wrapper')}>
        <div
          className={b('item').is({active: node.selected, open: node.expanded})}
          data-count={`(${node.items_count})`}
          onClick={() => this.hendlerClickSelected()}
        >

          <span
            className={node.expandable ? b('arrow') : ''}
            onClick={e => this.hendlerClickExpanded(e)}
          />
          <span
            className={b('item-title')}

          >
            {node.name}
          </span>
        </div>
        {this.props.children}
      </div>
    );
  }
}

import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import {block} from '../utils';
import {showRemoveConfirmation} from '../dialogs/actions';

const b = block('e-tree');

class TreeItem extends Component {
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
      this.props.actions.update({
        id: this.props.node.id,
        url_name: this.props.node.url_name,
        config: this.props.config
      });
    }
  }

  hendlerClickSelected() {
    this.props.actions.setNode({id: this.props.node.id, url_name: this.props.node.url_name});

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
          <DropDownMenu
            mix='is-settings'
            trigger={['hover']}
            items={[
              {
                title: 'Редактировать',
                id: 'edit',
              },
              {
                title: 'Изменить порядок товаров',
                id: 'reorderGoods',
              },
              {
                title: <span className={b('remove')}>Удалить</span>,
                id: 'remove',
              },
            ]}
            onSelect={(action) => {
              if (action === 'edit') {
                console.log('Todo: добавить вызов редактирования');
              }
              if (action === 'remove') {
                this.props.dispatch(showRemoveConfirmation(this.props.node.id));
              }
              if (action === 'reorderGoods') {
                window.open(node.order_url);
              }
            }}
          >
            <span className={b('settings')} />
          </DropDownMenu>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default connect()(TreeItem);

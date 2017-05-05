/* eslint react/no-unused-prop-types: 0 */
/* eslint react/no-find-dom-node: 0 */
import TreeItem from './TreeItem';
import {
  React,
  PropTypes,
  Component,
  findDOMNode,
  DragLayer,
  constants,
  _isEqual,
  b,
} from './import';

class TreeLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    isDragging: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.elem = findDOMNode(this);
  }

  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  componentDidUpdate() {
    this.elem = findDOMNode(this);
  }

  getItemStyles() {
    const {initialOffset, currentOffset, initialSourceOffset} = this.props;

    if (this.elem) {
      const parentPosition = this.elem.parentElement.getBoundingClientRect();
      let x = 0;
      let y = 0;

      if (!initialOffset || !currentOffset || !initialSourceOffset) {
        return {display: 'none'};
      }

      y = currentOffset.y;
      x = initialSourceOffset.x;

      if (currentOffset.y < parentPosition.top) {
        y = parentPosition.top;
      }

      if (currentOffset.y > parentPosition.bottom) {
        y = parentPosition.bottom;
      }

      return {transform: `translateY(${y - (constants.NODE_HEIGHT / 2)}px) translateX(${x}px)`};
    }

    return {};
  }

  elem = null;

  renderItem(type = this.props.itemType, item = this.props.item) {
    switch (type) {
      case constants.TREE:
        return (
          <TreeItem
            key={'preview'}
            id={'preview'}
            {...item}
          />
        );
      default:
        return null;
    }
  }

  render() {
    if (!this.props.isDragging) {
      return null;
    }

    return (
      <div className={b('layer')}>
        <div style={this.getItemStyles()} className={b('preview')}>
          {this.renderItem()}
        </div>
      </div>
    );
  }
}

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialClientOffset(),
  initialSourceOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getClientOffset(),
  isDragging: monitor.isDragging(),
}))(TreeLayer);

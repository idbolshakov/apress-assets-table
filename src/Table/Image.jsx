import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import _isEqual from 'lodash/isEqual';
import {bindActionCreators} from 'redux';
import {showImageEditor} from '../dialogs/actions';
import {editImages} from '../ImageEditor/actions';
import {block} from '../utils';
import {setFocus} from './actions';
import {
  handleSelection,
  handleDrag,
  mapSelectionProps,
  mapFocusProps,
  selectCellActions}
from './utils';


const b = block('e-table');

class ImageCell extends Component {
  static propTypes = {
    cell: PropTypes.shape({
      data: PropTypes.shape({
        common: PropTypes.shape({
          id: PropTypes.number,
          src: PropTypes.string,
        })
      }),
      name: PropTypes.string
    })
  };

  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  handleCellClick = () => {
    this.props.setFocus({name: this.props.cell.name, id: this.props.cell.id});
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.editImages();
    }
  }

  handeDoubleClick = () => {
    this.editImages();
  }

  editImages = () => {
    if (this.props.cell.data.common.copy_images_from) {
      return;
    }
    this.props.showImageEditor();
    this.props.editImages({name: this.props.cell.name, id: this.props.cell.id});
  }

  handleSelection = handleSelection.bind(this)

  handleStartSelection = () => {
    this.props.startSeletion({name: this.props.cell.name, id: this.props.cell.id});
  }

  handleMouseUp = () => {
    this.props.endSeletion({name: this.props.cell.name, id: this.props.cell.id});
    if (this.props.isDragging) {
      this.props.endDragImages({
        name: this.props.cell.name,
        id: this.props.cell.id,
        selectionData: this.props.selectionData
      });
    }
  }

  handleDrag = handleDrag.bind(this)

  render() {
    const {props} = this;
    const src = props.cell.data.common.images &&
      props.cell.data.common.images.length &&
      props.cell.data.common.images[0].src;
    const img = src ?
      <img src={src} alt='' className={b('img')} /> :
      <div className={b('img-empty')} />;

    return (
      <div
        tabIndex={-1}
        className={b('cell').mix(`is-${props.cell.classMix}`)
          .is({
            focus: props.cell.isFocus,
            selected: props.selected,
            'selected-to': props.selectedTo,
          })
        }
        onKeyDown={this.handleKeyPress}
        onClick={this.handleCellClick}
        onDoubleClick={this.handeDoubleClick}
        ref={($td) => { $td && props.cell.isFocus && $td.focus(); }}
        // ToDo: нужен бек
        // onMouseEnter={this.handleSelection}
        // onMouseDown={() => { this.handleStartSelection(); }}
        // onMouseUp={() => { this.handleMouseUp(); }}
        // onDragStart={e => e.preventDefault}
        // onSelect={e => e.preventDefault}
      >
        {img}
        {props.cell.data.common.copy_images_from &&
          <div title='Выполняется копирование изображений' className={b('loader')} />}
        {props.isLast &&
          <div onMouseDown={this.handleDrag} className={b('drag-tool')} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const selected = state.selected;
  const focus = state.focus;
  return {
    ...mapSelectionProps(selected, ownProps),
    ...mapFocusProps(focus, ownProps),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  ...selectCellActions,
  setFocus,
  editImages,
  showImageEditor,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ImageCell);

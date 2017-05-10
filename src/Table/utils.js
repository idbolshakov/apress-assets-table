import {
  startSeletion,
  startDrag,
  endSeletion,
  selectionAdd,
  selectionAddTo,
  selectionRemoveTo,
  selectionRemove,
  endDrag,
  endDragImages,
} from './actions';

export function handleSelection(e) {
  e.preventDefault();
  if (this.props.isSelected && this.props.allow) {
    !this.props.selected ?
      this.props.selectionAdd({id: this.props.cell.id}) :
      this.props.selectionRemove({id: this.props.cell.id});
  }
  if (this.props.isDragging && !this.props.selected && this.props.allow) {
    !this.props.selectedTo ?
      this.props.selectionAddTo({id: this.props.cell.id}) :
      this.props.selectionRemoveTo({id: this.props.cell.id});
  }
}

export function handleDrag(e) {
  e.stopPropagation();
  e.preventDefault();
  this.props.startDrag({name: this.props.cell.name, id: this.props.cell.id});
}

export function mapSelectionProps(selected, ownProps) {
  return ({
    selected: selected.name === ownProps.cell.name &&
      selected.ids.find(id => ownProps.cell.id === id),
    selectedTo: selected.name === ownProps.cell.name &&
      selected.idTo.find(id => ownProps.cell.id === id),
    isLast: selected.name === ownProps.cell.name &&
      selected.ids.slice(-1)[0] === ownProps.cell.id,
    isSelected: selected.isSelected,
    isDragging: selected.isDragging,
    selectionData: selected,
    allow: selected.name === ownProps.cell.name,
  });
}

export function mapFocusProps(focus, ownProps) {
  return ({
    focus: focus.activeRow === ownProps.cell.name && focus.activeCell === ownProps.cell.id
  });
}

export const selectCellActions = {
  startSeletion,
  startDrag,
  endSeletion,
  selectionAdd,
  selectionAddTo,
  selectionRemoveTo,
  selectionRemove,
  endDrag,
  endDragImages,
};

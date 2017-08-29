import {
  startSelection,
  resetSelection,
  continueSelection,
  endSelection,
  startDrag,
} from './actions';


export function mapFocusProps(focus, ownProps) {
  return ({
    focus: focus.activeRow === ownProps.cell.name && focus.activeCell === ownProps.cell.id
  });
}

export const selectCellActions = {
  startSelection,
  resetSelection,
  continueSelection,
  endSelection,
  startDrag,
};

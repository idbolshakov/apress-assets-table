import React, {Component} from 'react';

function getDisplayName(Cell) {
  return Cell.displayName || Cell.name || 'Cell';
}

export default function withDragging(Cell) {
  class WithDragging extends Component {

    handleStartSelection = () => {
      this.props.startSelection({row: this.props.cell.row, column: this.props.cell.column});
    };

    handleSelection = (e) => {
      e.preventDefault();
      if (this.props.selected.isSelecting || this.props.selected.isDragging) {
        this.props.continueSelection({row: this.props.cell.row, column: this.props.cell.column});
      }
    };

    handleResetSelection = () => {
      this.props.resetSelection({row: this.props.cell.row, column: this.props.cell.column});
    };

    handleEndSelection = () => {
      this.props.endSelection();
    };

    handleDrag = (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.props.startDrag({row: this.props.cell.row, column: this.props.cell.column});
    };

    handleCellClick = () => {
      this.props.setFocus({name: this.props.cell.name, id: this.props.cell.id});
    };

    render() {
      return (<Cell
        {...this.props}
        handleStartSelection={this.handleStartSelection}
        handleSelection={this.handleSelection}
        handleResetSelection={this.handleResetSelection}
        handleEndSelection={this.handleEndSelection}
        handleDrag={this.handleDrag}
        handleCellClick={this.handleCellClick}
      />);
    }
  }

  WithDragging.displayName = `WithDragging(${getDisplayName(Cell)})`;
  return WithDragging;
}

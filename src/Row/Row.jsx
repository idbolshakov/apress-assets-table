import React from 'react';
import TextCell from '../TextCell/TextCell';
import CheckCell from '../CheckCell/CheckCell';
import ImageCell from '../ImageCell/ImageCell';
import PathCell from '../PathCell/PathCell';
import {block} from '../utils';

const b = block('e-table');

export default class Row extends React.Component {
  render() {
    const keys = Object.keys(this.props.row);
    const cellComponent = keys.map((cell, index) => {
      const cellName = cell.replace(/_/g, '-');
      const dataRow = {
        data: this.props.row[cell],
        name: cellName,
        placeholder: this.props.placeholder[cell]
      };

      switch (this.props.configCell[cellName].type) {
        case 'text':
          return <TextCell key={index} cell={dataRow} />;
        case 'check':
          return <CheckCell key={index} cell={dataRow} />;
        case 'img':
          return <ImageCell key={index} cell={dataRow} />;
        case 'path':
          return <PathCell key={index} cell={dataRow} />;
        default:
          return <td className={b('cell')} />;
      }
    });

    return (
      <tr>{cellComponent}</tr>
    );
  }
}

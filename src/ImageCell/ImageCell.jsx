import React, {PropTypes, Component} from 'react';
import {block} from '../utils';

const b = block('e-table');

export default class ImageCell extends Component {
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

  render() {
    const src = this.props.cell.data.common.src;
    const img = src ?
      <img src={src} alt='' className={b('img')} /> :
      <div className={b('img-empty')} />;

    return (
      <td className={b('cell').mix(`is-${this.props.cell.name}`)}>
        {img}
      </td>
    );
  }
}

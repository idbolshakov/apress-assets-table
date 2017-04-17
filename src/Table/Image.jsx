import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {setFocus} from './actions';
import {block} from '../utils';


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

  handleCellClick = () => {
    this.props.dispatch(setFocus({name: this.props.cell.name, id: this.props.cell.id}));
  }

  render() {
    const src = this.props.cell.data.common.src;
    const img = src ?
      <img src={src} alt='' className={b('img')} /> :
      <div className={b('img-empty')} />;

    return (
      <td
        tabIndex={-1}
        onClick={this.handleCellClick}
        ref={($td) => { $td && this.props.cell.isFocus && $td.focus(); }}
        className={b('cell').is({[this.props.cell.classMix]: true, focus: this.props.cell.isFocus})}
      >
        {img}
      </td>
    );
  }
}

export default connect()(ImageCell);

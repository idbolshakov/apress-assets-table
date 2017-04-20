import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {showImageEditor} from '../dialogs/actions';
import {editImages} from '../ImageEditor/actions';
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

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.editImages();
    }
  }

  handeDoubleClick = () => {
    this.editImages();
  }

  editImages = () => {
    this.props.dispatch(showImageEditor());
    this.props.dispatch(editImages({name: this.props.cell.name, id: this.props.cell.id}));
  }

  render() {
    const src = this.props.cell.data.common.images &&
      this.props.cell.data.common.images.length &&
      this.props.cell.data.common.images[0].src;
    const img = src ?
      <img src={src} alt='' className={b('img')} /> :
      <div className={b('img-empty')} />;

    return (
      <td
        tabIndex={-1}
        onKeyDown={this.handleKeyPress}
        onClick={this.handleCellClick}
        onDoubleClick={this.handeDoubleClick}
        ref={($td) => { $td && this.props.cell.isFocus && $td.focus(); }}
        className={b('cell').is({[this.props.cell.classMix]: true, focus: this.props.cell.isFocus})}
      >
        {img}
      </td>
    );
  }
}

export default connect()(ImageCell);

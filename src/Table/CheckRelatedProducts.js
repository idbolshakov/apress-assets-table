/* eslint react/no-unused-prop-types: 0 */
import React from 'react';
import {connect} from 'react-redux';
import _isEqual from 'lodash/isEqual';
import {setFocus} from './actions';
import Checkbox from '../Checkbox/Checkbox';
import {block} from '../utils';

const b = block('e-table');

class CheckRelatedProducts extends React.Component {

  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  handleCellClick = () => {
    this.props.dispatch(setFocus({name: this.props.cell.name, id: this.props.cell.id}));
  };

  handleChecked = (checked) => {
    if (checked) {
      this.props.relatedProducts.attendantProducts.length < 30 &&
      this.props.actions.add({
        relation: {
          position: this.props.relatedProducts.attendantProducts.length
        },
        product: {
          id: this.props.cell.id,
          name: this.props.cell.data.common.title
        }
      });
    } else {
      this.props.actions.remove(this.props.cell.id);
    }
  };

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setTimeout(() => { this.handleChecked(!this.props.checked); }, 100);
    }
  };

  render() {
    const props = this.props;
    return (
      <div
        tabIndex={-1}
        ref={($td) => { $td && props.cell.isFocus && $td.focus(); }}
        className={b('cell').mix(`is-${props.cell.classMix}`).is({focus: props.cell.isFocus})}
        onClick={props.binder && this.handleCellClick}
        onKeyDown={this.handleKeyPress}
      >
        <Checkbox
          onChange={this.handleChecked}
          mix={'is-related-products-check'}
          checked={!!this.props.relatedProducts.attendantProducts.find(
            item => item.product.id === this.props.cell.id
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  relatedProducts: state.relatedProducts
});

export default connect(mapStateToProps)(CheckRelatedProducts);

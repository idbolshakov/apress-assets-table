import {connect} from 'react-redux';
import {
  bindActionCreators,
  compose
} from 'redux';
import withDragging from './withDragging';
import Check from './Check';
import Image from './Image';
import Path from './Path';
import Text from './Text';
import {selectCellActions} from './utils';
import {setFocus} from './actions';

const mapStateToProps = state => ({selected: state.table.selected});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...selectCellActions,
  setFocus
}, dispatch);

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withDragging);

export const CheckWithDragging = enhance(Check);
export const ImageWithDragging = enhance(Image);
export const PathWithDragging = enhance(Path);
export const TextWithDragging = enhance(Text);

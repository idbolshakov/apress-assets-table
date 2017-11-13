import PropTypes from 'prop-types';

export const textCellEditorPropType = PropTypes.shape({
  text: PropTypes.string,
  maxLen: PropTypes.number.isRequired,
  isEdit: PropTypes.bool.isRequired,
  handlerEdit: PropTypes.func.isRequired,
  handlerSave: PropTypes.func.isRequired
});

export const textCellCKEditorPropType = PropTypes.shape({
  text: PropTypes.string,
  maxLen: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  handlerEdit: PropTypes.func.isRequired,
  handlerSave: PropTypes.func.isRequired
});

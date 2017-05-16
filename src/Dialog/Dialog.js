import React from 'react';
import _isEqual from 'lodash/isEqual';
import RcDialog from 'rc-dialog';
import './rc-dialog.scss';

class Dialog extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  render() {
    return (
      <RcDialog
        animation='slide-fade'
        maskAnimation='fade'
        {...this.props}
      >
        {this.props.children}
      </RcDialog>
    );
  }

}

export default Dialog;

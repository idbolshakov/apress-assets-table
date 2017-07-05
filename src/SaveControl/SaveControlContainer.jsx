import React, {Component} from 'react';
import {connect} from 'react-redux';
import SaveControl from './SaveControl';

class SaveControlContainer extends Component {
  componentWillReceiveProps(nextProps) {
    const {isSave, fetchDiff, isProgress, waitingState, prevState} = nextProps.save;
    const {rows: curState} = nextProps;
    const {removeInProgrees} = this.props;

    if (isSave && !fetchDiff) {
      nextProps.actions.saveCreateDiff({curState, prevState});
    }

    if (!isProgress && !fetchDiff && waitingState.length) {
      nextProps.actions.saveStart();
    }

    if (isProgress || waitingState.length || fetchDiff || removeInProgrees) {
      window.addEventListener('beforeunload', this.hendlerBeforeunload);
    } else {
      window.removeEventListener('beforeunload', this.hendlerBeforeunload);
    }
  }

  hendlerBeforeunload = (e) => {
    const message = 'Возможно внесенные изменения не сохранятся';

    if (e) { e.returnValue = message; }

    return message;
  }

  render() {
    return (
      <SaveControl
        message={this.props.message}
        removeInProgrees={this.props.removeInProgrees}
        isProgress={this.props.save.isProgress}
        isError={this.props.save.isError}
      />
    );
  }
}

const mapStateToProps = state => ({
  removeInProgrees: state.remove.removeInProgrees,
});

export default connect(mapStateToProps)(SaveControlContainer);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import SaveControl from './SaveControl';

class SaveControlContainer extends Component {
  componentDidMount() {
    window.addEventListener('beforeunload', this.hendlerBeforeunload);
  }

  componentWillReceiveProps(nextProps) {
    const {withUnsavedChanges, fetchDiff, isProgress, waitingState, prevState} = nextProps.save;
    const {rows: curState} = nextProps;

    if (withUnsavedChanges && !fetchDiff) {
      nextProps.actions.saveCreateDiff({curState, prevState});
    }

    if (!isProgress && !fetchDiff && waitingState.length) {
      nextProps.actions.saveStart();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.hendlerBeforeunload);
  }

  hendlerBeforeunload = (e) => {
    /* eslint consistent-return: 0 */
    const {fetchDiff, isProgress, waitingState} = this.props.save;
    const {removeInProgrees} = this.props;

    if (isProgress || waitingState.length || fetchDiff || removeInProgrees) {
      const message = 'Возможно внесенные изменения не сохранятся';

      if (e) { e.returnValue = message; }

      return message;
    }
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

import React from 'react';
import {connect} from 'react-redux';
import _isEqual from 'lodash/isEqual';
import ImageEditor from '../ImageEditor/ImageEditor';
import Dialog from '../Dialog/Dialog';
import Button from '../Button/Button';
import {
  hideMassRemoveConfirmation,
  hideRemoveEmptyRowsConfirmation,
} from './actions';

import RemoveConfirmationDialog from '../RemoveConfirmationDialog/RemoveConfirmationDialog';

// TODo: Запилить сюда экшены удалений

class ContainerDialog extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  removeRowsConfirmCancel = () => {
    this.props.dispatch(hideMassRemoveConfirmation());
  }

  removeEmptyRowConfirmCancel = () => {
    this.props.dispatch(hideRemoveEmptyRowsConfirmation());
  }

  render() {
    return (
      <div>
        {this.props.removeRowConfirmOpen && <RemoveConfirmationDialog /> }
        <Dialog
          className='is-confirmation'
          visible={this.props.removeRowsConfirmOpen}
          onClose={this.removeRowsConfirmCancel}
          title='Удалить выбранные группы ?'
        >
          <div>
            <Button
              onClick={() => { console.log('dispatch mass remove'); }}
              mix='rc-dialog-button is-good is-big-size'
            >
              Да
            </Button>
            <Button
              onClick={this.removeRowsConfirmCancel}
              mix='rc-dialog-button is-cancel is-big-size'
            >
              Не удалять
            </Button>
          </div>
        </Dialog>
        <Dialog
          className='is-confirmation'
          visible={this.props.removeEmptyRowConfirmOpen}
          onClose={this.removeEmptyRowConfirmCancel}
          title='Удалить группы без товаров?'
        >
          {true ? // ToDo: сюда isFetching из домена про удаление
            <div>
              <Button
                onClick={() => { console.log('dispatch mass remove'); }}
                mix='rc-dialog-button is-good is-big-size'
              >
                Да
              </Button>
              <Button
                onClick={this.removeEmptyRowConfirmCancel}
                mix='rc-dialog-button is-cancel is-big-size'
              >
                Не удалять
              </Button>
            </div> :
            <div className='e-preloader' />
          }
        </Dialog>
        <ImageEditor maxLenght={1} maxSize={2e+6} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  removeRowsConfirmOpen: state.dialogs.removeRowsConfirmOpen,
  removeEmptyRowConfirmOpen: state.dialogs.removeEmptyRowConfirmOpen,
  selectedRow: state.dialogs.selectedIds,
  removeRowConfirmOpen: state.dialogs.removeRowConfirmOpen,
});

export default connect(mapStateToProps)(ContainerDialog);

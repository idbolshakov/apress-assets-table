import React from 'react';
import Dialog from './Dialog';
import Button from '../Button/Button';

export default class DialogExampleConfirmation extends React.Component {
  state = {
    visible: false,
    inLoading: false,
  }

  onClick = () => { this.setState({visible: true}); }

  onClose = () => {
    this.setState({visible: false, inLoading: false});
  }

  onDestroyOnCloseChange = (e) => {
    this.setState({destroyOnClose: e.target.checked});
  }

  onSubmit = () => {
    console.log('on submit');
    this.setState({inLoading: true});
  }

  renderButtons = () => (
    !this.state.inLoading ?
      <div>
        <Button onClick={this.onSubmit} mix='rc-dialog-button is-good is-big-size'>
          Да
        </Button>
        <Button onClick={this.onClose} mix='rc-dialog-button is-cancel is-big-size'>
          Не удалять
        </Button>
      </div> :
      <div className='e-preloader' />
  )

  render() {
    return (
      <div>
        <h4>Dialog: confirm</h4>
        <p>
          <button onClick={this.onClick}>
            show dialog
          </button>
        </p>
        <Dialog
          className='is-confirmation'
          visible={this.state.visible}
          onClose={this.onClose}
          title='Удалить группы без товаров?'
        >
          {this.renderButtons()}
        </Dialog>
      </div>
    );
  }
}

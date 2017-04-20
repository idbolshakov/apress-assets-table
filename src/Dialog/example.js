import React from 'react';
import Dialog from './Dialog';
import Button from '../Button/Button';
import ExampleConfirmation from './exampleConfirmation';

export default class DialogExample extends React.Component {

  state = {
    visible: false,
    width: 600,
    destroyOnClose: false,
    center: false,
  }

  onClick = (e) => {
    this.setState({
      mousePosition: {
        x: e.pageX,
        y: e.pageY,
      },
      visible: true,
    });
  }

  onClose = () => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }

  onDestroyOnCloseChange = (e) => {
    this.setState({
      destroyOnClose: e.target.checked,
    });
  }

  changeWidth = () => {
    this.setState({
      width: this.state.width === 600 ? 800 : 600,
    });
  }

  center = (e) => {
    this.setState({
      center: e.target.checked,
    });
  }

  render() {
    let dialog;
    if (this.state.visible || !this.state.destroyOnClose) {
      const style = {
        width: this.state.width,
      };
      let wrapClassName = '';
      if (this.state.center) {
        wrapClassName = 'center';
      }
      dialog = (
        <Dialog
          visible={this.state.visible}
          wrapClassName={wrapClassName}
          onClose={this.onClose}
          style={style}
          mousePosition={this.state.mousePosition}
          title={<div>Загрузка фотографий</div>}
          footer={
            <div>
              <Button mix='is-good rc-dialog-button'>Сохранить и продолжить</Button>
              <Button onClick={this.onClose} mix='rc-dialog-button'>Отмена</Button>
            </div>
          }
        >
          <input />
          <p>basic modal</p>
          <p>
            Пожалуйста, откадрируйте изображение для корректного отображения на сайте.
            Выбранная область будет показываться в категориях товаров на главной странице
            вашего сайта.
          </p>
          <button onClick={this.changeWidth}>change width</button>
          {[...new Array(10)].map((k, index) =>
            <p key={index}>
              Пожалуйста, откадрируйте изображение для корректного отображения на сайте.
              Выбранная область будет показываться в категориях товаров на главной странице
              вашего сайта.
            </p>
          )}
        </Dialog>
      );
    }
    return (
      <div>
        <h3>Dialog: based on <a href='https://github.com/react-component/dialog'>rc-dialog</a></h3>
        <p>
          <button
            onClick={this.onClick}
          >
            show dialog
          </button>
        </p>
        {dialog}
        <ExampleConfirmation />
      </div>
    );
  }
}

import React, {PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import _isEqual from 'lodash/isEqual';
import accepts from 'attr-accept';
import pluralize from 'pluralize-ru';
import {hideImageEditor} from '../dialogs/actions';
import {updateImages} from './actions';
import Button from '../Button/Button';
import Dialog from '../Dialog/Dialog';
import {block} from '../utils';
import './e-image-editor.scss';

const b = block('e-image-editor');

const initialState = Object.freeze({
  files: [],
  existedImages: [],
  errors: [],
  rejectedFiles: [],
});

class ImageEditor extends React.Component {
  static defaultProps = {
    maxSize: 2e+6,
    maxLenght: 3,
    accept: 'image/jpeg, image/png, image/gif',
  }

  static propTypes: {
    count: PropTypes.number,
    maxLenght: PropTypes.number,
    accept: PropTypes.string,
  }

  state = initialState

  componentWillReceiveProps(nextProps) {
    this.setState({
      existedImages: nextProps.cellOwnedImages,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
  }

  getTotalCount = () => this.state.existedImages.length + this.state.files.length;

  removeExistedImage = (existedImage) => {
    this.setState({
      ...this.state,
      existedImages: this.state.existedImages.filter(image => image.id !== existedImage.id)
    });
  }

  removeImage = (index) => {
    this.setState({
      ...this.state,
      files: this.state.files.filter((image, i) => index !== i)
    });
  }

  handleDrop = (files, rejectedFiles) => {
    const images = [...files];

    if (this.getTotalCount() >= this.props.maxLenght) { return; }

    if (this.getTotalCount() + files.length >= this.props.maxLenght) {
      images.splice(0, (this.getTotalCount() + files.length) - this.props.maxLenght);
    }
    this.setState({
      ...this.state,
      files: [...this.state.files, ...images],
      rejectedFiles
    });
  }

  closeImageEditor = () => {
    if (this.props.isFetching) {
      return;
    }
    this.props.dispatch(hideImageEditor());
    this.setState(initialState);
  }

  saveImages = () => {
    this.props.dispatch(
      updateImages({files: this.state.files, images: this.state.existedImages}));
    if (!this.props.error) {
      this.setState(initialState);
    }
  }

  renderErrors = () => {
    const {state, props} = this;

    return (
      <div>
        {state.rejectedFiles.map(file => (
          accepts(file, props.accept) ?
            <p className={b('error')}>{file.name} - Превышен допустимый размер</p> :
            <p className={b('error')}>
              Невозможно прикрепить файл. Содержание файла, не поддерживает формат изображения.
            </p>
          )
        )}
        {this.getTotalCount() >= props.maxLenght &&
          <p className={b('error')}>
            Вы выбрали максимум фотографий!
          </p>
        }
        {props.error &&
          <p className={b('error')}>
            Не удалось загрузить фотографии, повторите попытку.
          </p>
        }
      </div>
    );
  }

  renderImages = () => {
    const {state} = this;

    return (
      <div className={b('preview-box')}>
        {state.existedImages.map(image =>
          <div key={image.id} className={b('preview')}>
            <img alt='' src={image.src} />
            <div onClick={() => { this.removeExistedImage(image); }} className={b('remove')} />
          </div>
        )}
        {state.files.map((file, index) =>
          <div key={index} className={b('preview')}>
            <img alt='' src={file.preview} />
            <div onClick={() => { this.removeImage(index); }} className={b('remove')} />
          </div>
        )}
      </div>
    );
  }

  render() {
    const props = this.props;
    const count = this.getTotalCount();
    return (
      <Dialog
        className='is-image-editor e-image-editor'
        visible={this.props.open}
        onClose={this.closeImageEditor}
        closable={!this.props.isFetching}
        title={
          <div>
            <h3>Загрузка фотографий</h3>
            {count ?
              <p>Вы выбрали {count}{' '}
                {pluralize(count, 'ни одной', 'фотографию', 'фотографии', 'фотографии')} из {' '}
                {props.maxLenght}
              </p> :
              <p>Выберите фотографию, которая подходит данной группе товаров больше всего.</p>
            }
            {!props.isFetching && this.renderImages()}
          </div>
        }
        footer={
          !props.isFetching &&
            <div>
              <Button onClick={this.saveImages} mix='rc-dialog-button is-good is-big-size'>
                Сохранить и продолжить
              </Button>
              <Button onClick={this.closeImageEditor} mix='rc-dialog-button is-cancel is-big-size'>
                Отмена
              </Button>
            </div>
        }
      >
        {!props.isFetching ?
          <section>
            {this.renderErrors()}
            <div>
              <p>Загрузите картинку</p>
              <Dropzone
                disableClick={this.getTotalCount() >= props.maxLenght}
                maxSize={this.props.maxSize}
                className={b('drop-zone').is({disabled: this.getTotalCount() >= props.maxLenght})()}
                onDrop={this.handleDrop}
                accept={props.accept}
              >
                <div className={b('message')}>
                  Перетащите картинку в эту область или{' '}
                  <span className={b('message-link')}>загрузите</span>
                </div>
              </Dropzone>
            </div>
            <div>
              Изображение в формате jpg, gif или png, не более 2 Мб.
            </div>
          </section> :
          <div className={b('preloader').mix('e-preloader')} />
        }
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  cellOwnedImages: state.imageEditor.images,
  isFetching: state.imageEditor.isFetching,
  error: state.imageEditor.error,
  open: state.dialogs.imageEditor,
});

export default connect(mapStateToProps)(ImageEditor);

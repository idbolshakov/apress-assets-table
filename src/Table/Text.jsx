import React, {PropTypes, Component} from 'react';
import validation from '../utils/validation';
import toolbarConfig from './ckeditorToolbar';
import {block} from '../utils';

const b = block('e-table');

export default class TextCell extends Component {
  static propTypes = {
    cell: PropTypes.shape({
      data: PropTypes.shape({
        common: PropTypes.shape({
          text: PropTypes.string,
        })
      }),
      name: PropTypes.string,
      placeholder: PropTypes.string
    })
  };

  state = {
    focus: false,
    edit: false,
    charactersLeft: ''
  };

  componentDidUpdate() {
    if (this.state.edit && this.props.cell.config.ckeditor) {
      if (!CKEDITOR.instances[this.props.cell.name]) {
        this.editorInit();

        CKEDITOR.replace(this.props.cell.name, {
          on: {
            instanceReady: () => setTimeout(() => {
              const editor = CKEDITOR.instances[this.props.cell.name];
              editor.focus();
              this.setCharactersLeft(editor);
            })
          }
        });
      }
    }
  }

  setCharactersLeft = editor =>
    editor.container.setAttribute(
      'data-charactersLeft',
      this.props.cell.config.maxLen - editor.getData().length
    );

  handlerValidationCK = (e, editor) => {
    const isValid = validation({
      type: 'MAX_LENGTH',
      string: editor.getData(),
      maxLen: this.props.cell.config.maxLen,
      paste: e.clipboardData && e.clipboardData.getData('text/plain'),
      win: editor.window.$
    });

    if (!isValid) {
      e.preventDefault();
    }
  }

  handleClose = (editor) => {
    this.handlerEdit(false);
    this.handlerSave(editor.getData());
    editor.destroy();
  }

  editorInit = () =>
    CKEDITOR.once('instanceCreated', (event) => {
      const editor = event.editor;

      editor.on('contentDom', () => {
        editor.document.on('keyup', () => this.setCharactersLeft(editor));
        editor.document.on('keypress', e => this.handlerValidationCK(e.data.$, editor));
        editor.document.on('paste', e => this.handlerValidationCK(e.data.$, editor));
      });

      editor.on('blur', () => this.handleClose(editor));
      editor.on('mode', () => editor.focus());
      editor.on('configLoaded', () => {
        editor.config.toolbar = toolbarConfig;
        editor.config.resize_enabled = false;
      });
    });

  handlerFocus = focus => this.setState({focus});

  handlerEdit = (edit) => {
    const text = this.props.cell.data.common.text;
    this.setState({
      edit,
      charactersLeft: edit ?
        this.props.cell.config.maxLen - (text && text.length) : ''
    });
  }

  handlerSave = (text) => {
    if (text !== this.props.cell.data.common.text) {
      this.props.setData({
        id: this.props.cell.id,
        name: this.props.cell.name.replace(/-/g, '_'),
        field: 'text',
        text,
      });
    }
  }

  handlerSetCharactersLeft = e => this.setState({
    charactersLeft: this.props.cell.config.maxLen - e.target.innerText.length
  });

  handlerValidation = (e) => {
    const isValid = validation({
      type: 'MAX_LENGTH',
      string: e.target.innerText,
      maxLen: this.props.cell.config.maxLen,
      paste: e.clipboardData && e.clipboardData.getData('text/plain'),
    });

    if (!isValid) {
      e.preventDefault();
    }
  }

  render() {
    let text = null;

    if (this.props.cell.data.common.text || this.state.edit) {
      if (this.state.edit && this.props.cell.config.ckeditor) {
        text = (
          <textarea
            data-charactersLeft={this.state.charactersLeft}
            ref={elem => elem && elem.focus()}
            className={b('cell-text').is({edit: this.state.edit})}
            name={this.props.cell.name}
            id={this.props.cell.name}
            value={this.props.cell.data.common.text}
          />
        );
      } else {
        text = (
          <div
            data-charactersLeft={this.state.charactersLeft}
            ref={elem => elem && elem.focus()}
            className={b('cell-text').is({edit: this.state.edit})}
            contentEditable={this.state.edit}
            onBlur={(e) => {
              this.handlerEdit(false);
              this.handlerSave(e.target.innerText);
            }}
            onKeyUp={e => this.handlerSetCharactersLeft(e)}
            onKeyPress={e => this.handlerValidation(e)}
            onPaste={e => this.handlerValidation(e)}
            dangerouslySetInnerHTML={{__html: this.props.cell.data.common.text}}
          />
        );
      }
    } else {
      text = <div className={b('cell-placeholder')}>{this.props.cell.placeholder}</div>;
    }

    return (
      <td
        className={b('cell').mix(`is-${this.props.cell.name}`).is({focus: this.state.focus})}
        tabIndex={0}
        onClick={() => this.handlerFocus(true)}
        onBlur={() => this.handlerFocus(false)}
        onDoubleClick={() => this.handlerEdit(true)}
      >
        {text}
      </td>
    );
  }
}

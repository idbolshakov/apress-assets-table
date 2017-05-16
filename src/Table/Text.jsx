import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import RcDropdown from 'rc-dropdown';
import _isEqual from 'lodash/isEqual';
import validation from '../utils/validation';
import toolbarConfig from './ckeditorToolbar';
import {block} from '../utils';
import {
  startSeletion,
  startDrag,
  endDrag,
  endSeletion,
  selectionAdd,
  selectionAddTo,
  selectionRemoveTo,
  selectionRemove,
  startTextEdit,
  endTextEdit,
  setFocus} from './actions';

const b = block('e-table');

class TextCell extends Component {
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
    edit: false,
    visible: false,
    charactersLeft: ''
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
  }

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
    this.props.dispatch(endTextEdit());
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

  handlerEdit = (edit) => {
    edit ? this.props.dispatch(startTextEdit()) : this.props.dispatch(endTextEdit());
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
        name: this.props.cell.name,
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

  handleSelection = (e) => {
    e.preventDefault();
    if (this.props.isSelected && this.props.allow) {
      !this.props.selected ?
        this.props.dispatch(selectionAdd({id: this.props.cell.id})) :
        this.props.dispatch(selectionRemove({id: this.props.cell.id}));
    }
    if (this.props.isDragging && !this.props.selected && this.props.allow) {
      !this.props.selectedTo ?
        this.props.dispatch(selectionAddTo({id: this.props.cell.id})) :
        this.props.dispatch(selectionRemoveTo({id: this.props.cell.id}));
    }
  }

  handleStartSelection = () => {
    this.props.dispatch(startSeletion({name: this.props.cell.name, id: this.props.cell.id}));
  }

  handleMouseUp = () => {
    this.props.dispatch(endSeletion({name: this.props.cell.name, id: this.props.cell.id}));
    if (this.props.isDragging) {
      this.props.dispatch(endDrag({
        name: this.props.cell.name,
        id: this.props.cell.id,
        selectionData: this.props.selectionData
      }));
    }
  }

  handleDrag = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.dispatch(startDrag({name: this.props.cell.name, id: this.props.cell.id}));
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setTimeout(() => { this.handlerEdit(true); }, 100);
    }
    if (e.keyCode === 27) {
      this.handlerEdit(false);
    }
  }

  handleCellClick = () => {
    this.props.dispatch(setFocus({name: this.props.cell.name, id: this.props.cell.id}));
  }

  handleEditTextKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.handlerEdit(false);
      this.handlerSave(e.target.innerText);
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
        const value = this.props.cell.data.common.text ?
          this.props.cell.data.common.text.replace(/<.*?>/g, '') : this.props.cell.data.common.text;
        text = (
          <div
            data-charactersLeft={this.state.charactersLeft}
            ref={elem => elem && this.state.edit && elem.focus()}
            className={b('cell-text').is({edit: this.state.edit})}
            contentEditable={this.state.edit}
            onBlur={(e) => {
              this.handlerEdit(false);
              this.handlerSave(e.target.innerText);
            }}
            onKeyUp={e => this.handlerSetCharactersLeft(e)}
            onKeyPress={e => this.handlerValidation(e)}
            onKeyDown={this.handleEditTextKeyDown}
            onPaste={e => this.handlerValidation(e)}
            dangerouslySetInnerHTML={{__html: value}}
          />
        );
      }
    } else {
      text = <div className={b('cell-placeholder')}>{this.props.cell.placeholder}</div>;
    }

    return (
      <div
        ref={($td) => { $td && this.props.cell.isFocus && !this.state.edit && $td.focus(); }}
        className={b('cell').mix(`is-${this.props.cell.classMix}`)
          .is({
            focus: this.props.cell.isFocus,
            selected: this.props.selected,
            'selected-to': this.props.selectedTo,
          })
        }
        tabIndex={-1}
        onClick={this.handleCellClick}
        onDoubleClick={() => this.handlerEdit(true)}
        onKeyDown={this.handleKeyPress}
        onMouseEnter={this.handleSelection}
        onMouseDown={() => { this.handleStartSelection(); }}
        onMouseUp={() => { this.handleMouseUp(); }}
        onDragStart={e => e.preventDefault}
        onSelect={e => e.preventDefault}
      >
        {text}
        {this.props.isLast &&
          <div onMouseDown={this.handleDrag} className={b('drag-tool')} />
        }
        {!this.state.edit && this.props.cell.config.ckeditor &&
          this.props.cell.data.common.text &&
          <RcDropdown
            visible={this.state.visible}
            trigger={['hover']}
            overlay={
              <div className={b('preview')}>
                <div
                  className={b('preview-body')}
                  dangerouslySetInnerHTML={{__html: this.props.cell.data.common.text}}
                />
              </div>
            }
            onVisibleChange={(visible) => { this.setState({visible}); }}
            closeOnSelect={false}
          >
            <div className={b('cell-preview-icon')} />
          </RcDropdown>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const selected = state.selected;
  const focus = state.focus;
  return {
    selected: selected.name === ownProps.cell.name &&
      selected.ids.find(id => ownProps.cell.id === id),
    selectedTo: selected.name === ownProps.cell.name &&
      selected.idTo.find(id => ownProps.cell.id === id),
    isLast: selected.name === ownProps.cell.name &&
      selected.ids.slice(-1)[0] === ownProps.cell.id,
    isSelected: selected.isSelected,
    isDragging: selected.isDragging,
    selectionData: selected,
    allow: selected.name === ownProps.cell.name,
    focus: focus.activeRow === ownProps.cell.name && focus.activeCell === ownProps.cell.id
  };
};

export default connect(mapStateToProps)(TextCell);

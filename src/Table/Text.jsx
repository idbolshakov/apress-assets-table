import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RcDropdown from 'rc-dropdown';
import _isEqual from 'lodash/isEqual';
import validation from '../utils/validation';
import {block} from '../utils';
import {
  startTextEdit,
  endTextEdit,
} from './actions';
import {mapFocusProps} from './utils';


const b = block('e-table');

class TextCell extends Component {

  static propTypes = {
    cell: PropTypes.shape({
      classMix: PropTypes.string,
      config: PropTypes.object,
      data: PropTypes.shape({
        common: PropTypes.shape({
          text: PropTypes.string
        }),
        binder: PropTypes.object
      }),
      id: PropTypes.number,
      isDragged: PropTypes.bool,
      isFocus: PropTypes.bool,
      isLast: PropTypes.bool,
      isSelected: PropTypes.bool,
      name: PropTypes.string,
      placeholder: PropTypes.string
    }),
    handleCellClick: PropTypes.func,
    handleSelection: PropTypes.func,
    handleStartSelection: PropTypes.func,
    handleEndSelection: PropTypes.func,
    handleDrag: PropTypes.func
  };

  static defaultProps = {
    cell: {
      data: {
        common: {
          text: ''
        }
      }
    }
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
    const {name, config} = this.props.cell;
    if (this.state.edit && config.ckeditor) {
      if (!CKEDITOR.instances[name]) {
        this.editorInit();

        CKEDITOR.replace(name, {
          on: {
            instanceReady: () => setTimeout(() => {
              const editor = CKEDITOR.instances[name];
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
  };

  handleClose = (editor) => {
    this.props.endTextEdit();
    this.handlerEdit(false);
    this.handlerSave(editor.getData());
    editor.destroy();
  };

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
        editor.config.toolbar = app.config.ckeditor.toolbarTiger;
        editor.config.resize_enabled = false;
      });
    });

  handlerEdit = (edit) => {
    edit ? this.props.startTextEdit() : this.props.endTextEdit();
    const text = this.props.cell.data.common.text;
    this.setState({
      edit,
      charactersLeft: edit ?
        this.props.cell.config.maxLen - (text && text.length) : ''
    });
  };

  handlerSave = (text) => {
    const {setData, cell} = this.props;
    const {data, id, name} = cell;
    if (text !== data.common.text) {
      setData({id, name, field: 'text', text});
    }
  };

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
  };

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setTimeout(() => { this.handlerEdit(true); }, 100);
    }
    if (e.keyCode === 27) {
      this.handlerEdit(false);
    }
  };

  handleEditTextKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.handlerEdit(false);
      this.handlerSave(e.target.innerText);
    }
  };

  render() {
    const {cell, handleCellClick, handleSelection, handleStartSelection, handleEndSelection, handleDrag} = this.props;
    const {config, data, name, placeholder, isFocus, classMix, isSelected, isDragged, isLast} = cell;
    const cellText = data.common.text;
    const binder = data.binder;

    let text = null;
    if (cellText || this.state.edit) {
      if (this.state.edit && config.ckeditor) {
        text = (
          <textarea
            data-charactersLeft={this.state.charactersLeft}
            ref={elem => elem && elem.focus()}
            className={b('cell-text').is({edit: this.state.edit})}
            name={name}
            id={name}
            value={cellText}
          />
        );
      } else {
        const value = cellText ? cellText.replace(/<.*?>/g, '') : cellText;
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
      text = <div className={b('cell-placeholder')}>{placeholder}</div>;
    }

    return (
      <div
        ref={($td) => { $td && isFocus && !this.state.edit && $td.focus(); }}
        className={b('cell').mix(`is-${classMix}`)
          .is({
            focus: isFocus,
            selected: isSelected,
            'selected-to': isDragged,
            required: config.required && !cellText && !this.state.edit
          })
        }
        tabIndex={-1}
        onClick={binder && handleCellClick}
        onDoubleClick={() => binder && this.handlerEdit(true)}
        onKeyDown={binder && this.handleKeyPress}
        onMouseEnter={binder && handleSelection}
        onMouseDown={binder && handleStartSelection}
        onMouseUp={binder && handleEndSelection}
        onDragStart={e => e.preventDefault}
        onSelect={e => e.preventDefault}
      >
        {text}
        {isLast && binder &&
          <div onMouseDown={handleDrag} className={b('drag-tool')} />
        }
        {!this.state.edit && config.ckeditor && cellText &&
          <RcDropdown
            visible={this.state.visible}
            trigger={['hover']}
            overlay={
              <div className={b('preview')}>
                <div
                  className={b('preview-body')}
                  dangerouslySetInnerHTML={{__html: cellText}}
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
  const focus = state.table.focus;
  return {
    ...mapFocusProps(focus, ownProps),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  startTextEdit,
  endTextEdit,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TextCell);

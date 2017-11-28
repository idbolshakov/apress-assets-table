import React, {Component} from 'react';

import {textCellEditorPropType} from '../../../propTypes';
import {block} from '../../../utils';


const b = block('e-table');

class TextCellEditor extends Component {
  constructor(props) {
    super();

    this.state = {
      charactersLeft: this.getCharectersCountLeft(props.text, props)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isEdit !== nextProps.isEdit) {
      this.setCharactersCountLeft(nextProps.text, nextProps);
    }
  }

  getCharectersCountLeft = (text, props) => (
    props.isEdit ? props.maxLen - text.length : ''
  );

  getEventHandlers = () => {
    if (!this.props.isEdit) {
      return {};
    }

    return {
      onBlur: e => this.save(e.target.textContent),
      onKeyDown: e => this.handleKeyDown(e),
      onKeyPress: e => this.handleKeyPress(e),
      onKeyUp: e => this.setCharactersCountLeft(e.target.textContent, this.props),
      onPaste: e => this.handlePaste(e)
    };
  };

  setCharactersCountLeft = (text, props) => {
    this.setState({
      charactersLeft: this.getCharectersCountLeft(text, props)
    });
  };

  save = (text) => {
    this.props.handlerEdit(false);
    this.props.handlerSave(text);
  };

  paste = (e) => {
    const text = e.target.textContent;
    const paste = e.clipboardData.getData('text/plain');

    if (paste) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const cursorPos = range.startOffset;
      const extraCharacters = (text.length + paste.length) - this.props.maxLen;
      const pasteLen = extraCharacters > 0 ? paste.length - extraCharacters : paste.length;

      e.target.textContent = text.substring(0, cursorPos) + paste.substr(0, pasteLen) + text.substring(cursorPos);
      range.startContainer.firstChild && range.setStart(range.startContainer.firstChild, cursorPos + pasteLen);
    }
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.save(e.target.textContent);
    }
  };

  handleKeyPress = (e) => {
    if (e.target.textContent.length >= this.props.maxLen) {
      e.preventDefault();
    }
  };

  handlePaste = (e) => {
    const text = e.target.textContent;
    const maxLen = this.props.maxLen;

    e.preventDefault();
    if (text.length < maxLen) {
      this.paste(e);
    }
  };

  render() {
    const {text, isEdit} = this.props;
    const textWithoutTags = text.replace(/<.*?>/g, '');

    return (
      <div
        data-charactersLeft={this.state.charactersLeft}
        ref={elem => elem && isEdit && elem.focus()}
        className={b('cell-text').is({edit: isEdit})}
        contentEditable={isEdit}
        dangerouslySetInnerHTML={{__html: textWithoutTags}}
        {...this.getEventHandlers()}
      />
    );
  }
}

TextCellEditor.propTypes = textCellEditorPropType.isRequired;

TextCellEditor.defaultProps = {
  text: ''
};

export default TextCellEditor;

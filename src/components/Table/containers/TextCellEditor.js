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

  getClipboardText = (clipboardData) => {
    let paste;

    if (window.clipboardData) {
      paste = window.clipboardData.getData('Text');
    } else {
      paste = clipboardData.getData('text/plain');
    }

    return paste.replace(/\r|\n/g, '');
  };

  getTextWithoutSelection = (range) => {
    const textContent = range.startContainer.textContent;

    return textContent.substring(0, range.startOffset) +
        textContent.substring(range.endOffset, textContent.length);
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

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.save(e.target.textContent);
    }
  };

  handleKeyPress = (e) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const textWithoutSelection = this.getTextWithoutSelection(range);

    if (textWithoutSelection.length >= this.props.maxLen) {
      e.preventDefault();
    }
  };

  handlePaste = (e) => {
    const paste = this.getClipboardText(e.clipboardData);

    e.preventDefault();
    if (paste) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const textWithoutSelection = this.getTextWithoutSelection(range);

      if (textWithoutSelection.length < this.props.maxLen) {
        const extraCharacters = (textWithoutSelection.length + paste.length) - this.props.maxLen;
        const pasteLen = extraCharacters > 0 ? paste.length - extraCharacters : paste.length;
        const cursorPos = range.startOffset;

        e.target.textContent = textWithoutSelection.substring(0, cursorPos) +
          paste.substr(0, pasteLen) + textWithoutSelection.substring(cursorPos);

        setTimeout(() => {
          range.setStart(range.startContainer.firstChild || range.startContainer, cursorPos + pasteLen);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        });

        this.setCharactersCountLeft(e.target.textContent, this.props);
      }
    }
  };

  render() {
    const {text, isEdit} = this.props;
    const textWithoutTags = text.replace(/<.*?>/g, '');

    return (
      <div
        data-charactersLeft={this.state.charactersLeft}
        className={b('cell-text').is({edit: isEdit})}
      >
        <div
          ref={elem => elem && isEdit && elem.focus()}
          contentEditable={isEdit}
          dangerouslySetInnerHTML={{__html: textWithoutTags}}
          {...this.getEventHandlers()}
        />
      </div>
    );
  }
}

TextCellEditor.propTypes = textCellEditorPropType.isRequired;

TextCellEditor.defaultProps = {
  text: ''
};

export default TextCellEditor;

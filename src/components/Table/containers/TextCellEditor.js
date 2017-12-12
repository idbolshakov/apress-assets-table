import React, {Component} from 'react';

import {textCellEditorPropType} from '../../../propTypes';
import {block} from '../../../utils';


const b = block('e-table');

class TextCellEditor extends Component {
  constructor(props) {
    super();

    this.state = {
      value: this.getValidValue(props.text)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: this.getValidValue(nextProps.text)
    });
  }

  getCharactersCountLeft = () => (
    this.props.isEdit ? this.props.maxLen - this.state.value.length : ''
  );

  getEventHandlers = () => {
    if (!this.props.isEdit) {
      return {};
    }

    return {
      onBlur: () => this.save(),
      onKeyDown: e => this.handleKeyDown(e),
      onInput: e => this.handleInput(e)
    };
  };

  getValidValue = value => (
    value.replace(/\n/g, ' ').replace(/<.*?>/g, '')
  );

  save = () => {
    this.props.handlerEdit(false);
    this.props.handlerSave(this.state.value);
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.save();
    }
  };

  handleInput = (e) => {
    this.setState({value: e.currentTarget.value});
  };

  render() {
    const {isEdit, maxLen} = this.props;

    return (
      <div
        data-charactersLeft={this.getCharactersCountLeft()}
        className={b('cell-text').is({edit: isEdit})}
      >
        <textarea
          ref={elem => elem && isEdit && elem.focus()}
          maxLength={maxLen}
          readOnly={!isEdit}
          value={this.state.value}
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

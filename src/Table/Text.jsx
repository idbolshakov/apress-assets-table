import React, {PropTypes, Component} from 'react';
import validation from '../utils/validation';
import {block} from '../utils';

const b = block('e-table');

export default class PathCell extends Component {
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
      paste: e.clipboardData && e.clipboardData.getData('text/plain')
    });

    if (!isValid) {
      e.preventDefault();
    }
  }

  render() {
    let text = null;

    if (this.props.cell.data.common.text || this.state.edit) {
      text = (
        <div
          data-charactersLeft={this.state.charactersLeft}
          ref={elem => elem && elem.focus()}
          className={b('cell-text').is({focus: this.state.focus, edit: this.state.edit})}
          contentEditable={this.state.edit}
          onBlur={(e) => {
            this.handlerEdit(false);
            this.handlerSave(e.target.innerText);
          }}
          onKeyUp={e => this.handlerSetCharactersLeft(e)}
          onKeyPress={e => this.handlerValidation(e)}
          onPaste={e => this.handlerValidation(e)}
        >
          {this.props.cell.data.common.text}
        </div>
      );
    } else {
      text = <div className={b('cell-placeholder')}>{this.props.cell.placeholder}</div>;
    }

    return (
      <td
        className={b('cell').mix(`is-${this.props.cell.name}`).is({edit: this.state.edit})}
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

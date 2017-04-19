import React from 'react';
import {block} from '../utils';

const b = block('e-help');

export default class HelpItem extends React.Component {
  state = {
    open: false
  }

  handlerClick = () => this.setState({open: !this.state.open})

  render() {
    return (
      <div className={b('container')}>
        <a
          className={b('title')}
          onClick={this.handlerClick}
        >
          {this.props.title}
        </a>
        <div
          className={b('text').is({open: this.state.open})}
          dangerouslySetInnerHTML={{__html: this.props.content}}
        />
      </div>
    );
  }
}

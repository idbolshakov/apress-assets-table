import React from 'react';
import Toggler from './Toggler';

export default class App extends React.Component {

  state = {togglerActive: false};

  switchToggler = () => {
    this.setState({
      togglerActive: !this.state.togglerActive,
    });
  }

  render() {
    return (
      <div styles={{marginBottom: 20}}>
        <h3>Toggler:</h3>
        <Toggler on={this.state.togglerActive} onToggle={this.switchToggler} />
      </div>
    );
  }
}

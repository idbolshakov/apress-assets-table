import React from 'react';
import Header from './Header';

export default class App extends React.Component {

  state = {togglerActive: false};

  switchToggler = () => {
    this.setState({
      togglerActive: !this.state.togglerActive,
    });
  }

  render() {
    return (
      <div>
        <Header
          instructionHref='/about/questions/editor'
          toSiteHref='/catalog'
          toggler={this.state.togglerActive}
          onToggle={this.switchToggler}
          selectedGroupsCount={33}
          onCallProductsAndGroups={() => { console.log('вызов модальника'); }}
          onDeleteSelectedGroup={() => { console.log('Удалить выбранную группу'); }}
          onDeleteEmptyGroup={() => { console.log('Удалить пустые группы'); }}
        />
        <Header
          onCallProductsAndGroups={() => { console.log('вызов модальника'); }}
        />
      </div>
    );
  }
}

/* eslint no-console: 0 */
import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {
  showRemoveEmptyRowsConfirmation,
  showMassRemoveConfirmation,
} from '../dialogs/actions';

class HeaderExample extends React.Component {
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
          onDeleteSelectedGroup={() => {
            this.props.dispatch(showMassRemoveConfirmation());
          }}
          onDeleteEmptyGroup={() => {
            this.props.dispatch(showRemoveEmptyRowsConfirmation());
          }}
        />
        <Header
          instructionHref='/about/questions/editor'
          toSiteHref='/catalog'
          onCallProductsAndGroups={() => { console.log('вызов модальника'); }}
        />
      </div>
    );
  }
}


export default connect()(HeaderExample);

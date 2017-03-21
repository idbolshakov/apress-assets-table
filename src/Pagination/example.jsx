/* eslint no-console: 0 */
import React from 'react';
import Pagination from './Pagination';

export default class PaginationExample extends React.Component {

  state = {
    activePage: 3
  };

  handleSelect = (number) => {
    console.log(`change page - ${number}`);
    this.setState({
      activePage: number
    });
  }

  render() {
    return (
      <div>
        <h3>Pagination:</h3>
        <div>
          <Pagination
            items={5}
            onSelect={this.handleSelect}
            activePage={this.state.activePage}
          />
        </div>
        <br />
        <Pagination
          mix='mixed-class other-class'
          items={145}
          onSelect={this.handleSelect}
          activePage={this.state.activePage}
        />
      </div>
    );
  }
}

import React from 'react';
import Tree from './Tree';

export default class App extends React.Component {
  render() {
    return (
      <Tree
        tree={this.props.tree}
        actions={this.props.actions}
      />
    );
  }
}

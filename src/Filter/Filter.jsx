import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export default class Filter extends Component {
  componentDidUpdate() {
    if (!this.props.save.isSave && !this.props.save.isProgress) {
      if (this.props.config.isChange) {
        const query = {};

        Object.keys(this.props.config.params)
          .forEach((key) => { query[key] = JSON.stringify(this.props.config.params[key]); });

        this.props.updateTable();
        this.props.updateTree();

        browserHistory.push({
          pathname: browserHistory.getCurrentLocation().pathname,
          query
        });

        this.props.noChange();
      }
    }
  }

  render() {
    return <div style={{display: 'none'}} />;
  }
}

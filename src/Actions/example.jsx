/* eslint no-console: 0 */
/* eslint no-alert: 0 */
import React from 'react';
import Actions from './Actions';

export default class ActionsExample extends React.Component {

  render() {
    return (
      <div className='example-wrapper'>
        <Actions
          onAdd={(e) => { console.log('action add', e); }}
          onCopy={(e) => { console.log('action copy', e); }}
          onRemove={(e) => { console.log('action remove', e); }}
        />
      </div>
    );
  }
}

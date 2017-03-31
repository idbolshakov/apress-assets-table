/* eslint no-console: 0 */
/* eslint no-alert: 0 */
import React from 'react';
import Actions from './Actions';

export default class ActionsExample extends React.Component {

  render() {
    return (
      <div className='example-wrapper'>
        <Actions
          actions={[
            {
              name: 'add',
              title: 'Добавить',
              onClick: (e) => { console.log('action add', e); }
            },
            {
              name: 'copy',
              title: 'Копировать',
              onClick: (e) => { console.log('action copy', e); }
            },
            {
              name: 'delete',
              title: 'Удалить',
              onClick: (e) => { console.log('action remove', e); }
            },
          ]}
        />
      </div>
    );
  }
}

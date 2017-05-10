/* eslint react/no-unused-prop-types: 0 */
import React, {PropTypes} from 'react';
import {block} from '../utils';
import Scroller from '../Scroller/Scroller';
import './e-actions-panel.scss';

const b = block('e-actions-panel');

const filterTitle = {
  with: 'заполнено',
  without: 'не заполнено',
};

const ActionsPanel = props =>
  <div className={b.mix(props.mix)}>
    <div className={b('container')}>
      <section className={b('section-1')}>
        <div className={b('scroll-box')}>
          {props.children}
        </div>
      </section>
      <section className={b('section-2')}>
        <div className={b('last-actions-box')}>
          <span className={b('last-actions-label')}>Последние действия:</span>
          <button
            type='button'
            title='Отменить'
            onClick={(e) => { props.backHistory && props.onActionBack(e); }}
            className={b('button').is({back: true, active: props.backHistory})}
          />
          <button
            type='button'
            title='Вернуть'
            onClick={(e) => { props.nextHistory && props.onActionNext(e); }}
            className={b('button').is({next: true, active: props.nextHistory})}
          />
        </div>
        <div className={b('filter-box')}>
          <span className={b('filter-title')}>Установлены фильтры:</span>
          <div className={b('scroll-box')}>
            <Scroller wrapped >
              {props.columns && props.columns
                .filter(col => col.filter && col.filter.value && col.filter.value !== 'all')
                .map(col =>
                  <span
                    key={col.name}
                    className={b('filter-item')}
                    onClick={() => props.onRemoveFilter({id: 'all', name: col.name})}
                    title='Убрать'
                  >
                    {`${col.title} - ${filterTitle[col.filter.value]}`}
                  </span>
                )
              }
            </Scroller>
          </div>
        </div>
      </section>
    </div>
  </div>;

ActionsPanel.propTypes = {
  mix: PropTypes.string,
  filters: PropTypes.array,
  nextHistory: PropTypes.bool,
  backHistory: PropTypes.bool,
  onActionBack: PropTypes.func,
  onActionNext: PropTypes.func,
  onRemoveFilter: PropTypes.func,
};

ActionsPanel.defaultProps = {
  mix: '',
  filters: [],
};

export default ActionsPanel;

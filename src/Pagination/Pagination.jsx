import React, {PropTypes} from 'react';
import {Option} from 'rc-select';
import {block} from '../utils';
import Select from '../ComboSelect/ComboSelect';

import './e-pagination.scss';

const b = block('e-pagination');

const Pagination = (props) => {
  const nextIsDisabled = props.activePage >= props.items;
  const prevIsDisabled = props.activePage === 1;
  const handleDicrement = (e) => { !prevIsDisabled && props.onSelect({page: props.activePage - 1}, e); };
  const handleIncrement = (e) => { !nextIsDisabled && props.onSelect({page: props.activePage + 1}, e); };
  const options = [];
  for (let page = 1; page <= props.items; ++page) {
    options.push(<Option key={page} text={page}>{page}</Option>);
  }
  return (
    <div className={b.mix(props.mix)}>
      <span
        onClick={handleDicrement}
        className={b('prev').is({disabled: prevIsDisabled})}
      >
        Назад
      </span>
      <span>Страница:</span>
      <div className={b('select-count')}>
        <Select
          value={`${props.activePage}`}
          showSearch={false}
          style={{width: 52}}
          onChange={(val) => { props.onSelect({page: Number(val)}); }}
          dropdownAlign={{points: ['tc', 'bc']}}
          dropdownMenuStyle={{width: 85}}
        >
          {options}
        </Select>
      </div>
      <span className={b('total')}>  из {props.items}</span>
      <span
        onClick={handleIncrement}
        className={b('next').is({disabled: nextIsDisabled})}
      >
        Вперед
      </span>
    </div>
  );
};

Pagination.propTypes = {
  items: PropTypes.number.isRequired,
  activePage: PropTypes.number,
  mix: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  activePage: 1,
  mix: '',
};

export default Pagination;

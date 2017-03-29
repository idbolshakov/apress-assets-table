/* eslint no-console: 0 */
/* eslint no-alert: 0 */
/* eslint-disable */
import React from 'react';
import DropDown from './DropDown';
import Select, {Option, OptGroup} from 'rc-select';

export default class DropDownExample extends React.Component {

  render() {
    return (
      <div>
        <DropDown />
        <span>Описание группы</span>
        <div className="e-drop-down">
          <Select
            optionLabelProp="oaksdoaskdopkas"
            dropdownMenuStyle={{width: 302}}
            >
              <Option value="1">Все(24)</Option>
              <Option value="2">Прописан (18)</Option>
              <Option value="3">Не заполнен</Option>
            </Select>
        </div>
      </div>
    );
  }
}

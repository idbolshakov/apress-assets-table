/* eslint no-console: 0 */
import React from 'react';
import {Option} from 'rc-select';
import 'rc-select/assets/index.css';
import './e-select.scss';
import ComboSelect from './ComboSelect';


class ComboSelectExample extends React.Component {
  state = {
    destroy: false,
    value: String(9),
  }

  onChange = (e) => {
    let value;
    if (e && e.target) {
      value = e.target.value;
    } else {
      value = e;
    }
    console.log('onChange', value);
    this.setState({
      value,
    });
  }

  onDestroy = () => {
    this.setState({
      destroy: 1,
    });
  }

  onBlur = (v) => {
    console.log('onBlur', v);
  }

  onFocus = () => {
    console.log('onFocus');
  }

  render() {
    if (this.state.destroy) {
      return null;
    }
    return (
      <div>

        <h3>
          ComboSelect: Based on: {' '}
          <a
            rel='noreferrer noopener' target='_blank'
            href='https://github.com/react-component/select'
          >
          rc-select
        </a>
        </h3>

        <ComboSelect
          value={this.state.value}
          placeholder='placeholder'
          dropdownMenuStyle={{maxHeight: 200, overflow: 'auto'}}
          style={{width: 85}}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
            // optionLabelProp="children"
            // optionFilterProp="text"
          onChange={this.onChange}
          showSearch={false}
        >
          <Option value='01' text='jack' title='jack'>
            <b
              style={{
                color: 'red',
              }}
            >
                jack
              </b>
          </Option>
          <Option value='11' text='lucy'>lucy</Option>
          <Option value='21' disabled text='disabled'>disabled</Option>
          <Option value='31' text='yiminghe'>yiminghe</Option>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <Option key={i} text={String(i)}>{i}</Option>)}
        </ComboSelect>
        {' '}
        <ComboSelect
          placeholder='Сделай выбор'
          // dropdownMenuStyle={{maxHeight: 200, overflow: 'auto'}}
          value={this.state.value}
          style={{width: 155}}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={this.onChange}
        >
          <Option value='01' text='jack' title='jack'>
            <b
              style={{
                color: 'red',
              }}
            >
              jack
            </b>
          </Option>
          <Option value='11' text='lucy'>lucy</Option>
          <Option value='21' disabled text='disabled'>disabled</Option>
          <Option value='31' text='yiminghe'>yiminghead</Option>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <Option key={i} text={String(i)}>{i}</Option>)}
        </ComboSelect>
        <p>
          <button onClick={this.onDestroy}>destroy</button>
        </p>
      </div>
    );
  }
}

export default ComboSelectExample;

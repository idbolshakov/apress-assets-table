import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Trigger from 'rc-trigger';
import 'rc-trigger/assets/index.css';
import Text from './Text';
import Check from './Check';
import Image from './Image';
import Path from './Path';
import {block} from '../utils';
import Actions from '../Actions/Actions';


const b = block('e-table');

const Cell = ({row, props}, cell, index) => {
  const dataRow = {
    id: row.check.common.id,
    data: row[cell],
    name: cell,
    classMix: cell.replace(/_/g, '-'),
    placeholder: props.placeholder[cell],
    config: props.config[cell],
    isFocus: row.check.common.id === props.focused.activeRow && cell === props.focused.activeCell,
  };

  const componentsCell = {
    text: <Text key={index} cell={dataRow} setData={props.actions.setText} />,
    check: <Check
      key={index}
      cell={dataRow}
      setCheck={props.actions.setCheck}
      checked={props.table.checked.includes(row.check.common.id)}
    />,
    img: <Image key={index} cell={dataRow} />,
    path: <Path key={index} cell={dataRow} />,
  };

  return componentsCell[props.config[cell].type];
};

const Row = (props, row) =>
  <Trigger
    key={row.check.common.id}
    action={['hover']}
    popup={<Actions
      mix={b('actions')()}
      actions={[
        {
          name: 'add',
          title: 'Добавить',
          onClick: () => { props.actions.addNewRow({id: row.check.common.id}); }
        },
        {
          name: 'copy',
          title: 'Копировать',
          onClick: () => { props.actions.copyRow({id: row.check.common.id}); }
        },
        {
          name: 'delete',
          title: 'Удалить',
          onClick: () => { props.actions.removeRow({id: row.check.common.id}); }
        },
      ]}
    />}
    popupAlign={{
      points: ['cl', 'cl'],
      destroyPopupOnHide: true,
      offset: [-12 + props.scrollLeft, 0],
      overflow: {
        adjustX: false,
        adjustY: false,
      },
    }}
  >
    <tr key={row.check.common.id} className={b('body-tr')}>
      {Object.keys(row).map(Cell.bind({}, {row, props}))}
    </tr>
  </Trigger>
  ;

const Body = props =>
  <tbody className={b('body')}>
    {props.table.rows.map(Row.bind({}, props))}
  </tbody>;

Body.propTypes = {
  table: PropTypes.object,
};


const mapStateToProps = state => ({focused: state.focus});

export default connect(mapStateToProps)(Body);

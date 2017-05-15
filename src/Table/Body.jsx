import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Trigger from 'rc-trigger';
import _isEqual from 'lodash/isEqual';
import 'rc-trigger/assets/index.css';
import Text from './Text';
import Check from './Check';
import Image from './Image';
import Path from './Path';
import {block} from '../utils';
import Actions from '../Actions/Actions';
import {showRemoveConfirmation} from '../dialogs/actions';


const b = block('e-table');

class Body extends React.Component {
  static propTypes= {
    table: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  renderCell = (row, cell, index, props = this.props) => {
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

  renderRow = (row, props = this.props) =>
    <Trigger
      key={row.check.common.id}
      action={['hover']}
      popup={<Actions
        mix={b('actions')()}
        actions={[
          {
            name: 'add',
            title: 'Добавить',
            onClick: () => props.actions.addNewRow({
              target: row,
              new_row: props.table.new_row
            })
          },
          {
            name: 'copy',
            title: 'Копировать',
            onClick: () => { props.actions.copyRow({id: row.check.common.id}); }
          },
          {
            name: 'delete',
            title: 'Удалить',
            onClick: () => { props.dispatch(showRemoveConfirmation({id: row.check.common.id})); }
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
      <div
        key={row.check.common.id}
        className={b('body-tr').is({
          checked: props.table.checked.includes(row.check.common.id),
          new: String(row.check.common.id).includes('-')
        })}
      >
        {Object.keys(row).map((cell, index) => this.renderCell(row, cell, index))}
      </div>
    </Trigger>;

  render() {
    return (
      <div className={b('body')}>
        {this.props.table.rows.map(row => this.renderRow(row))}
      </div>
    );
  }
}

const mapStateToProps = state => ({focused: state.focus});

export default connect(mapStateToProps)(Body);

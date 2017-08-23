import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Trigger from 'rc-trigger';
import _isEqual from 'lodash/isEqual';
import 'rc-trigger/assets/index.css';
import Text from './Text';
import Check from './Check';
import Image from './Image';
import Path from './Path';
import Price from './Price';
import Exists from './Exists';
import CheckRelatedProducts from './CheckRelatedProducts';
import {block} from '../utils';
import Actions from '../Actions/Actions';
import * as remove from '../remove/actions';

const b = block('e-table');

class Body extends React.Component {
  static propTypes= {
    table: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  renderCell = (row, rowId, cell, index, props = this.props) => {
    const dataRow = {
      id: rowId,
      data: row[cell],
      name: cell,
      classMix: cell.replace(/_/g, '-'),
      placeholder: props.placeholder[cell],
      config: props.config[cell],
      isFocus: rowId === props.focused.activeRow && cell === props.focused.activeCell,
    };

    const componentsCell = {
      text: <Text key={index} cell={dataRow} setData={props.actions.setText} />,
      check: <Check
        key={index}
        cell={dataRow}
        setCheck={props.actions.setCheck}
        checked={props.table.checked.includes(rowId)}
      />,
      img: <Image key={index} cell={dataRow} />,
      path: <Path key={index} cell={dataRow} />,
      price: <Price key={index} cell={dataRow} />,
      exists: <Exists key={index} cell={dataRow} />,
      check_related_products: <CheckRelatedProducts
        key={index}
        cell={dataRow}
        actions={this.props.actions.relatedProducts}
      />
    };

    return componentsCell[props.config[cell].type];
  };

  renderRow = (row, props = this.props) => {
    const rowId = row.check ? row.check.common.id : row.check_related_products.common.id;
    const rowHtml = (
      <div
        key={rowId}
        className={b('body-tr').is({
          checked: props.table.checked.includes(rowId),
          new: String(rowId).includes('-')
        })}
      >
        {Object.keys(row).map((cell, index) => this.renderCell(row, rowId, cell, index))}
      </div>
    );

    return props.readonly ? (rowHtml) : (
      <Trigger
        key={rowId}
        action={['hover']}
        popup={<Actions
          mix={b('actions')()}
          actions={[
            {
              name: 'add',
              title: 'Добавить группу',
              onClick: () => props.actions.addNewRow({
                target: row,
                parent: row,
                new_row: props.table.new_row
              })
            },
            {
              name: 'delete',
              title: 'Удалить группу',
              onClick: () => {
                props.dispatch(remove.removeGroup({
                  id: rowId,
                  name: row.name.common.text,
                }));
              }
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
        {rowHtml}
      </Trigger>
    );
  }

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

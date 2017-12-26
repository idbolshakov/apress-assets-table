import {getStateSetter, mockGroupsRequest} from '../../../../test/testUtils';
import tableData from '../../../../_mock/table/data.json';
import historyReducer from '../../reducers/history';
import rowReducer from '../../rowReducer';
import * as tableActions from '../../actions';

describe('historyReducer', () => {
  const initialState = {
    prev: [],
    next: [],
    current: [],
  };
  const setState = getStateSetter(initialState);
  const freezedInitialState = setState();

  describe('TABLE_EDITOR_ROW_COPY_SUCCESS', () => {
    const copyRowId = 45496;
    const copyRowsRequestPayload = {rows: [{id: copyRowId, copy: true}]};
    const copiedRows = mockGroupsRequest(copyRowsRequestPayload);

    it('should not add a group if there is no group from which it was copied', () => {
      expect(historyReducer(
        freezedInitialState,
        tableActions.copyRowSuccess({rows: copiedRows.payload, new_row: tableData.new_row})
      )).toEqual(initialState);
    });

    it('should add copied groups', () => {
      const expectedCurrent = [...tableData.rows];
      const copyRowIndex = tableData.rows.findIndex(row => row.check.common.id === copyRowId);

      expectedCurrent.splice(copyRowIndex + 1, 0, tableData.rows[copyRowIndex]);
      expect(historyReducer(
        setState({current: tableData.rows}),
        tableActions.copyRowSuccess({rows: copiedRows.payload, new_row: tableData.new_row})
      )).toEqual({
        ...initialState,
        current: expectedCurrent
      });
    });

    it('should delete the users activity history', () => {
      const history = [[], [], []];

      expect(historyReducer(
        setState({
          prev: history,
          next: history
        }),
        tableActions.copyRowSuccess({rows: copiedRows.payload, new_row: tableData.new_row})
      )).toEqual(initialState);
    });
  });

  it('should handle UPDATE_TABLE_EDITOR_ROWS', () => {
    const updateRowsRequestPayload = {rows: [{id: 45496, columns: {name: {text: 'updated text'}}}]};
    const updatedRows = mockGroupsRequest(updateRowsRequestPayload);
    const action = tableActions.updateTableEditorRows({rows: updatedRows.payload, new_row: tableData.new_row});

    expect(historyReducer(
      setState({current: tableData.rows}),
      action
    )).toEqual({
      ...initialState,
      current: rowReducer(tableData.rows, action)
    });
  });
});
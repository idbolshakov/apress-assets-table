import deepFreeze from 'deep-freeze';
import {mockGroupsRequest, getStateSetter} from '../../../test/testUtils';
import tableData from '../../../_mock/table/data.json';
import rowReducer from '../rowReducer';
import * as tableActions from '../actions';

describe('rowReducer', () => {
  const setState = getStateSetter([]);

  describe('TABLE_EDITOR_ROW_COPY_SUCCESS', () => {
    const copyRowId = 45496;
    const copyRowsRequestPayload = {rows: [{id: copyRowId, copy: true}]};
    const copiedRows = mockGroupsRequest(copyRowsRequestPayload);

    it('should not add a group if there is no group from which it was copied', () => {
      expect(rowReducer(
        setState(),
        tableActions.copyRowSuccess({rows: copiedRows.payload, new_row: tableData.new_row})
      )).toEqual([]);
    });

    it('should add copied groups', () => {
      const expectedCurrent = [...tableData.rows];
      const copyRowIndex = tableData.rows.findIndex(row => row.check.common.id === copyRowId);

      expectedCurrent.splice(copyRowIndex + 1, 0, tableData.rows[copyRowIndex]);
      expect(rowReducer(
        setState(tableData.rows),
        tableActions.copyRowSuccess({rows: copiedRows.payload, new_row: tableData.new_row})
      )).toEqual(expectedCurrent);
    });
  });

  describe('UPDATE_TABLE_EDITOR_ROWS', () => {
    const updateRowId = 45496;
    const updatedText = 'updated text';
    const updateRowsRequestPayload = {rows: [{id: updateRowId, columns: {name: {text: updatedText}}}]};
    const updatedRows = mockGroupsRequest(updateRowsRequestPayload);

    it('should not update a group if this group does not exist', () => {
      expect(rowReducer(
        setState(),
        tableActions.updateTableEditorRows({rows: updatedRows.payload, new_row: tableData.new_row})
      )).toEqual([]);
    });

    it('should update group', () => {
      const expectedRows = [...tableData.rows];
      const rowIndex = tableData.rows.findIndex(row => row.check.common.id === updateRowId);
      const originalRow = tableData.rows[rowIndex];
      const updatedRow = {
        ...originalRow,
        name: {
          ...originalRow.name,
          common: {text: updatedText}
        }
      };

      expectedRows[rowIndex] = updatedRow;
      expect(rowReducer(
        setState(tableData.rows),
        tableActions.updateTableEditorRows({rows: updatedRows.payload, new_row: tableData.new_row})
      )).toEqual(expectedRows);
    });
  });
});

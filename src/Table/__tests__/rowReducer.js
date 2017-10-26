import deepFreeze from 'deep-freeze';
import {mockGroupsRequest} from '../../../test/testUtils';
import tableData from '../../../_mock/table/data.json';
import rowReducer from '../rowReducer';
import * as tableActions from '../actions';

describe('rowReducer', () => {
  describe('TABLE_EDITOR_ROW_COPY_SUCCESS', () => {
    const copyRowId = 45496;
    const copyRowsRequestPayload = {rows: [{id: copyRowId, copy: true}]};
    const copiedRows = mockGroupsRequest(copyRowsRequestPayload);

    it('should not add a group if there is no group from which it was copied', () => {
      expect(rowReducer(
        deepFreeze([]),
        tableActions.copyRowSuccess({rows: copiedRows.payload, new_row: tableData.new_row})
      )).toEqual([]);
    });

    it('should add copied groups', () => {
      const expectedCurrent = [...tableData.rows];
      const copyRowIndex = tableData.rows.findIndex(row => row.check.common.id === copyRowId);

      expectedCurrent.splice(copyRowIndex + 1, 0, tableData.rows[copyRowIndex]);
      expect(rowReducer(
        deepFreeze(tableData.rows),
        tableActions.copyRowSuccess({rows: copiedRows.payload, new_row: tableData.new_row})
      )).toEqual(expectedCurrent);
    });
  });
});

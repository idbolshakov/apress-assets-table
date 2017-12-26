import {getStateSetter, mockGroupsRequest} from '../testUtils';
import {transformForServer} from '../../src/utils';
import tableData from '../../_mock/table/data.json';

describe('testUtils', () => {
  describe('getStateSetter(initialState)', () => {
    it('should return a function', () => {
      expect(getStateSetter()).toEqual(expect.any(Function));
    });

    describe('initialState is object', () => {
      const initialState = {};
      const setState = getStateSetter(initialState);
      const freezedInitialState = setState();

      it('should return the initial state', () => {
        expect(freezedInitialState).toEqual(initialState);
      });

      it('should extend the initial state', () => {
        const stateToExtend = {id: 1};
        expect(setState(stateToExtend)).toEqual({...initialState, ...stateToExtend});
      });

      it('should return a frozen object', () => {
        expect(Object.isFrozen(freezedInitialState)).toBe(true);
      });
    });

    describe('initialState is array', () => {
      const initialState = [];
      const setState = getStateSetter(initialState);
      const freezedInitialState = setState();

      it('should return the initial state', () => {
        expect(freezedInitialState).toEqual(initialState);
      });

      it('should extend the initial state', () => {
        const stateToExtend = [{id: 1}];
        expect(setState(stateToExtend)).toEqual([...initialState, ...stateToExtend]);
      });

      it('should return a frozen object', () => {
        expect(Object.isFrozen(freezedInitialState)).toBe(true);
      });
    });
  });

  describe('mockGroupsRequest(requestPayload)', () => {
    describe('copying groups', () => {
      const copyRowId = 45496;
      const expectedResponseTemplate = {payload: []};

      it('should not copy the group if this is not explicitly indicated', () => {
        const copyRowsRequestPayload = {rows: [{id: copyRowId, columns: {}}]};
        const response = mockGroupsRequest(copyRowsRequestPayload);
        const isCopiedRows = response.payload.some(row => row.copy);

        expect(isCopiedRows).toBe(false);
      });

      it('should not copy the group, if it does not exist', () => {
        const copyRowsRequestPayload = {rows: [{id: 99999, copy: true}]};

        expect(mockGroupsRequest(copyRowsRequestPayload)).toEqual(expectedResponseTemplate);
      });

      it('should copy the group', () => {
        const copyRowsRequestPayload = {rows: [{id: copyRowId, copy: true}]};
        const originalRow = tableData.rows.find(tableDataRow => tableDataRow.check.common.id === copyRowId);
        const transformedRow = {
          columns: {
            check: {id: copyRowId},
            ...transformForServer([originalRow])[0].columns
          }
        };
        const expectedRow = {
          id: copyRowId,
          record_id: copyRowId,
          copy: transformedRow
        };
        const expectedResponse = {...expectedResponseTemplate};

        expectedResponse.payload.push(expectedRow);
        expect(mockGroupsRequest(copyRowsRequestPayload)).toEqual(expectedResponse);
      });
    });

    describe('update groups', () => {
      const updateRowId = 45496;

      it('should not update the group if this is not explicitly indicated', () => {
        const updateRowsRequestPayload = {rows: [{id: updateRowId}]};
        const response = mockGroupsRequest(updateRowsRequestPayload);
        const isUpdatedRows = response.payload.some(row => row.columns);

        expect(isUpdatedRows).toBe(false);
      });

      it('should not update the group, if it does not exist', () => {
        const updateRowsRequestPayload = {rows: [{id: 99999, columns: {}}]};
        const expectedResponse = {payload: []};

        expect(mockGroupsRequest(updateRowsRequestPayload)).toEqual(expectedResponse);
      });

      it('should update the group', () => {
        const updatedName = 'updated name';
        const updateRowsRequestPayload = {rows: [{id: updateRowId, columns: {name: {text: updatedName}}}]};
        const originalRow = tableData.rows.find(tableDataRow => tableDataRow.check.common.id === updateRowId);
        const transformedRow = {
          check: {id: updateRowId},
          ...transformForServer([originalRow])[0].columns
        };
        const expectedRow = {
          id: updateRowId,
          record_id: updateRowId,
          columns: transformedRow
        };
        const expectedResponse = {payload: [expectedRow]};

        transformedRow.name.text = updatedName;
        expect(mockGroupsRequest(updateRowsRequestPayload)).toEqual(expectedResponse);
      });

      it('should update and copy the group', () => {
        const updatedName = 'updated name';
        const updateRowsRequestPayload = {
          rows: [{
            id: updateRowId,
            columns: {name: {text: updatedName}},
            copy: true
          }]
        };
        const originalRow = tableData.rows.find(tableDataRow => tableDataRow.check.common.id === updateRowId);
        const transformedRow = {
          check: {id: updateRowId},
          ...transformForServer([originalRow])[0].columns
        };
        const expectedRow = {
          id: updateRowId,
          record_id: updateRowId,
          columns: transformedRow,
          copy: {
            columns: transformedRow
          }
        };
        const expectedResponse = {payload: [expectedRow]};

        transformedRow.name.text = updatedName;
        expect(mockGroupsRequest(updateRowsRequestPayload)).toEqual(expectedResponse);
      });
    });
  });
});

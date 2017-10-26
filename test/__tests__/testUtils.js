import {getStateSetter, mockGroupsRequest} from '../testUtils';
import {transformForServer} from '../../src/utils';
import tableData from '../../_mock/table/data.json';

describe('testUtils', () => {
  describe('getStateSetter(initialState)', () => {
    it('should return a function', () => {
      expect(getStateSetter()).toEqual(expect.any(Function));
    });

    describe('setState', () => {
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
  });

  describe('mockGroupsRequest(requestPayload)', () => {
    describe('copying groups', () => {
      const copyRowId = 45496;
      const expectedResponseTemplate = {payload: []};

      it('sshould not copy the group if this is not explicitly indicated', () => {
        const copyRowsRequestPayload = {rows: [{id: copyRowId, columns: {}}]};

        expect(mockGroupsRequest(copyRowsRequestPayload)).toEqual(expectedResponseTemplate);
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
  });
});

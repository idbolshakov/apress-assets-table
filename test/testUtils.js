import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {mount} from 'enzyme';
import deepFreeze from 'deep-freeze';
import tableData from '../_mock/table/data.json';
import {transformForServer} from '../src/utils';

export const getStateSetter = (initialState) => (
  (stateToExtend) => {
    if (initialState instanceof Array) {
      if (!stateToExtend) {
        stateToExtend = [];
      }

      return deepFreeze([...initialState, ...stateToExtend]);
    } else {
      return deepFreeze({...initialState, ...stateToExtend});
    }
  }
);

export const mockGroupsRequest = (requestPayload) => {
  const responsePayload = requestPayload.rows.map((requestPayloadRow) => {
    const responsePayloadRow = {
      id: requestPayloadRow.id,
      record_id: requestPayloadRow.id
    };
    const originalRow = tableData.rows.find(tableDataRow => tableDataRow.check.common.id === requestPayloadRow.id);

    if (originalRow) {
      const transformedRow = {
        check: {id: requestPayloadRow.id},
        ...transformForServer([originalRow])[0].columns
      };

      if (requestPayloadRow.copy) {
        responsePayloadRow.copy = {columns: transformedRow};
      }

      if (requestPayloadRow.columns) {
        responsePayloadRow.columns = Object.keys(requestPayloadRow.columns).reduce((result, nextKey) => {
          result[nextKey] = requestPayloadRow.columns[nextKey];

          return result;
        }, transformedRow);
      }

      return responsePayloadRow;
    }
  });

  return {payload: responsePayload.filter(row => row)};
};

export const mountProvider = (test, initStore) =>
  mount(
    <Provider store={createStore(() => initStore)}>
      {test}
    </Provider>
  );

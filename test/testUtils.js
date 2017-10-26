import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {mount} from 'enzyme';
import deepFreeze from 'deep-freeze';
import tableData from '../_mock/table/data.json';
import {transformForServer} from '../src/utils';

export const getStateSetter = (initialState) => (
  stateToExtend => deepFreeze({...initialState, ...stateToExtend})
);

export const mockGroupsRequest = (requestPayload) => {
  const responsePayload = [];
  const copyRows = requestPayload.rows.filter(payloadRow => payloadRow.copy);

  copyRows.forEach((copyRow) => {
    const originalRow = tableData.rows.find(tableDataRow => tableDataRow.check.common.id === copyRow.id);

    if (originalRow) {
      const transformedRow = {
        columns: {
          check: {id: copyRow.id},
          ...transformForServer([originalRow])[0].columns
        }
      };

      responsePayload.push({
        id: copyRow.id,
        record_id: copyRow.id,
        copy: transformedRow
      });
    }
  });

  return {payload: responsePayload};
};

export const mountProvider = (test, initStore) =>
  mount(
    <Provider store={createStore(() => initStore)}>
      {test}
    </Provider>
  );

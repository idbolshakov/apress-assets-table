import tableData from '../../../_mock/table/data.json';
import {transformForServer, transformFromServer} from '../index';

describe('utils', () => {
  describe('transformForServer(records)', () => {
    const recordId = 1;
    const reseivedRecordTemplate = {check: {common: {id: recordId}}};
    const expectedRecordTemplate = {id: recordId, columns: {}};

    it('should return an empty array if records are undefined', () => {
      expect(transformForServer()).toEqual([]);
    });

    it('should return an empty array if records are empty', () => {
      expect(transformForServer([])).toEqual([]);
    });

    it('should remove the "check" column from the record', () => {
      expect(transformForServer([reseivedRecordTemplate])).toEqual([expectedRecordTemplate]);
    });

    it('should save "common" properties of column if they exist', () => {
      const reseivedRecord = {
        ...reseivedRecordTemplate,
        name: {common: {text: 'name'}}
      };
      const expectedRecord = {
        ...expectedRecordTemplate,
        columns: {
          ...expectedRecordTemplate.columns,
          name: {text: 'name'}
        }
      };

      expect(transformForServer([reseivedRecord])).toEqual([expectedRecord]);
    });
  });

  describe('transformFromServer(record, templateRecord)', () => {
    it('should transform record from server', () => {
      const record = tableData.rows[0];
      const recordFromServer = {
        check: {id: record.check.common.id},
        ...transformForServer([record])[0].columns
      };

      expect(transformFromServer(recordFromServer, tableData.new_row)).toEqual(record);
    });
  });
});

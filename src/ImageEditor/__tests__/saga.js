import {updateImages} from '../sagas';
import {call, put, take, select} from 'redux-saga/effects';
import nock from 'nock';
import * as actions from '../actions';

describe('updateImages saga', () => {
  const generator = updateImages({payload: {images: [], files: [{src: '', id: 0}]}});


  it('should yield actions.saveStart()', () => {
    generator.next().value;
    const testValue = generator.next({focus: {activeCell: 0, activeRow: 0}}).value;
    expect(testValue).toEqual(put(actions.saveStart()));
  });

  it('should sucсess save', () => {
    generator.next(
      nock('http://example.com/')
      .post('/test')
      .reply(200, {ids:[82]})
    ).value;

    const testValue = generator.next({activeCell: 0, activeRow: 0, images: []}).value;

    expect(testValue).toEqual(put(actions.saveSuccess()));
  });
});

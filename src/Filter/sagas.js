import {
  put,
  actionsTree,
  actionsTable,
  actionsFilter,
  _toInteger,
} from './import';

const {TREE_LOAD_START, TREE_SET_NODE} = actionsTree;
const {TABLE_EDITOR_LOAD_START} = actionsTable;
const {
  CONFIG_LOAD_SUCCESS,
  CONFIG_SET_PAGE,
  CONFIG_SET_SORT,
  CONFIG_SET_FILTER
} = actionsFilter;

export default function* loadConfig(action) {
  const config = action.payload.config || app.config.scenarios.current.config;
  yield put({type: CONFIG_LOAD_SUCCESS, payload: config});
  const actions = [];


  Object.keys(action.payload.location.query).forEach((key) => {
    let params;
    try {
      params = JSON.parse(action.payload.location.query[key]);
    } catch (e) {
      params = action.payload.location.query[key];
    }

    if (params.sort) {
      actions.push(put({
        type: CONFIG_SET_SORT,
        payload: {
          name: key,
          onLoad: true,
          id: params.sort.direction,
          priority: params.sort.priority
        }
      }));
    }

    if (params.filter) {
      actions.push(put({
        type: CONFIG_SET_FILTER,
        payload: {
          name: key,
          onLoad: true,
          id: params.filter,
        }
      }));
    }

    if (key === 'group') {
      actions.push(put({
        type: TREE_SET_NODE,
        payload: {
          name: key,
          onLoad: true,
          urlName: params.url_name
        }
      }));
    }

    if (key === 'page') {
      actions.push(put({
        type: CONFIG_SET_PAGE,
        payload: {
          page: _toInteger(params),
          onLoad: true
        }
      }));
    }
  });

  yield actions;
  yield put({type: TABLE_EDITOR_LOAD_START, payload: {}});
  yield put({type: TREE_LOAD_START, payload: null});
}

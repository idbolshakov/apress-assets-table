import {
  put,
  actionsTree,
  actionsTable,
  actionsFilter,
} from './import';

const {TREE_LOAD_START, TREE_SET_NODE} = actionsTree;
const {TABLE_EDITOR_LOAD_START} = actionsTable;
const {
  CONFIG_LOAD_SUCCESS,
  CONFIG_SET_PAGE,
  CONFIG_SET_SORT,
  CONFIG_SET_FILTER
} = actionsFilter;

export default function* loadConfig(data) {
  const config = app.config.scenarios.current.config;
  yield put({type: CONFIG_LOAD_SUCCESS, payload: config});

  yield Object.keys(data.payload.query).map((key) => {
    const params = JSON.parse(data.payload.query[key]);
    const otherActions = {
      page: CONFIG_SET_PAGE
    };

    if (params.sort) {
      return put({
        type: CONFIG_SET_SORT,
        payload: {
          name: key,
          onLoad: true,
          id: params.sort.direction,
          priority: params.sort.priority
        }
      });
    }

    if (params.filter) {
      return put({
        type: CONFIG_SET_FILTER,
        payload: {
          name: key,
          onLoad: true,
          id: params.filter,
        }
      });
    }

    if (key === 'group') {
      return put({
        type: TREE_SET_NODE,
        payload: {
          name: key,
          onLoad: true,
          url_name: params.url_name
        }
      });
    }

    if (otherActions[key]) {
      return put({
        type: otherActions[key],
        payload: params
      });
    }

    return false;
  });

  yield put({type: TABLE_EDITOR_LOAD_START, payload: null});
  yield put({type: TREE_LOAD_START, payload: null});
}

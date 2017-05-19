import {api, actions, actionsError, actionsTable, call, put, select} from './import';

const {TABLE_EDITOR_LOAD_START} = actionsTable;
const {ERROR_ADD, ERROR_REMOVE} = actionsError;
const {
  TREE_UPDATE_SUCCESS,
  TREE_LOAD_SUCCESS,
  TREE_LOAD_START
} = actions;

const getDataPositionRubricator = (payload) => {
  switch (payload.hover.target) {
    case 'top':
      return {
        position: payload.hover.index,
        parent_id: payload.hover.id
      };

    case 'center':
      return {
        parent_id: payload.hover.id
      };

    default:
      return {
        position: payload.hover.index + 1,
        parent_id: payload.hover.id
      };
  }
};

const getRubricatorData = config =>
  api.post(app.config.rubricatorUrl, {config}).then(response => response.data);

const putRubricatorData = (url, config) =>
  api.put(`${app.config.rubricatorUrl}/${url}`, {config}).then(response => response.data);

const updateRubricatorPosition = payload =>
  api.put(
    app.config.rubricatorUpdate.replace('_group_', payload.id),
    {product_group: getDataPositionRubricator(payload)}
  ).then(response => response.data);

const getConfig = props => props.config.config;

export function* loadRubricatorData() {
  try {
    console.log(app.config.rubricatorUrl);
    yield put({type: ERROR_REMOVE, payload: {target: 'tree'}});
    const config = yield select(getConfig);
    const rubricatorData = yield call(getRubricatorData.bind({}, config));
    yield put({type: TREE_LOAD_SUCCESS, payload: rubricatorData.tree_nodes});
  } catch (err) {
    yield put({
      type: ERROR_ADD,
      payload: {
        type: 'server',
        target: 'tree',
        title: 'Не удалось загрузить рубрикатор',
        action: TREE_LOAD_START
      }
    });
  }
}

export function* updateRubricatorData(data) {
  try {
    yield put({type: ERROR_REMOVE, payload: {target: 'tree'}});
    const config = yield select(getConfig);
    const rubricatorData = yield call(putRubricatorData.bind({}, data.payload.urlName, config));
    yield put({
      type: TREE_UPDATE_SUCCESS,
      payload: {
        id: data.payload.id,
        nodes: rubricatorData.tree_nodes
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export function* setRubricatorPosition({payload}) {
  try {
    yield put({type: ERROR_REMOVE, payload: {target: 'tree'}});
    yield call(updateRubricatorPosition.bind({}, payload));
    yield put({type: TABLE_EDITOR_LOAD_START, payload: null});
  } catch (err) {
    console.log(err);
  }
}

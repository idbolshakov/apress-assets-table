import {TREE_SET_NODE} from '../Tree/actions';

import {
  CONFIG_LOAD_SUCCESS,
  CONFIG_SET_PAGE,
  CONFIG_SET_PER_PAGE,
  CONFIG_NO_CHANGE,
  CONFIG_SET_FILTER,
  CONFIG_SET_SORT,
  CONFIG_RESET
} from './actions';

const initialState = {
  config: {},
  isChange: false,
  prioritySort: 0,
  params: {}
};

const setPrioritySort = (prioritySort, sorter, payload) => {
  if (!payload.id && sorter.direction) {
    return prioritySort - 1;
  }

  if (payload.id && !sorter.direction) {
    return prioritySort + 1;
  }

  return prioritySort;
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case CONFIG_LOAD_SUCCESS:
      return {
        ...state,
        config: action.payload,
      };

    case CONFIG_NO_CHANGE:
      return {
        ...state,
        isChange: false
      };

    case CONFIG_SET_PAGE: {
      const params = {
        ...state.params,
        page: action.payload
      };

      if (!action.payload || action.payload === 1) {
        delete params.page;
      }

      return {
        ...state,
        config: {
          ...state.config,
          page: action.payload
        },
        isChange: !action.payload.onLoad,
        params
      };
    }

    case CONFIG_SET_PER_PAGE: {
      return {
        ...state,
        config: {
          ...state.config,
          per_page: action.payload
        },
        isChange: true
      };
    }

    case TREE_SET_NODE: {
      let group = null;
      let params = {...state.params};
      let change = true;

      if (action.payload) {
        group = {
          url_name: action.payload.url_name,
          without: (action.payload.url_name === 'k-unbinded')
        };

        params = {
          ...params,
          group
        };

        change = !action.payload.onLoad;
      } else {
        delete params.group;
      }

      return {
        ...state,
        config: {
          ...state.config,
          product_group: group
        },
        isChange: change,
        params
      };
    }

    case CONFIG_SET_FILTER: {
      const params = {
        ...state.params,
        [action.payload.name]: {
          ...state.params[action.payload.name],
          filter: action.payload.id
        }
      };

      if (action.payload.id === 'all') {
        if (params[action.payload.name].sort) {
          delete params[action.payload.name].filter;
        } else {
          delete params[action.payload.name];
        }
      }

      return {
        ...state,
        config: {
          ...state.config,
          columns: state.config.columns.map((col) => {
            if (col.name === action.payload.name) {
              return {
                ...col,
                filter: {
                  ...col.filter,
                  value: action.payload.id
                }
              };
            }

            return col;
          })
        },
        isChange: !action.payload.onLoad,
        params
      };
    }

    case CONFIG_SET_SORT: {
      let prioritySort = state.prioritySort;
      let sorter;

      const columns = state.config.columns.map((col) => {
        if (col.name === action.payload.name) {
          prioritySort = setPrioritySort(prioritySort, col.sorter, action.payload);
          sorter = {
            ...col.sorter,
            direction: action.payload.id,
            priority: action.payload.priority ? action.payload.priority : prioritySort
          };
          return {
            ...col,
            sorter
          };
        }

        return col;
      });

      const params = {
        ...state.params,
        [action.payload.name]: {
          ...state.params[action.payload.name],
          sort: sorter
        }
      };

      if (!action.payload.id) {
        if (params[action.payload.name].filter) {
          delete params[action.payload.name].sort;
        } else {
          delete params[action.payload.name];
        }
      }

      return {
        ...state,
        config: {
          ...state.config,
          columns
        },
        isChange: !action.payload.onLoad,
        prioritySort,
        params
      };
    }

    case CONFIG_RESET: {
      return {
        ...state,
        config: {
          ...state.config,
          columns: state.config.columns.map((col) => {
            const filter = col.filter ? {...col.filter, value: null} : null;
            const sorter = col.sorter ?
              {...col.sorter, direction: null, priority: null} : null;

            return {
              ...col,
              filter,
              sorter
            };
          }),
          product_group: null,
          page: 1
        },
        isChange: true,
        prioritySort: 0,
        params: {}
      };
    }

    default:
      return state;
  }
}

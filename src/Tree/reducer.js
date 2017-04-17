import {
  TREE_LOAD_SUCCESS,
  TREE_UPDATE_SUCCESS,
  TREE_SET_NODE,
  TREE_SET_EXPANDED
} from './actions';

const initialState = {
  data: [],
  selected: []
};

const isSelected = (treeState, action) => {
  let selected = [];

  if (action.payload) {
    treeState.forEach(nodeState =>
      (function _isSelected(state, id) {
        if (state.id === id) {
          selected.push(state);
          return true;
        } else if (state.tree_nodes && state.tree_nodes.length) {
          const childSelected = state.tree_nodes.filter(node => _isSelected(node, id));

          if (childSelected.length) {
            selected = [...selected, state];
            return true;
          }
        }

        return null;
      }(nodeState, action.payload.id))
    );
  }

  return selected.reverse();
};

const treeNode = (state, action) => {
  switch (action.type) {
    case TREE_UPDATE_SUCCESS:
      if (state.id === action.payload.id) {
        return {
          ...state,
          tree_nodes: action.payload.nodes
        };
      }

      return {
        ...state,
        tree_nodes: state.tree_nodes && state.tree_nodes.length ?
          state.tree_nodes.map(node => treeNode(node, action)) : undefined
      };

    case TREE_SET_NODE:
      return {
        ...state,
        selected: action.payload ? state.id === action.payload.id : false,
        tree_nodes: state.tree_nodes && state.tree_nodes.length ?
          state.tree_nodes.map(node => treeNode(node, action)) : undefined
      };

    case TREE_SET_EXPANDED:
      return {
        ...state,
        expanded: state.id === action.payload.id ? action.payload.expanded : state.expanded,
        tree_nodes: state.tree_nodes && state.tree_nodes.length ?
          state.tree_nodes.map(node => treeNode(node, action)) : undefined
      };

    default:
      return state;
  }
};

export default function tree(state = initialState, action) {
  switch (action.type) {
    case TREE_LOAD_SUCCESS:
      return {
        ...state,
        data: action.payload
      };

    case TREE_UPDATE_SUCCESS:
      return {
        ...state,
        data: state.data.map(node => treeNode(node, action))
      };

    case TREE_SET_NODE:
      return {
        ...state,
        data: state.data.map(node => treeNode(node, action)),
        selected: isSelected(state.data, action)
      };

    case TREE_SET_EXPANDED:
      return {
        ...state,
        data: state.data.map(node => treeNode(node, action))
      };

    default:
      return state;
  }
}

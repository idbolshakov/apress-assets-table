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
            console.log(selected);
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
    case 'UPDATE_RUBRICATOR_DATA_SUCCESS':
      if (state.id === action.payload.id) {
        return {
          ...state,
          tree_nodes: action.payload.nodes
        };
      }

      return state;

    case 'SET_TREE_NODE':
      return {
        ...state,
        selected: action.payload ? state.id === action.payload.id : false,
        tree_nodes: state.tree_nodes && state.tree_nodes.length ?
          state.tree_nodes.map(node => treeNode(node, action)) : undefined
      };

    case 'SET_EXPANDED':
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
    case 'LOAD_RUBRICATOR_DATA_SUCCESS':
      return {
        ...state,
        data: action.payload
      };

    case 'UPDATE_RUBRICATOR_DATA_SUCCESS':
      return {
        ...state,
        data: state.data.map(node => treeNode(node, action))
      };

    case 'SET_TREE_NODE':
      return {
        ...state,
        data: state.data.map(node => treeNode(node, action)),
        selected: isSelected(state.data, action)
      };

    case 'SET_EXPANDED':
      return {
        ...state,
        data: state.data.map(node => treeNode(node, action))
      };

    default:
      return state;
  }
}

import {actions} from './import';
import {CONFIG_RESET, CONFIG_SET_ID} from '../Filter/actions';

const {
  TREE_LOAD_START,
  TREE_LOAD_SUCCESS,
  TREE_UPDATE_SUCCESS,
  TREE_SET_NODE,
  TREE_SET_EXPANDED,
  TREE_MOVE_NODE,
  TREE_MOVE_NODE_REQUEST
} = actions;

const initialState = {
  data: [],
  selected: [],
  isLoaded: false
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


const deleteNode = (state, id) => {
  let newState = [];
  let moveNode = null;

  state.forEach((node) => {
    if (node.id === id) {
      moveNode = node;
    } else {
      let newNode = {...node};

      if (node.tree_nodes && node.tree_nodes.length) {
        const childNode = deleteNode(node.tree_nodes, id);
        newNode = {
          ...node,
          tree_nodes: childNode.newState
        };

        if (childNode.moveNode) {
          moveNode = childNode.moveNode;

          newNode = {
            ...newNode,
            expandable: !!newNode.tree_nodes.length,
            items_count: newNode['items_count'] - moveNode['items_count'],
          };
        }
      }

      newState = [...newState, newNode];
    }
  });

  return {
    newState,
    moveNode
  };
};

const addNode = (state, hover, currentNode) => {
  let newState = [];
  let isAdd = false;
  let position;

  state.forEach((node, index) => {
    let newNode = {...node};

    if (node.id === hover.id) {
      position = index;
      isAdd = true;
      if (hover.target === 'center') {
        if (Array.isArray(node.tree_nodes)) {
          newNode = {
            ...node,
            expanded: true,
            expandable: true,
            items_count: newNode['items_count'] + currentNode['items_count'],
            tree_nodes: [...node.tree_nodes, currentNode]
          };
        } else {
          newNode = {
            ...node,
            expanded: true,
            expandable: true,
            items_count: newNode['items_count'] + currentNode['items_count'],
            tree_nodes: [currentNode]
          };
        }
      } else if (hover.target === 'top') {
        newState = [...newState, currentNode];
      } else {
        newNode = [newNode, currentNode];
        position += 1;
      }
    }

    if (!isAdd && (node.tree_nodes && node.tree_nodes.length)) {
      const child = addNode(node.tree_nodes, hover, currentNode);

      newNode = {
        ...node,
        tree_nodes: child.newState
      };

      if (child.isAdd) {
        isAdd = child.isAdd;
        position = child.position;

        newNode = {
          ...newNode,
          items_count: newNode['items_count'] + currentNode['items_count'],
        };
      }
    }

    if (Array.isArray(newNode)) {
      newState = [...newState, ...newNode];
    } else {
      newState = [...newState, newNode];
    }
  });

  return {
    newState,
    position,
    isAdd
  };
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

    case CONFIG_RESET:
      return {
        ...state,
        selected: false,
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
    case TREE_LOAD_START:
      return {
        ...state,
        isLoaded: false
      };

    case TREE_LOAD_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoaded: true
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

    case TREE_MOVE_NODE: {
      const deleteData = deleteNode(state.data, action.payload.id);
      const addData = addNode(
        deleteData.newState,
        action.payload.hover,
        deleteData.moveNode
      );

      return {
        ...state,
        data: [...addData.newState],
        moveNode: {
          id: action.payload.id,
          product_group: {
            position: addData.position + 1,
            parent_id: action.payload.hover.target === 'center' ?
              action.payload.hover.id : action.payload.hover.parentId
          }
        }
      };
    }

    case TREE_MOVE_NODE_REQUEST:
      return {
        ...state,
        moveNode: null
      };

    case CONFIG_SET_ID:
    case CONFIG_RESET:
      return {
        ...state,
        data: state.data.map(node => treeNode(node, action)),
        selected: []
      };

    default:
      return state;
  }
}

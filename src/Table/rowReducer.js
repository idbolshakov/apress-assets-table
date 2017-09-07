import {
  TABLE_EDITOR_LOAD_SUCCESS,
  TABLE_EDITOR_SET_TEXT,
  TABLE_EDITOR_ROW_ADD,
  TABLE_EDITOR_ROW_ADD_ID,
  TABLE_EDITOR_ROW_REMOVE,
  TABLE_EDITOR_SET_IMAGES,
  TABLE_EDITOR_IMAGES_ASSIGN_ID,
} from './actions';

let newId = -1;

export default function rows(state = [], action) {
  switch (action.type) {
    case TABLE_EDITOR_LOAD_SUCCESS:
      return action.payload.rows;

    case TABLE_EDITOR_SET_TEXT:
      return state.map((row) => {
        if (row.check.common.id === action.payload.id) {
          const cell = row[action.payload.name];

          return {
            ...row,
            [action.payload.name]: {
              ...cell,
              common: {
                ...cell.common,
                [action.payload.field]: action.payload.text
              }
            }
          };
        }

        return row;
      });

    case TABLE_EDITOR_SET_IMAGES:
      return state.map((row) => {
        if (row.check.common.id === action.payload.id) {
          const cell = row[action.payload.name];

          return {
            ...row,
            [action.payload.name]: {
              ...cell,
              common: {
                ...cell.common,
                images: [...action.payload.images]
              }
            }
          };
        }
        return row;
      });

    case TABLE_EDITOR_IMAGES_ASSIGN_ID: {
      // Todo:
      return state;
    }

    case TABLE_EDITOR_ROW_ADD: {
      const target = (action.payload && action.payload.target) ?
        state.indexOf(action.payload.target) + 1 : 0;
      let productGroup = {...action.payload.new_row.product_group};

      if (action.payload && action.payload.parent) {
        const ancentors = [...action.payload.parent.product_group.common.ancestors];
        const ancentorsLastId = ancentors.length ? ancentors[ancentors.length - 1].id : null;

        productGroup = {
          ...productGroup,
          common: {
            ...productGroup.common,
            ancestors: [...ancentors, {
              id: action.payload.parent.check.common.id,
              parent_id: ancentorsLastId,
              name: action.payload.parent.name.common.text
            }],
            parent_id: action.payload.parent.check.common.id
          }
        };
      }

      const newstate = [...state];
      const newRow = {
        ...action.payload.new_row,
        check: {
          ...action.payload.new_row.check,
          common: {
            ...action.payload.new_row.check.common,
            id: newId
          }
        },
        product_group: productGroup
      };

      newId -= 1;

      newstate.splice(target, 0, newRow);

      return newstate;
    }

    case TABLE_EDITOR_ROW_ADD_ID:
      return state.map((row) => {
        const payloadItem = action.payload.find(payloadRow =>
          row.check.common.id === payloadRow.id);

        if (payloadItem) {
          return {
            ...row,
            check: {
              ...row.check,
              common: {
                ...row.check.common,
                id: payloadItem.record_id
              }
            }
          };
        }

        return row;
      });

    case TABLE_EDITOR_ROW_REMOVE: {
      return state.filter(row => row.check.common.id !== action.payload.id);
    }

    default:
      return state;
  }
}

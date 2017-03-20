const initialState = {
  table: {
    columns: [],
    rows: []
  }
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_TABLE_DATA_SUCSESS':
      return {
        ...state,
        table: action.payload
      };

    default:
      return state;
  }
}

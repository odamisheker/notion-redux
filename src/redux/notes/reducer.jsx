const DEFAULT_STATE = {
  data: [],
  loading: false,
  error: null,
  viewedNote: null, 
};

export const notesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'NOTES/LOADING':
      return {
        ...state,
        loading: true,
        error: null,
        viewedNote: null, 
      };
    case "NOTES/SET":
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case "NOTES/ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "NOTES/SET_VIEWED_NOTE":
      return {
        ...state,
        viewedNote: action.payload,
        loading: false,
        error: null,
      };
    case "NOTES/CLEAR_VIEWED_NOTE":
      return {
        ...state,
        viewedNote: null,
      };
    default:
      return state;
  }
};

const DEFAULT_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "USER/SET":
      return {
        data: action.payload,
        loading: false,
        error: null,
      };
    case "USER/LOADING/SET":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "USER/ERROR/SET":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "USER/LOG_OUT":
      return DEFAULT_STATE;
    default:
      return state;
  }
};

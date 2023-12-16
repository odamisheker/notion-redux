import {serverRequest } from "../../util/App"

export const getUser = (email, password) => async (dispatch) => {
  dispatch({ type: "USER/LOADING/SET" });
  try {
    const users = await serverRequest.getUserByEmail(email);
    const user = users[0];
    if (user) {
      dispatch({
        type: "USER/SET",
        payload: user,
      });
    } else {
      throw new Error("Invalid user");
    }
  } catch (error) {
    dispatch({ type: "USER/ERROR/SET", payload: error.toString() });
  }
};

export const logOutUser = () => ({
  type: "USER/LOG_OUT"
})

export const addUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "USER/LOADING/SET" });

    await serverRequest.addUser(userData);

    dispatch({
      type: "USER/SET",
      payload: userData,
    });
  } catch (error) {
    dispatch({
      type: "USER/ERROR/SET",
      payload: error.toString(),
    });
  }
};

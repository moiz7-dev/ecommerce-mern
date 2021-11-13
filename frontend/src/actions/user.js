import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
} from "../constants/user";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    let config = { headers: { "Content-Type": "application/json" } };

    const user = await axios.post(
      "/api/v1/login",
      {
        email,
        password,
      },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (e) {
    console.log(e.response);
    dispatch({ type: LOGIN_FAIL, payload: e.response.data.message });
  }
};

export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const user = await axios.post(
      "/api/v1/register",
      {
        data,
      },
    );

    dispatch({ type: REGISTER_SUCCESS, payload: user });
  } catch (e) {
    console.log(e.response);
    dispatch({ type: REGISTER_FAIL, payload: e.response.data.message });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

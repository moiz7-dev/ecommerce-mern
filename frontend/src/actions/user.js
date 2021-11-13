import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "../constants/user";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    let config = { headers: { "Content-Type": "application/json", "responseType": "json" } };

    const {data: {user}} = await axios.post(
      "/api/v1/login",
      {
        email,
        password,
      },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (e) {
    dispatch({ type: LOGIN_FAIL, payload: e.response.data.message });
  }
};

export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data: { user } } = await axios.post( "/api/v1/register", data );


    dispatch({ type: REGISTER_SUCCESS, payload: user });
  } catch (e) {
    dispatch({ type: REGISTER_FAIL, payload: e.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_REQUEST });

    const { data: { user } } = await axios.get( "/api/v1/me", );

    dispatch({ type: LOAD_SUCCESS, payload: user });
  } catch (e) {
    dispatch({ type: LOAD_FAIL, payload: e.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout",);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (e) {
    dispatch({ type: LOGOUT_FAIL, payload: e.response.data.message });
  }
}

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

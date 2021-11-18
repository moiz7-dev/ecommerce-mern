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
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CLEAR_ERRORS,
} from "../constants/user";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const {
      data: { user },
    } = await axios.post(
      "/api/v1/login",
      {
        email,
        password,
      });

    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (e) {
    dispatch({ type: LOGIN_FAIL, payload: e.response.data.message });
  }
};

export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const {
      data: { user },
    } = await axios.post("/api/v1/register", data);

    dispatch({ type: REGISTER_SUCCESS, payload: user });
  } catch (e) {
    dispatch({ type: REGISTER_FAIL, payload: e.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_REQUEST });

    const {
      data: { user },
    } = await axios.get("/api/v1/me");

    dispatch({ type: LOAD_SUCCESS, payload: user });
  } catch (e) {
    dispatch({ type: LOAD_FAIL, payload: e.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (e) {
    dispatch({ type: LOGOUT_FAIL, payload: e.response.data.message });
  }
};

export const updateProfile = (data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const {
      data: { success },
    } = await axios.put("/api/v1/me/update", data);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: success });
  } catch (e) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: e.response.data.message });
  }
};

export const updatePassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const {
      data: { success },
    } = await axios.put("/api/v1/password/update", data);

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: success });
  } catch (e) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: e.response.data.message });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const {
      data: { message },
    } = await axios.post("/api/v1/password/forgot", {email});

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: message });
  } catch (e) {
    dispatch({ type: FORGOT_PASSWORD_FAIL, payload: e.response.data.message });
  }
};

export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const {
      data: { success },
    } = await axios.put(`/api/v1/password/reset/${token}`, passwords);

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: success });
  } catch (e) {
    dispatch({ type: RESET_PASSWORD_FAIL, payload: e.response.data.message });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

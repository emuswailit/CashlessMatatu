// @flow

import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILED,
  LOAD_USER_SUCCESS,
  LOAD_USER,
  LOAD_USER_FAILED,
  RESET_REDUX,
} from "./constants";

export const resetRedux = () => ({
  type: RESET_REDUX,
});
export const loginUser = (data) => ({
  type: LOGIN_USER,
  payload: data,
});

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

export const loginUserFailed = (message, errors) => ({
  type: LOGIN_USER_FAILED,
  payload: { message: message, errors: errors },
});

export const registerUser = (user) => ({
  type: REGISTER_USER,
  payload: user,
});

export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});

export const registerUserFailed = (message, errors) => ({
  type: REGISTER_USER_FAILED,
  payload: { message: message, errors: errors },
});

export const logoutUser = (history) => ({
  type: LOGOUT_USER,
  payload: { history },
});

export const forgetPassword = (email) => ({
  type: FORGET_PASSWORD,
  payload: { email },
});

export const forgetPasswordSuccess = (passwordResetStatus) => ({
  type: FORGET_PASSWORD_SUCCESS,
  payload: passwordResetStatus,
});

export const forgetPasswordFailed = (error) => ({
  type: FORGET_PASSWORD_FAILED,
  payload: error,
});

export const loadUser = (id) => ({
  type: LOAD_USER,
  payload: id,
});

export const loadUserSuccess = (user) => ({
  type: LOAD_USER_SUCCESS,
  payload: user,
});

export const loadUserFailed = (message, errors) => ({
  type: LOAD_USER_FAILED,
  payload: { message: message, errors: errors },
});

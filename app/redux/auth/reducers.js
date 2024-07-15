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
  RESET_REDUX,
  LOAD_USER_SUCCESS,
  LOAD_USER,
  LOAD_USER_FAILED,
} from "./constants";

const INIT_STATE = {
  user: null,
  loading: false,
  authenticated: false,
  errors: [],
  success: false,
  updated: false,
};

const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case RESET_REDUX:
      return {
        ...state,
        loading: false,
        user: null,
        error: null,
        errors: [],
        success: false,
        message: null,
      };
    case LOGIN_USER:
    case LOAD_USER:
      return {
        ...state,
        success: false,
        authenticated: null,
        updated: false,
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
        loading: false,
        error: null,
        errors: [],
      };
    case LOGIN_USER_FAILED:
    case LOAD_USER_FAILED:
      return {
        ...state,
        error: action.payload.message,
        errors: action.payload.errors,
        authenticated: false,
        loading: false,
      };
    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        errors: [],
        success: true,
      };
    case REGISTER_USER_FAILED:
      return {
        ...state,
        error: action.payload.message,
        errors: action.payload.errors,
        loading: false,
      };
    case LOGOUT_USER:
      return { ...state, user: null };
    case FORGET_PASSWORD:
      return { ...state, loading: true };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        passwordResetStatus: action.payload,
        loading: false,
        error: null,
      };
    case FORGET_PASSWORD_FAILED:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default Auth;

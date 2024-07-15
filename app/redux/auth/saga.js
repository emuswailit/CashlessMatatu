// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import auth from "../../auth/storage";
import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  FORGET_PASSWORD,
  LOAD_USER,
} from "./constants";
import axios from "axios";
import {
  loginUserSuccess,
  loginUserFailed,
  registerUserSuccess,
  registerUserFailed,
  forgetPasswordSuccess,
  forgetPasswordFailed,
  loadUserSuccess,
  loadUserFailed,
} from "./actions";

// export const tokenConfig = async (getState) => {
//   // Headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   let token = null;

//   try {
//     token = await auth.getToken().then((value) => value);
//     console.log("tonek", token);
//   } catch (error) {}

//   if (token) {
//     // console.log("only token here", token);
//     config.headers["Authorization"] = `Bearer ${token}`;
//   } else {
//     return null;
//     // console.log("Token manenoz");
//   }

//   return config;
// };

/**
 * Sets the session
 * @param {*} user
 */

/**
 * Login the user
 * @param {*} payload - email and password
 */
function* login(payload) {
  console.log("PAYLOAD", payload.payload);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // const body = JSON.stringify(payload.payload);
  const apiCall = () => {
    return axios
      .post("users/login/", payload.payload)
      .then((response) => response.data)
      .catch((err) => {
        throw err;
      });
  };

  try {
    const response = yield call(apiCall);
    console.log("Logged in", response);
    setSession(response);
    yield put(loginUserSuccess(response));
  } catch (error) {
    let message;

    console.log("ERRORS", error);
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(loginUserFailed(message, error.response.data.errors));
    setSession(null);
  }
}

/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
  try {
    setSession(null);

    yield call(() => {
      history.push("/account/login");
    });
  } catch (error) {}
}

/**
 * Register the user
 */
function* register(payload) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(payload.payload);
  console.log("body", body);
  const registerCall = () => {
    return axios
      .post("users/register", body, config)
      .then((response) => response.data)
      .catch((err) => {
        throw err;
      });
  };

  try {
    const response = yield call(registerCall);
    // console.log('AT REGISTER', response);
    yield put(registerUserSuccess(response));
  } catch (error) {
    console.log("ERR", error.response);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(registerUserFailed(message, error.response.data.data.errors));
  }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { email } }) {
  const options = {
    body: JSON.stringify({ email }),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = yield call(fetchJSON, "/users/password-reset", options);
    yield put(forgetPasswordSuccess(response.message));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(forgetPasswordFailed(message));
  }
}

/**
 * Load logged in user the user
 */
function* loadUser(payload) {
  console.log("PAYLOAD", payload);

  const loadUserCall = () => {
    return axios
      .get(`users/user`)
      .then((response) => response.data)
      .catch((err) => {
        throw err;
      });
  };

  try {
    const response = yield call(loadUserCall);
    console.log("YIELD", response);
    // setSession(response);
    yield put(loadUserSuccess(response));
  } catch (error) {
    console.log("ERR", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    // yield put(loadUserFailed(message, error.response.data.data.errors));
  }
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, register);
}

export function* watchLoadUser() {
  yield takeEvery(LOAD_USER, loadUser);
}

export function* watchForgetPassword() {
  yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchLoadUser),
    fork(watchForgetPassword),
  ]);
}

export default authSaga;

import {
  postRegistrationRequest,
  postRegistrationSuccess,
  postRegistrationFailure,
  getVerificationRequest,
  getVerificationSuccess,
  getVerificationFailure,
  postLoginSuccess,
  postLoginFailure,
  postLoginRequest,
  changePasswordSuccess,
  changePasswordFailure,
  changePasswordRequest,
  getUserSuccess, getUserFailure, getUserRequest
} from './actions'
import {instance} from "../../configs/axiosInstance";
import {put, takeEvery} from "redux-saga/effects";


function* registration(action) {
  try {
    console.log(action)
    const response = yield instance({
      method: "post",
      url: "/guest/users/registration",
      data : action.payload
    })
    if (response.status === 200) {
      yield put(postRegistrationSuccess(response.data.successMessage));
    } else {
      yield put(postRegistrationFailure(response.data.message));
    }
  } catch (error) {
    console.log('error---', error);
      yield put(postRegistrationFailure(error.response.data.message || error.message));
  }
}

function* verification(action) {
  try {
    const {id, token} = action.payload
    const response = yield instance({
      method: "get",
      url: `/guest/users/verify_email/${id}/${token}`,
    })
    console.log(response)
    if (response.status === 200) {
      yield put(getVerificationSuccess(response.data.successMessage));
    } else {
      yield put(getVerificationFailure(response.data.message));
    }
  } catch (error) {
    yield put(getVerificationFailure(error.message));
  }
}


function* login(action) {
  try {
    console.log(action)
    const response = yield instance({
      method: "post",
      url: "/guest/users/login",
      data : action.payload
    })
    console.log(response)
    if (response.status === 200) {
      yield put(postLoginSuccess(response.data.data));
    } else {
      yield put(postLoginFailure(response.data.message));
    }
  } catch (error) {
    yield put(postLoginFailure(error.message));
  }
}

function* changePassword(action) {
  try {
    console.log(action)
    const response = yield instance({
      method: "put",
      url: "/user/users/change_pass",
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + action.payload.token
      },
      data : action.payload.data
    })
    if (response.status === 200) {
      yield put(changePasswordSuccess(response.data.successMessage));
    } else {
      yield put(changePasswordFailure(response.data.message));
    }
  } catch (error) {
    yield put(changePasswordFailure(error.message));
  }
}

function* getUser() {
  try {
    const response = yield instance({
      method: "get",
      url: "/user/users/get/user",
    })
    console.log(response)
    if (response.status === 200) {
      yield put(getUserSuccess(response.data.data));
    } else {
      yield put(getUserFailure(response.data.message));
    }
  } catch (error) {
    yield put(getUserFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeEvery(postRegistrationRequest, registration);
  yield takeEvery(getVerificationRequest, verification);
  yield takeEvery(postLoginRequest, login);
  yield takeEvery(changePasswordRequest, changePassword);
  yield takeEvery(getUserRequest, getUser);

}
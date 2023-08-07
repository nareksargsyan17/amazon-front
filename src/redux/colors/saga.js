import {
  deleteColorsFailure, deleteColorsRequest,
  deleteColorsSuccess,
  getColorsFailure,
  getColorsRequest,
  getColorsSuccess,
  postColorsFailure,
  postColorsRequest,
  postColorsSuccess,
  updateColorsFailure,
  updateColorsRequest,
  updateColorsSuccess
} from './actions'
import {instance} from "../../configs/axiosInstance";
import {put, takeLatest} from "redux-saga/effects";


function* getColors() {
  try {
    const response = yield instance({
      method: "get",
      url: "/guest/colors/get_all"
    })
    if (response.status === 200) {
      yield put(getColorsSuccess(response.data.data));
    } else {
      yield put(getColorsFailure(response.data.message));
    }
  } catch (error) {
    yield put(getColorsFailure(error.message));
  }
}

function* postColors({payload}) {
  try {
    const response = yield instance({
      method: "post",
      url: "/admin/colors/add",
      data: payload
    })
    if (response.status === 200) {
      yield put(postColorsSuccess(response.data.data));
    } else {
      yield put(postColorsFailure(response.data.message));
    }
  } catch (error) {
    yield put(postColorsFailure(error.message));
  }
}

function* updateColors({payload}) {
  try {
    const response = yield instance({
      method: "put",
      url: "/admin/colors/update/" + payload.id,
      data: payload.data
    })
    if (response.status === 200) {
      yield put(updateColorsSuccess(response.data.data));
    } else {
      yield put(updateColorsFailure(response.data.message));
    }
  } catch (error) {
    yield put(updateColorsFailure(error.message));
  }
}

function* deleteColors({payload}) {
  try {
    const response = yield instance({
      method: "delete",
      url: "/admin/colors/delete/" + payload
    })
    if (response.status === 200) {
      yield put(deleteColorsSuccess(response.data.data));
    } else {
      yield put(deleteColorsFailure(response.data.message));
    }
  } catch (error) {
    yield put(deleteColorsFailure(error.message));
  }
}


export default function* colorsSaga() {
  yield takeLatest(getColorsRequest, getColors);
  yield takeLatest(postColorsRequest, postColors);
  yield takeLatest(updateColorsRequest, updateColors);
  yield takeLatest(deleteColorsRequest, deleteColors);

}
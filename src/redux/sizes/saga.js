import {
  getSizesRequest,
  getSizesSuccess,
  getSizesFailure,
  postSizesSuccess,
  postSizesFailure,
  postSizesRequest,
  updateSizesSuccess,
  updateSizesFailure,
  updateSizesRequest, deleteSizesSuccess, deleteSizesFailure, deleteSizesRequest
} from './actions'
import {instance} from "../../configs/axiosInstance";
import {put, takeEvery, takeLatest} from "redux-saga/effects";


function* getSizes() {
  try {
    const response = yield instance({
      method: "get",
      url: "/guest/sizes/get_all"
    })
    if (response.status === 200) {
      yield put(getSizesSuccess(response.data.data));
    } else {
      yield put(getSizesFailure(response.data.message));
    }
  } catch (error) {
    yield put(getSizesFailure(error.message));
  }
}

function* postSizes({ payload }) {
  try {
    const response = yield instance({
      method: "post",
      url: "/admin/sizes/add",
      data: payload
    })
    if (response.status === 200) {
      yield put(postSizesSuccess(response.data.data));
    } else {
      yield put(postSizesFailure(response.data.message));
    }
  } catch (error) {
    yield put(postSizesFailure(error.message));
  }
}

function* updateSizes({ payload }) {
  try {
    const response = yield instance({
      method: "put",
      url: "/admin/sizes/update/" + payload.id,
      data: payload.data
    })
    if (response.status === 200) {
      yield put(updateSizesSuccess(response.data.data));
    } else {
      yield put(updateSizesFailure(response.data.message));
    }
  } catch (error) {
    yield put(updateSizesFailure(error.response.data.message));
  }
}

function* deleteSizes({ payload }) {
  try {
    const response = yield instance({
      method: "delete",
      url: "/admin/sizes/delete/" + payload,
    })
    if (response.status === 200) {
      yield put(deleteSizesSuccess(response.data.data));
    } else {
      yield put(deleteSizesFailure(response.data.message));
    }
  } catch (error) {
    yield put(deleteSizesFailure(error.response.data.message));
  }
}


export default function* sizesSaga() {
  yield takeLatest(getSizesRequest, getSizes);
  yield takeLatest(postSizesRequest, postSizes);
  yield takeLatest(updateSizesRequest, updateSizes);
  yield takeLatest(deleteSizesRequest, deleteSizes);
}
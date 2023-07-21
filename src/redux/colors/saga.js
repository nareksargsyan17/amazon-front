import {
  getColorsFailure,
  getColorsRequest,
  getColorsSuccess
} from './actions'
import {instance} from "../../configs/axiosInstance";
import {put, takeEvery} from "redux-saga/effects";


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


export default function* colorsSaga() {
  yield takeEvery(getColorsRequest, getColors);
}
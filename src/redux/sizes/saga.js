import {
  getSizesRequest,
  getSizesSuccess,
  getSizesFailure
} from './actions'
import {instance} from "../../configs/axiosInstance";
import {put, takeEvery} from "redux-saga/effects";


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


export default function* sizesSaga() {
  yield takeEvery(getSizesRequest, getSizes);
}
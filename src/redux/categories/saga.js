import {
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFailure
} from './actions'
import {instance} from "../../configs/axiosInstance";
import {put, takeEvery} from "redux-saga/effects";


function* getCategories() {
  try {
    const response = yield instance({
      method: "get",
      url: "/guest/categories/get_all"
    })
    if (response.status === 200) {
      yield put(getCategoriesSuccess(response.data.data));
    } else {
      yield put(getCategoriesFailure(response.data.message));
    }
  } catch (error) {
      yield put(getCategoriesFailure(error.message));
  }
}


export default function* categoriesSaga() {
  yield takeEvery(getCategoriesRequest, getCategories);
}
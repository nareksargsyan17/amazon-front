import {
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFailure,
  postCategoriesSuccess,
  postCategoriesFailure,
  postCategoriesRequest,
  updateCategoriesSuccess,
  updateCategoriesFailure,
  updateCategoriesRequest,
  deleteCategoriesSuccess,
  deleteCategoriesFailure,
  deleteCategoriesRequest
} from './actions'
import {instance} from "../../configs/axiosInstance";
import {put, takeLatest} from "redux-saga/effects";


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


function* postCategories(action) {
  try {
    const response = yield instance({
      method: "post",
      url: "/admin/categories/add",
      data: action.payload
    })
    console.log(response)
    if (response.status === 200) {
      console.log(response.data);
      yield put(postCategoriesSuccess(response.data.successMessage));
    } else {
      yield put(postCategoriesFailure(response.data.message));
    }
  } catch (error) {
    console.log(error)
    yield put(postCategoriesFailure(error.response.data.message));
  }
}

function* updateCategories({ payload }) {
  try {
    const response = yield instance({
      method: "put",
      url: "/admin/categories/update/" + payload.id,
      data: payload.data
    })
    console.log(response)
    if (response.status === 200) {
      yield put(updateCategoriesSuccess(response.data.successMessage));
    } else {
      yield put(updateCategoriesFailure(response.data.message));
    }
  } catch (error) {
    console.log(error)
    yield put(updateCategoriesFailure(error.response.data.message));
  }
}

function* deleteCategories({ payload }) {
  try {
    const response = yield instance({
      method: "delete",
      url: "/admin/categories/delete/" + payload,
    })
    console.log(response)
    if (response.status === 200) {
      yield put(deleteCategoriesSuccess(response.data.successMessage));
    } else {
      yield put(deleteCategoriesFailure(response.data.message));
    }
  } catch (error) {
    console.log(error)
    yield put(deleteCategoriesFailure(error.response.data.message));
  }
}

export default function* categoriesSaga() {
  yield takeLatest(getCategoriesRequest, getCategories);
  yield takeLatest(postCategoriesRequest, postCategories);
  yield takeLatest(updateCategoriesRequest, updateCategories);
  yield takeLatest(deleteCategoriesRequest, deleteCategories);

}
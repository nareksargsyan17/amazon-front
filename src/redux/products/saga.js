import { put, takeEvery } from 'redux-saga/effects'
import {
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,
} from './actions'
import {instance} from "../../configs/axiosInstance";

function* getProducts(action) {
  try {
    const {id, page, limit, sortDirection, sortWith, searchBy, color, size} = action.payload;
    console.log(color, "aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    const response = yield instance({
        method: "get",
        url: `/guest/products/get_all_published/${id}?page=${page}&limit=${limit}&sortDirection=${sortDirection}&sortWith=${sortWith}&searchBy=${searchBy}&color=${JSON.stringify(color)}&size=${JSON.stringify(size)}`
      })

    console.log(response)
    if (response.status === 200) {
      yield put(getProductsSuccess(response.data.data))
    } else {
      yield put(getProductsFailure(response.data.message))
    }
  } catch (e) {
    yield put(getProductsFailure(e.message))
  }
}


export default function* productsSaga() {
  yield takeEvery(getProductsRequest, getProducts)
}
import { put, takeEvery } from 'redux-saga/effects'
import {
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,
} from './actions'
import {instance} from "../../configs/axiosInstance";

function* getProducts(connectName, id= "all", page= 1, limit= 10, sortDirection = "DESC", sortWith = "price", searchBy= "") {
  try {
    console.log(id, page)

    const response = yield instance({
        method: "get",
        url: `/guest/products/get_all_published/${id}?page=${page}&limit=${limit}&sortDirection=${sortDirection}&sortWith=${sortWith}&searchBy=${searchBy}`
      })

    console.log(id)
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
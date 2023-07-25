import { put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,
  getProductSuccess,
  getProductRequest,
  getProductFailure,
  getCartsProductsSuccess,
  getCartsProductsFailure, getCartsProductsRequest,
} from './actions'
import {instance} from "../../configs/axiosInstance";

function* getProducts(action) {
  try {
    const {id, page, limit, sortDirection, sortWith, searchBy, color, size} = action.payload;
    const response = yield instance({
        method: "get",
        url: `/guest/products/get_all_published/${id}?page=${page}&limit=${limit}&sortDirection=${sortDirection}&sortWith=${sortWith}&searchBy=${searchBy}&color=${JSON.stringify(color)}&size=${JSON.stringify(size)}`
    })
    if (response.status === 200) {
      yield put(getProductsSuccess(response.data.data))
    } else {
      yield put(getProductsFailure(response.data.message))
    }
  } catch (e) {
    yield put(getProductsFailure(e.message))
  }
}

function* getProduct(action) {
  try {
    const { productId } = action.payload;
    const response = yield instance({
      method: "get",
      url: `/guest/products/get/${productId}`
    })
    if (response.status === 200) {
      yield put(getProductSuccess(response.data.data))
    } else {
      yield put(getProductFailure(response.data.message))
    }
  } catch (error) {
    yield put(getProductFailure(error.message))
  }
}

function* getCartsProducts(action) {
  try {

    const response = yield instance({
      method: "post",
      url: `/guest/products/get_cart_products`,
      data: action.payload
    })
    if (response.status === 200) {
      yield put(getCartsProductsSuccess(response.data.data))
    } else {
      yield put(getCartsProductsFailure(response.data.message))
    }
  } catch (e) {
    yield put(getCartsProductsFailure(e.message))
  }
}

export default function* productsSaga() {
  yield takeEvery(getProductsRequest, getProducts);
  yield takeLatest(getProductRequest, getProduct);
  yield takeLatest(getCartsProductsRequest, getCartsProducts);

}
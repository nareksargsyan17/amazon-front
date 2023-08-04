import { put, takeLatest } from 'redux-saga/effects'
import {
  postSessionSuccess,
  postSessionFailure,
  postSessionRequest,
  getOrdersSuccess,
  getOrdersFailure,
  getOrdersRequest,
} from './actions'
import {instance} from "../../configs/axiosInstance";


function* postSession({payload}) {
  try {
    console.log(payload)
    const response = yield instance({
      method: "post",
      url: `/user/orders/create-checkout-session`,
      data: payload
    })
    console.log(response)
    if (response.status === 200) {
      yield put(postSessionSuccess(response.data.data))
    } else {
      yield put(postSessionFailure(response.data.message))
    }
  } catch (error) {
    yield put(postSessionFailure(error.message))
  }
}

function* getOrders() {
  try {
    const response = yield instance({
      method: "get",
      url: `/user/orders/get_orders`
    })
    console.log(response.data.data)
    if (response.status === 200) {
      yield put(getOrdersSuccess(response.data.data))
    } else {
      yield put(getOrdersFailure(response.data.message))
    }
  } catch (error) {
    yield put(getOrdersFailure(error.message))
  }
}


export default function* ordersSaga() {
  yield takeLatest(postSessionRequest, postSession);
  yield takeLatest(getOrdersRequest, getOrders);

}
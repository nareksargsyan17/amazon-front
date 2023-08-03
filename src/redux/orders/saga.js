import { put, takeLatest } from 'redux-saga/effects'
import {
  postSessionSuccess,
  postSessionFailure,
  postSessionRequest, postWebhookSuccess, postWebhookFailure, postWebhookRequest,
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

function* postWebhook() {
  try {
    const response = yield instance({
      method: "post",
      url: `/user/orders/webhook`
    })
    console.log(response)
    if (response.status === 200) {
      yield put(postWebhookSuccess(response.data.data))
    } else {
      yield put(postWebhookFailure(response.data.message))
    }
  } catch (error) {
    yield put(postWebhookFailure(error.message))
  }
}


export default function* ordersSaga() {
  yield takeLatest(postSessionRequest, postSession);
  yield takeLatest(postWebhookRequest, postWebhook);

}
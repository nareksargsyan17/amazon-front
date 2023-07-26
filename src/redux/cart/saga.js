import {
  postCartBulkSuccess,
  postCartBulkRequest,
  postCartBulkFailure,
  postCartRequest,
  postCartSuccess,
  postCartFailure
} from './actions'
import {instance} from "../../configs/axiosInstance";
import {put, takeEvery} from "redux-saga/effects";


function* addToCartBulk(action) {
  try {
    const response = yield instance({
      method: "post",
      url: "/guest/cart/add_bulk",
      data: action.payload.data,
    })
    if (response.status === 200) {
      yield put(postCartBulkSuccess(response.data.successMessage));
    } else {
      yield put(postCartBulkFailure(response.data.message));
    }
  } catch (error) {
      yield put(postCartBulkFailure(error.message));
  }
}

function* addToCart(action) {
  try {
    const response = yield instance({
      method: "post",
      url: "/user/cart/add",
      data: action.payload.data,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + action.payload.token
      }
    })
    console.log(response)
    if (response.status === 200) {
      yield put(postCartSuccess(response.data.successMessage));
    } else {
      yield put(postCartFailure(response.data.message));
    }
  } catch (error) {
    yield put(postCartFailure(error.message));
  }
}


export default function* cartSaga() {
  yield takeEvery(postCartBulkRequest, addToCartBulk);
  yield takeEvery(postCartRequest, addToCart);

}
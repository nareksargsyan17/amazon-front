import {
  postCartBulkSuccess,
  postCartBulkRequest,
  postCartBulkFailure,
  postCartRequest,
  postCartSuccess,
  postCartFailure,
  getCartRequest,
  getCartSuccess,
  getCartFailure,
  updateCartSuccess,
  updateCartFailure,
  updateCartRequest, deleteCartSuccess, deleteCartFailure, deleteCartRequest
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
    if (response.status === 200) {
      yield put(postCartSuccess(response.data.successMessage));
    } else {
      yield put(postCartFailure(response.data.message));
    }
  } catch (error) {
    yield put(postCartFailure(error.message));
  }
}

function* getCartProducts(action) {
  try {
    const response = yield instance({
      method: "get",
      url: "/user/cart/get_carts",
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + action.payload
      }
    })
    if (response.status === 200) {
      yield put(getCartSuccess(response.data.data));
    } else {
      yield put(getCartFailure(response.data.message));
    }
  } catch (error) {
    yield put(getCartFailure(error.message));
  }
}

function* updateCart (action) {
  try {
    const response = yield instance({
      method: "put",
      url: "/user/cart/update/" + action.payload.id,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + action.payload.token
      },
      data: action.payload.data
    })
    if (response.status === 200) {
      yield put(updateCartSuccess(response.data.data));
    } else {
      yield put(updateCartFailure(response.data.message));
    }
  } catch (error) {
    yield put(updateCartFailure(error.message));
  }
}
function* deleteCart (action) {
  try {
    const response = yield instance({
      method: "delete",
      url: "/user/cart/delete/" + action.payload.id,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + action.payload.token
      }
    })
    if (response.status === 200) {
      yield put(deleteCartSuccess(response.data.data));
    } else {
      yield put(deleteCartFailure(response.data.message));
    }
  } catch (error) {
    yield put(deleteCartFailure(error.message));
  }
}

export default function* cartSaga() {
  yield takeEvery(postCartBulkRequest, addToCartBulk);
  yield takeEvery(postCartRequest, addToCart);
  yield takeEvery(getCartRequest, getCartProducts);
  yield takeEvery(updateCartRequest, updateCart);
  yield takeEvery(deleteCartRequest, deleteCart);
}
import {
  getAddressesRequest,
  getAddressesSuccess,
  getAddressesFailure,
  changeAddressSuccess,
  changeAddressFailure,
  changeAddressRequest,
  deleteAddressSuccess,
  deleteAddressFailure, deleteAddressRequest
} from './actions'
import {instance} from "../../configs/axiosInstance";
import {put, takeEvery} from "redux-saga/effects";


function* getAddresses(action) {
  try {
    const response = yield instance({
      method: "get",
      url: "/user/addresses/get_all",
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + action.payload
      },
    })
    if (response.status === 200) {
      yield put(getAddressesSuccess(response.data.data));
    } else {
      yield put(getAddressesFailure(response.data.message));
    }
  } catch (error) {
      yield put(getAddressesFailure(error.message));
  }
}

function* changeAddressIsMain(action) {
  try {
    const response = yield instance({
      method: "put",
      url: "/user/addresses/update/" + action.payload.id,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + action.payload.token
      },
    })
    if (response.status === 200) {
      yield put(changeAddressSuccess(response.data.data));
    } else {
      yield put(changeAddressFailure(response.data.message));
    }
  } catch (error) {
    yield put(changeAddressFailure(error.message));
  }
}

function* deleteAddress (action) {
  try {
    const response = yield instance({
      method: "delete",
      url: "/user/addresses/delete/" + action.payload.id,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + action.payload.token
      },
    })
    if (response.status === 200) {
      yield put(deleteAddressSuccess(response.data.successMessage));
    } else {
      yield put(deleteAddressFailure(response.data.message));
    }
  } catch (error) {
    yield put(deleteAddressFailure(error.message));
  }
}

export default function* addressesSaga() {
  yield takeEvery(getAddressesRequest, getAddresses);
  yield takeEvery(changeAddressRequest, changeAddressIsMain);
  yield takeEvery(deleteAddressRequest, deleteAddress);

}
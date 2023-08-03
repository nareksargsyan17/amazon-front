import { put, takeLatest } from 'redux-saga/effects'
import {
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,
  getProductSuccess,
  getProductRequest,
  getProductFailure,
  getCartsProductsSuccess,
  getCartsProductsFailure,
  getCartsProductsRequest,
  getUserProductsRequest,
  getUserProductsSuccess,
  getUserProductsFailure,
  postProductRequest,
  uploadProductRequest,
  postProductSuccess,
  postProductFailure,
  uploadProductSuccess,
  uploadProductFailure,
  deleteProductSuccess,
  deleteProductFailure,
  deleteProductRequest,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  deleteImageRequest,
  deleteImageSuccess, deleteImageFailure,
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

function* getUserProducts() {
  try {
    const response = yield instance({
      method: "get",
      url: `/user/products/get_all`
    })
    if (response.status === 200) {
      yield put(getUserProductsSuccess(response.data.data))
    } else {
      yield put(getUserProductsFailure(response.data.message))
    }
  } catch (e) {
    yield put(getUserProductsFailure(e.message))
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

function* postProduct(action) {
  try {
    const response = yield instance({
      method: "post",
      url: `/user/products/add`,
      data: action.payload
    })
    if (response.status === 200) {
      yield put(postProductSuccess(response.data.data))
    } else {
      yield put(postProductFailure(response.data.message))
    }
  } catch (error) {
    yield put(postProductFailure(error.message))
  }
}

function* uploadImages({ payload }) {
  try {
    const {formData, id} = payload;
    const response = yield instance.post(`/user/products/upload_images/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    console.log(response)
    if (response.status === 200) {
      yield put(uploadProductSuccess(response.data.successMessage))
    } else {
      yield put(uploadProductFailure(response.data.message))
    }
  } catch (error) {
    yield put(uploadProductFailure(error.message))
  }
}

function* deleteImage({ payload }) {
  try {
    console.log(payload)
    const response = yield instance.delete(`/user/products/delete_image/${payload}`)
    if (response.status === 200) {
      yield put(deleteImageSuccess(response.data.successMessage))
    } else {
      yield put(deleteImageFailure(response.data.message))
    }
  } catch (error) {
    yield put(deleteImageFailure(error.message))
  }
}


function* deleteProduct(action) {
  try {
    const response = yield instance({
      method: "delete",
      url: `/user/products/delete/` + action.payload,
    })
    if (response.status === 200) {
      yield put(deleteProductSuccess(response.data.successMessage))
    } else {
      yield put(deleteProductFailure(response.data.message))
    }
  } catch (error) {
    yield put(deleteProductFailure(error.message))
  }
}

function* updateProduct(action) {
  try {
    const response = yield instance({
      method: "put",
      url: `/user/products/update/` + action.payload.id,
      data: action.payload.data
    })
    if (response.status === 200) {
      yield put(updateProductSuccess(response.data.successMessage))
    } else {
      yield put(updateProductFailure(response.data.message))
    }
  } catch (error) {
    yield put(updateProductFailure(error.message))
  }
}

export default function* productsSaga() {
  yield takeLatest(getProductsRequest, getProducts);
  yield takeLatest(getProductRequest, getProduct);
  yield takeLatest(getCartsProductsRequest, getCartsProducts);
  yield takeLatest(getUserProductsRequest, getUserProducts);
  yield takeLatest(postProductRequest, postProduct);
  yield takeLatest(uploadProductRequest, uploadImages);
  yield takeLatest(deleteProductRequest, deleteProduct);
  yield takeLatest(updateProductRequest, updateProduct);
  yield takeLatest(deleteImageRequest, deleteImage);
}
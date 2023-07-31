import { createAction } from "redux-actions";

export const getProductsRequest = createAction("GET_PRODUCTS_REQUEST")
export const getProductsSuccess = createAction("GET_PRODUCTS_SUCCESS")
export const getProductsFailure = createAction("GET_PRODUCTS_FAILURE")

export const changeFilterRequest = createAction("CHANGE_FILTER_REQUEST")


export const getProductRequest = createAction("GET_PRODUCT_REQUEST")
export const getProductSuccess = createAction("GET_PRODUCT_SUCCESS")
export const getProductFailure = createAction("GET_PRODUCT_FAILURE")

export const changeCartCountRequest = createAction("CHANGE_CART_COUNT_REQUEST")

export const getCartsProductsRequest = createAction("GET_CARTS_PRODUCTS_REQUEST")
export const getCartsProductsSuccess = createAction("GET_CARTS_PRODUCTS_SUCCESS")
export const getCartsProductsFailure = createAction("GET_CARTS_PRODUCTS_FAILURE")

export const getUserProductsRequest = createAction("GET_USER_PRODUCTS_REQUEST")
export const getUserProductsSuccess = createAction("GET_USER_PRODUCTS_SUCCESS")
export const getUserProductsFailure = createAction("GET_USER_PRODUCTS_FAILURE")


export const postProductRequest = createAction("POST_PRODUCT_REQUEST")
export const postProductSuccess = createAction("POST_PRODUCT_SUCCESS")
export const postProductFailure = createAction("POST_PRODUCT_FAILURE")

export const uploadProductRequest = createAction("UPLOAD_PRODUCT_REQUEST")
export const uploadProductSuccess = createAction("UPLOAD_PRODUCT_SUCCESS")
export const uploadProductFailure = createAction("UPLOAD_PRODUCT_FAILURE")
import { createAction } from "redux-actions";

export const getProductsRequest = createAction("GET_PRODUCTS_REQUEST")
export const getProductsSuccess = createAction("GET_PRODUCTS_SUCCESS")
export const getProductsFailure = createAction("GET_PRODUCTS_FAILURE")
export const changeFilterRequest = createAction("CHANGE_FILTER_REQUEST")


export const getProductRequest = createAction("GET_PRODUCT_REQUEST")
export const getProductSuccess = createAction("GET_PRODUCT_SUCCESS")
export const getProductFailure = createAction("GET_PRODUCT_FAILURE")
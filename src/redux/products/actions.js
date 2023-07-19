import { createAction } from "redux-actions";

export const getProductsRequest = createAction("GET_PRODUCTS_REQUEST")
export const getProductsSuccess = createAction("GET_PRODUCTS_SUCCESS")
export const getProductsFailure = createAction("GET_PRODUCTS_FAILURE")
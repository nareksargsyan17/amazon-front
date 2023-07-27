import { createAction } from "redux-actions";

export const postCartBulkRequest = createAction("POST_CART_BULK_REQUEST")
export const postCartBulkSuccess = createAction("POST_CART_BULK_SUCCESS")
export const postCartBulkFailure = createAction("POST_CART_BULK_FAILURE")

export const postCartRequest = createAction("POST_CART_REQUEST")
export const postCartSuccess = createAction("POST_CART_SUCCESS")
export const postCartFailure = createAction("POST_CART_FAILURE")

export const getCartRequest = createAction("GET_CART_REQUEST")
export const getCartSuccess = createAction("GET_CART_SUCCESS")
export const getCartFailure = createAction("GET_CART_FAILURE")

export const updateCartRequest = createAction("UPDATE_CART_REQUEST")
export const updateCartSuccess = createAction("UPDATE_CART_SUCCESS")
export const updateCartFailure = createAction("UPDATE_CART_FAILURE")

export const deleteCartRequest = createAction("DELETE_CART_REQUEST")
export const deleteCartSuccess = createAction("DELETE_CART_SUCCESS")
export const deleteCartFailure = createAction("DELETE_CART_FAILURE")
import { createAction } from "redux-actions";

export const postCartBulkRequest = createAction("POST_CART_BULK_REQUEST")
export const postCartBulkSuccess = createAction("POST_CART_BULK_SUCCESS")
export const postCartBulkFailure = createAction("POST_CART_BULK_FAILURE")

export const postCartRequest = createAction("POST_CART_REQUEST")
export const postCartSuccess = createAction("POST_CART_SUCCESS")
export const postCartFailure = createAction("POST_CART_FAILURE")
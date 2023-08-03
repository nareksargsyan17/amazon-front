import { createAction } from "redux-actions";

export const getProductsRequest = createAction("GET_PRODUCTS_REQUEST")
export const getProductsSuccess = createAction("GET_PRODUCTS_SUCCESS")
export const getProductsFailure = createAction("GET_PRODUCTS_FAILURE")

export const changeFilterRequest = createAction("CHANGE_FILTER_REQUEST")


export const addCartProducts = createAction("ADD_CART_PRODUCTS")

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

export const deleteProductRequest = createAction("DELETE_PRODUCT_REQUEST")
export const deleteProductSuccess = createAction("DELETE_PRODUCT_SUCCESS")
export const deleteProductFailure = createAction("DELETE_PRODUCT_FAILURE")


export const updateProductRequest = createAction("UPDATE_PRODUCT_REQUEST")
export const updateProductSuccess = createAction("UPDATE_PRODUCT_SUCCESS")
export const updateProductFailure = createAction("UPDATE_PRODUCT_FAILURE")

export const deleteImageRequest = createAction("DELETE_IMAGE_REQUEST")
export const deleteImageSuccess = createAction("DELETE_IMAGE_SUCCESS")
export const deleteImageFailure = createAction("DELETE_IMAGE_FAILURE")
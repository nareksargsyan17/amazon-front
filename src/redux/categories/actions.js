import { createAction } from "redux-actions";

export const getCategoriesRequest = createAction("GET_CATEGORIES_REQUEST")
export const getCategoriesSuccess = createAction("GET_CATEGORIES_SUCCESS")
export const getCategoriesFailure = createAction("GET_CATEGORIES_FAILURE")

export const postCategoriesRequest = createAction("POST_CATEGORIES_REQUEST")
export const postCategoriesSuccess = createAction("POST_CATEGORIES_SUCCESS")
export const postCategoriesFailure = createAction("POST_CATEGORIES_FAILURE")

export const updateCategoriesRequest = createAction("UPDATE_CATEGORIES_REQUEST")
export const updateCategoriesSuccess = createAction("UPDATE_CATEGORIES_SUCCESS")
export const updateCategoriesFailure = createAction("UPDATE_CATEGORIES_FAILURE")

export const deleteCategoriesRequest = createAction("DELETE_CATEGORIES_REQUEST")
export const deleteCategoriesSuccess = createAction("DELETE_CATEGORIES_SUCCESS")
export const deleteCategoriesFailure = createAction("DELETE_CATEGORIES_FAILURE")
import { createAction } from "redux-actions";

export const getCategoriesRequest = createAction("GET_CATEGORIES_REQUEST")
export const getCategoriesSuccess = createAction("GET_CATEGORIES_SUCCESS")
export const getCategoriesFailure = createAction("GET_CATEGORIES_FAILURE")
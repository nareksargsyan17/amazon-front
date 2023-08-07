import { createAction } from "redux-actions";

export const getSizesRequest = createAction("GET_SIZES_REQUEST")
export const getSizesSuccess = createAction("GET_SIZES_SUCCESS")
export const getSizesFailure = createAction("GET_SIZES_FAILURE")

export const postSizesRequest = createAction("POST_SIZES_REQUEST")
export const postSizesSuccess = createAction("POST_SIZES_SUCCESS")
export const postSizesFailure = createAction("POST_SIZES_FAILURE")

export const updateSizesRequest = createAction("UPDATE_SIZES_REQUEST")
export const updateSizesSuccess = createAction("UPDATE_SIZES_SUCCESS")
export const updateSizesFailure = createAction("UPDATE_SIZES_FAILURE")

export const deleteSizesRequest = createAction("DELETE_SIZES_REQUEST")
export const deleteSizesSuccess = createAction("DELETE_SIZES_SUCCESS")
export const deleteSizesFailure = createAction("DELETE_SIZES_FAILURE")


export const changeSize = createAction("CHANGE_SIZE")
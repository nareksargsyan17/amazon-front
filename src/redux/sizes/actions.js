import { createAction } from "redux-actions";

export const getSizesRequest = createAction("GET_SIZES_REQUEST")
export const getSizesSuccess = createAction("GET_SIZES_SUCCESS")
export const getSizesFailure = createAction("GET_SIZES_FAILURE")
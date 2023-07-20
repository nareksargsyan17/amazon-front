import { createAction } from "redux-actions";

export const getColorsRequest = createAction("GET_COLORS_REQUEST")
export const getColorsSuccess = createAction("GET_COLORS_SUCCESS")
export const getColorsFailure = createAction("GET_COLORS_FAILURE")
import { createAction } from "redux-actions";

export const getColorsRequest = createAction("GET_COLORS_REQUEST")
export const getColorsSuccess = createAction("GET_COLORS_SUCCESS")
export const getColorsFailure = createAction("GET_COLORS_FAILURE")


export const postColorsRequest = createAction("POST_COLORS_REQUEST")
export const postColorsSuccess = createAction("POST_COLORS_SUCCESS")
export const postColorsFailure = createAction("POST_COLORS_FAILURE")

export const updateColorsRequest = createAction("UPDATE_COLORS_REQUEST")
export const updateColorsSuccess = createAction("UPDATE_COLORS_SUCCESS")
export const updateColorsFailure = createAction("UPDATE_COLORS_FAILURE")

export const deleteColorsRequest = createAction("DELETE_COLORS_REQUEST")
export const deleteColorsSuccess = createAction("DELETE_COLORS_SUCCESS")
export const deleteColorsFailure = createAction("DELETE_COLORS_FAILURE")

export const changeColor= createAction("CHANGE_COLOR")

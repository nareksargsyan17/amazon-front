import { createAction } from "redux-actions";

export const deleteAddressRequest = createAction("DELETE_ADDRESS_REQUEST")
export const deleteAddressSuccess = createAction("DELETE_ADDRESS_SUCCESS")
export const deleteAddressFailure = createAction("DELETE_ADDRESS_FAILURE")

export const getAddressesRequest = createAction("GET_ADDRESSES_REQUEST")
export const getAddressesSuccess = createAction("GET_ADDRESSES_SUCCESS")
export const getAddressesFailure = createAction("GET_ADDRESSES_FAILURE")

export const checkAddressIsMain = createAction("CHECK_ADDRESS_IS_MAIN")

export const postAddressRequest = createAction("POST_ADDRESS_REQUEST")
export const postAddressSuccess = createAction("POST_ADDRESS_SUCCESS")
export const postAddressFailure = createAction("POST_ADDRESS_FAILURE")

export const changeAddressRequest = createAction("CHANGE_ADDRESS_REQUEST")
export const changeAddressSuccess = createAction("CHANGE_ADDRESS_SUCCESS")
export const changeAddressFailure = createAction("CHANGE_ADDRESS_FAILURE")
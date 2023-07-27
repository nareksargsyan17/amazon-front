import {handleActions} from "redux-actions";
import {
  getAddressesRequest,
  getAddressesSuccess,
  getAddressesFailure,
  checkAddressIsMain,
  changeAddressRequest,
  changeAddressSuccess,
  changeAddressFailure,
  deleteAddressRequest,
  deleteAddressSuccess,
  deleteAddressFailure
} from './actions'

const defaultState = {
  isDeleteAddressRequest: false,
  isDeleteAddressSuccess: false,
  isDeleteAddressFailure: false,
  isGetAddressesRequest: false,
  isGetAddressesSuccess: false,
  isGetAddressesFailure: false,
  isPostLoginRequest: false,
  isPostLoginSuccess: false,
  isPostLoginFailure: false,
  isChangeAddressRequest: false,
  isChangeAddressSuccess: false,
  isChangeAddressFailure: false,
  addresses: [],
  isMainId: 0,
  successMessage: "",
  errorMessage: '',
}

const reducer = handleActions(
  {
    [getAddressesRequest]: (
      state
    ) => ({
      ...state,
      isGetAddressesRequest: true,
      isGetAddressesSuccess: false,
      isGetAddressesFailure: false,
    }),
    [getAddressesSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isGetAddressesRequest: false,
      isGetAddressesSuccess: true,
      isGetAddressesFailure: false,
      addresses: payload,
    }),
    [getAddressesFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetAddressesRequest: false,
      isGetAddressesSuccess: false,
      isGetAddressesFailure: true,
      errorMessage: payload
    }),
    [changeAddressRequest]: (
      state
    ) => ({
      ...state,
      isChangeAddressRequest: true,
      isChangeAddressSuccess: false,
      isChangeAddressFailure: false,
    }),
    [changeAddressSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isChangeAddressRequest: false,
      isChangeAddressSuccess: true,
      isChangeAddressFailure: false,
      isMainId: payload,
    }),
    [changeAddressFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isChangeAddressRequest: false,
      isChangeAddressSuccess: false,
      isChangeAddressFailure: true,
      errorMessage: payload
    }),
    [deleteAddressRequest]: (
      state
    ) => ({
      ...state,
      isDeleteAddressRequest: true,
      isDeleteAddressSuccess: false,
      isDeleteAddressFailure: false,
    }),
    [deleteAddressSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isDeleteAddressRequest: false,
      isDeleteAddressSuccess: true,
      isDeleteAddressFailure: false,
      successMessage: payload,
    }),
    [deleteAddressFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isDeleteAddressRequest: false,
      isDeleteAddressSuccess: false,
      isDeleteAddressFailure: true,
      errorMessage: payload
    }),
    [checkAddressIsMain]: (
      state,
      { payload }
    ) => ({
      ...state,
      isMainId: payload
    }),
  },
  defaultState
);

export default reducer
import {handleActions} from "redux-actions";
import {
  postCartBulkSuccess,
  postCartBulkRequest,
  postCartBulkFailure,
  postCartRequest,
  postCartSuccess,
  postCartFailure,
  getCartRequest,
  getCartSuccess,
  getCartFailure,
  updateCartRequest,
  updateCartSuccess,
  updateCartFailure, deleteCartRequest, deleteCartSuccess, deleteCartFailure
} from './actions'

const defaultState = {
  isPostCartBulkRequest: false,
  isPostCartBulkSuccess: false,
  isPostCartBulkFailure: false,
  isPostCartRequest: false,
  isPostCartSuccess: false,
  isPostCartFailure: false,
  isGetCartRequest: false,
  isGetCartSuccess: false,
  isGetCartFailure: false,
  isUpdateCartRequest: false,
  isUpdateCartSuccess: false,
  isUpdateCartFailure: false,
  isDeleteCartRequest: false,
  isDeleteCartSuccess: false,
  isDeleteCartFailure: false,
  cartsData: {},
  updatedCart: {},
  cartCount: 0,
  deletedCartId: 0,
  successMessage: "",
  errorMessage: '',
}

const reducer = handleActions(
  {
    [postCartBulkRequest]: (
      state
    ) => ({
      ...state,
      isPostCartBulkRequest: true,
      isPostCartBulkSuccess: false,
      isPostCartBulkFailure: false,
    }),
    [postCartBulkSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isPostCartBulkRequest: false,
      isPostCartBulkSuccess: true,
      isPostCartBulkFailure: false,
      successMessage: payload,
    }),
    [postCartBulkFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isPostCartBulkRequest: false,
      isPostCartBulkSuccess: false,
      isPostCartBulkFailure: true,
      errorMessage: payload
    }),
    [postCartRequest]: (
      state
    ) => ({
      ...state,
      isPostCartRequest: true,
      isPostCartSuccess: false,
      isPostCartFailure: false,
    }),
    [postCartSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isPostCartRequest: false,
      isPostCartSuccess: true,
      isPostCartFailure: false,
      successMessage: payload,
    }),
    [postCartFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isPostCartRequest: false,
      isPostCartSuccess: false,
      isPostCartFailure: true,
      errorMessage: payload
    }),
    [getCartRequest]: (
      state
    ) => ({
      ...state,
      isGetCartRequest: true,
      isGetCartSuccess: false,
      isGetCartFailure: false,
    }),
    [getCartSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isGetCartRequest: false,
      isGetCartSuccess: true,
      isGetCartFailure: false,
      cartsData: payload,
    }),
    [getCartFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetCartRequest: false,
      isGetCartSuccess: false,
      isGetCartFailure: true,
      errorMessage: payload
    }),
    [updateCartRequest]: (
      state
    ) => ({
      ...state,
      isUpdateCartRequest: true,
      isUpdateCartSuccess: false,
      isUpdateCartFailure: false,
    }),
    [updateCartSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isUpdateCartRequest: false,
      isUpdateCartSuccess: true,
      isUpdateCartFailure: false,
      updatedCart: payload,
    }),
    [updateCartFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isUpdateCartRequest: false,
      isUpdateCartSuccess: false,
      isUpdateCartFailure: true,
      errorMessage: payload
    }),
    [deleteCartRequest]: (
      state
    ) => ({
      ...state,
      isDeleteCartRequest: true,
      isDeleteCartSuccess: false,
      isDeleteCartFailure: false,
    }),
    [deleteCartSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isDeleteCartRequest: false,
      isDeleteCartSuccess: true,
      isDeleteCartFailure: false,
      deletedCartId: parseInt(payload),
    }),
    [deleteCartFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isDeleteCartRequest: false,
      isDeleteCartSuccess: false,
      isDeleteCartFailure: true,
      errorMessage: payload
    }),
  },
  defaultState
);

export default reducer
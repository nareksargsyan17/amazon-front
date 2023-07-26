import {handleActions} from "redux-actions";
import {
  postCartBulkSuccess,
  postCartBulkRequest,
  postCartBulkFailure,
  postCartRequest,
  postCartSuccess,
  postCartFailure
} from './actions'

const defaultState = {
  isPostCartBulkRequest: false,
  isPostCartBulkSuccess: false,
  isPostCartBulkFailure: false,
  isPostCartRequest: false,
  isPostCartSuccess: false,
  isPostCartFailure: false,
  cartsData: [],
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
  },
  defaultState
);

export default reducer
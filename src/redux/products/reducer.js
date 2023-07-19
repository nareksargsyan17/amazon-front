import {handleActions} from "redux-actions";
import {
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,
} from './actions'

const defaultState = {
  isGetProductsRequest: false,
  isGetProductsSuccess: false,
  isGetProductsFailure: false,
  products: [],
  errorMessage: '',
}

const reducer = handleActions(
  {
    [getProductsRequest]: (
      state
    ) => ({
      ...state,
      isGetProductsRequest: true,
      isGetProductsSuccess: false,
      isGetProductsFailure: false,
    }),
    [getProductsSuccess]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetProductsRequest: false,
      isGetProductsSuccess: true,
      isGetProductsFailure: false,
      products: payload
    }),
    [getProductsFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetProductsRequest: false,
      isGetProductsSuccess: false,
      isGetProductsFailure: true,
      errorMessage: payload
    }),
  },
  defaultState
);

export default reducer
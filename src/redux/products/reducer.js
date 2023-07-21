import {handleActions} from "redux-actions";
import {
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,
  getProductFailure,
  getProductSuccess,
  getProductRequest,
  changeFilterRequest,
} from './actions'

const defaultState = {
  isGetProductsRequest: false,
  isGetProductsSuccess: false,
  isGetProductsFailure: false,
  isGetProductRequest: false,
  isGetProductSuccess: false,
  isGetProductFailure: false,
  product: {},
  filterState: {id : "all", page: 1, limit: 10, sortDirection : "DESC", sortWith : "id", searchBy: "", color: [], size: []},
  products: {
    rows: []
  },
  errorMessage: '',
}

const reducer = handleActions(
  {
    [changeFilterRequest]: (
      state,
      { payload }
    ) => ({
      filterState: {...state.filterState, ...payload}
    }),
    [getProductsRequest]: (
      state,
    ) => ({
        ...state,
        isGetProductsRequest: true,
        isGetProductsSuccess: false,
        isGetProductsFailure: false,
    }),
    [getProductsSuccess]: (
      state,
      { payload },
    ) => ({
        ...state,
        isGetProductsRequest: false,
        isGetProductsSuccess: true,
        isGetProductsFailure: false,
        products: payload,
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
    [getProductRequest]: (
      state,
    ) => ({
      ...state,
      isGetProductRequest: true,
      isGetProductSuccess: false,
      isGetProductFailure: false,
    }),
    [getProductSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isGetProductRequest: false,
      isGetProductSuccess: true,
      isGetProductFailure: false,
      product: payload,
    }),
    [getProductFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetProductRequest: false,
      isGetProductSuccess: false,
      isGetProductFailure: true,
      errorMessage: payload
    }),
  },
  defaultState
);

export default reducer
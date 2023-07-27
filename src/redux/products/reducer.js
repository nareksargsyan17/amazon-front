import {handleActions} from "redux-actions";
import {
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,
  getProductFailure,
  getProductSuccess,
  getProductRequest,
  changeFilterRequest,
  changeCartCountRequest,
  getCartsProductsRequest,
  getCartsProductsSuccess,
  getCartsProductsFailure,
} from './actions'
import counter from "../../counter/counter";

const defaultState = {
  isGetProductsRequest: false,
  isGetProductsSuccess: false,
  isGetProductsFailure: false,
  isGetProductRequest: false,
  isGetProductSuccess: false,
  isGetProductFailure: false,
  isGetCartsProductRequest: false,
  isGetCartsProductSuccess: false,
  isGetCartsProductFailure: false,
  product: {},
  cartCount: 0,
  filterState: {id : "all", page: 1, limit: 10, sortDirection : "DESC", sortWith : "id", searchBy: "", color: [], size: []},
  products: {
    rows: []
  },
  cartsProducts: {},
  errorMessage: '',
}

const reducer = handleActions(
  {
    [changeCartCountRequest]: (
      state,
      { payload }
    ) => ({
      ...state,
      cartCount: payload
    }),
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
    [getCartsProductsRequest]: (
      state,
    ) => ({
      ...state,
      isGetCartsProductRequest: true,
      isGetCartsProductSuccess: false,
      isGetCartsProductFailure: false,
    }),
    [getCartsProductsSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isGetCartsProductRequest: false,
      isGetCartsProductSuccess: true,
      isGetCartsProductFailure: false,
      cartsProducts: payload,
    }),
    [getCartsProductsFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetCartsProductRequest: false,
      isGetCartsProductSuccess: false,
      isGetCartsProductFailure: true,
      errorMessage: payload
    }),
  },
  defaultState
);

export default reducer
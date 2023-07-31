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
  getUserProductsRequest,
  getUserProductsSuccess,
  getUserProductsFailure,
  postProductRequest,
  postProductSuccess,
  postProductFailure, uploadProductRequest, uploadProductSuccess, uploadProductFailure,

} from './actions'

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
  isGetUserProductsRequest: false,
  isGetUserProductsSuccess: false,
  isGetUserProductsFailure: false,
  isPostProductRequest: false,
  isPostProductSuccess: false,
  isPostProductFailure: false,
  isUploadProductRequest: false,
  isUploadProductSuccess: false,
  isUploadProductFailure: false,
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
    [getUserProductsRequest]: (
      state,
    ) => ({
      ...state,
      isGetUserProductsRequest: true,
      isGetUserProductsSuccess: false,
      isGetUserProductsFailure: false,
    }),
    [getUserProductsSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isGetUserProductsRequest: false,
      isGetUserProductsSuccess: true,
      isGetUserProductsFailure: false,
      products: payload,
    }),
    [getUserProductsFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetUserProductsRequest: false,
      isGetUserProductsSuccess: false,
      isGetUserProductsFailure: true,
      errorMessage: payload
    }),
    [postProductRequest]: (
      state,
    ) => ({
      ...state,
      isPostProductRequest: true,
      isPostProductSuccess: false,
      isPostProductFailure: false,
    }),
    [postProductSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isPostProductRequest: false,
      isPostProductSuccess: true,
      isPostProductFailure: false,
      product: payload,
    }),
    [postProductFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isPostProductRequest: false,
      isPostProductSuccess: false,
      isPostProductFailure: true,
      errorMessage: payload
    }),
    [uploadProductRequest]: (
      state,
    ) => ({
      ...state,
      isUploadProductRequest: true,
      isUploadProductSuccess: false,
      isUploadProductFailure: false,
    }),
    [uploadProductSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isUploadProductRequest: false,
      isUploadProductSuccess: true,
      isUploadProductFailure: false,
      successMessage: payload,
    }),
    [uploadProductFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isUploadProductRequest: false,
      isUploadProductSuccess: false,
      isUploadProductFailure: true,
      errorMessage: payload
    }),
  },
  defaultState
);

export default reducer
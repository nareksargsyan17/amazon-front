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
  postProductFailure,
  uploadProductRequest,
  uploadProductSuccess,
  uploadProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure, deleteImageRequest, deleteImageSuccess, deleteImageFailure, addCartProducts,

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
  isDeleteProductRequest: false,
  isDeleteProductSuccess: false,
  isDeleteProductFailure: false,
  isUpdateProductRequest: false,
  isUpdateProductSuccess: false,
  isUpdateProductFailure: false,
  isDeleteImageRequest: false,
  isDeleteImageSuccess: false,
  isDeleteImageFailure: false,
  product: {},
  cartCount: 0,
  filterState: {id : "all", page: 1, limit: 10, sortDirection : "DESC", sortWith : "id", searchBy: "", color: [], size: []},
  products: {
    rows: []
  },
  cartsProducts: [],
  errorMessage: '',
}

const reducer = handleActions(
  {
    [changeCartCountRequest]: (
      state,
      { payload }
    ) => {
      return (
        ({
          ...state,
          cartCount: payload
        })
      )
    },
    [addCartProducts]: (
      state,
      { payload }
    ) => ({
      ...state,
      cartsProducts: payload
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
      state
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
    [deleteProductRequest]: (
      state,
    ) => ({
      ...state,
      isDeleteProductRequest: true,
      isDeleteProductSuccess: false,
      isDeleteProductFailure: false,
    }),
    [deleteProductSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isDeleteProductRequest: false,
      isDeleteProductSuccess: true,
      isDeleteProductFailure: false,
      successMessage: payload,
    }),
    [deleteProductFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isDeleteProductRequest: false,
      isDeleteProductSuccess: false,
      isDeleteProductFailure: true,
      errorMessage: payload
    }),
    [updateProductRequest]: (
      state,
    ) => ({
      ...state,
      isUpdateProductRequest: true,
      isUpdateProductSuccess: false,
      isUpdateProductFailure: false,
    }),
    [updateProductSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isUpdateProductRequest: false,
      isUpdateProductSuccess: true,
      isUpdateProductFailure: false,
      successMessage: payload,
    }),
    [updateProductFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isUpdateProductRequest: false,
      isUpdateProductSuccess: false,
      isUpdateProductFailure: true,
      errorMessage: payload
    }),
    [deleteImageRequest]: (
      state,
    ) => ({
      ...state,
      isDeleteImageRequest: true,
      isDeleteImageSuccess: false,
      isDeleteImageFailure: false,
    }),
    [deleteImageSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isDeleteImageRequest: false,
      isDeleteImageSuccess: true,
      isDeleteImageFailure: false,
      successMessage: payload,
    }),
    [deleteImageFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isDeleteImageRequest: false,
      isDeleteImageSuccess: false,
      isDeleteImageFailure: true,
      errorMessage: payload
    }),
  },
  defaultState
);

export default reducer
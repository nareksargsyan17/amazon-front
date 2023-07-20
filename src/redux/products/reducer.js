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
  filterState: {id : "all", page: 1, limit: 10, sortDirection : "DESC", sortWith : "id", searchBy: "", color: [], size: []},
  products: {},
  errorMessage: '',
}

const reducer = handleActions(
  {
    [getProductsRequest]: (
      state,
      { payload }
    ) => ({
        ...state,
        isGetProductsRequest: true,
        isGetProductsSuccess: false,
        isGetProductsFailure: false,
        filterState: {...state.filterState, ...payload}
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
  },
  defaultState
);

export default reducer
import {handleActions} from "redux-actions";
import {
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFailure
} from './actions'

const defaultState = {
  isGetCategoriesRequest: false,
  isGetCategoriesSuccess: false,
  isGetCategoriesFailure: false,
  categories: [],
  errorMessage: '',
}

const reducer = handleActions(
  {
    [getCategoriesRequest]: (
      state
    ) => ({
      ...state,
      isGetCategoriesRequest: true,
      isGetCategoriesSuccess: false,
      isGetCategoriesFailure: false,
    }),
    [getCategoriesSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isGetCategoriesRequest: false,
      isGetCategoriesSuccess: true,
      isGetCategoriesFailure: false,
      categories: payload,
    }),
    [getCategoriesFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetCategoriesRequest: false,
      isGetCategoriesSuccess: false,
      isGetCategoriesFailure: true,
      errorMessage: payload
    }),
  },
  defaultState
);

export default reducer
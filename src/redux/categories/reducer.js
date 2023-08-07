import {handleActions} from "redux-actions";
import {
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFailure,
  postCategoriesRequest,
  postCategoriesFailure,
  postCategoriesSuccess,
  updateCategoriesRequest,
  updateCategoriesSuccess,
  updateCategoriesFailure,
  deleteCategoriesRequest,
  deleteCategoriesSuccess,
  deleteCategoriesFailure
} from './actions'

const defaultState = {
  isGetCategoriesRequest: false,
  isGetCategoriesSuccess: false,
  isGetCategoriesFailure: false,
  isPostCategoriesRequest: false,
  isPostCategoriesSuccess: false,
  isPostCategoriesFailure: false,
  isUpdateCategoriesRequest: false,
  isUpdateCategoriesSuccess: false,
  isUpdateCategoriesFailure: false,
  isDeleteCategoriesRequest: false,
  isDeleteCategoriesSuccess: false,
  isDeleteCategoriesFailure: false,
  categories: [],
  successMessage : "",
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
    [postCategoriesRequest]: (
      state
    ) => ({
      ...state,
      isPostCategoriesRequest: true,
      isPostCategoriesSuccess: false,
      isPostCategoriesFailure: false,
    }),
    [postCategoriesSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isPostCategoriesRequest: false,
      isPostCategoriesSuccess: true,
      isPostCategoriesFailure: false,
      successMessage: payload,
    }),
    [postCategoriesFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isPostCategoriesRequest: false,
      isPostCategoriesSuccess: false,
      isPostCategoriesFailure: true,
      errorMessage: payload
    }),
    [updateCategoriesRequest]: (
      state
    ) => ({
      ...state,
      isUpdateCategoriesRequest: true,
      isUpdateCategoriesSuccess: false,
      isUpdateCategoriesFailure: false,
    }),
    [updateCategoriesSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isUpdateCategoriesRequest: false,
      isUpdateCategoriesSuccess: true,
      isUpdateCategoriesFailure: false,
      successMessage: payload,
    }),
    [updateCategoriesFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isUpdateCategoriesRequest: false,
      isUpdateCategoriesSuccess: false,
      isUpdateCategoriesFailure: true,
      errorMessage: payload
    }),
    [deleteCategoriesRequest]: (
      state
    ) => ({
      ...state,
      isDeleteCategoriesRequest: true,
      isDeleteCategoriesSuccess: false,
      isDeleteCategoriesFailure: false,
    }),
    [deleteCategoriesSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isDeleteCategoriesRequest: false,
      isDeleteCategoriesSuccess: true,
      isDeleteCategoriesFailure: false,
      successMessage: payload,
    }),
    [deleteCategoriesFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isDeleteCategoriesRequest: false,
      isDeleteCategoriesSuccess: false,
      isDeleteCategoriesFailure: true,
      errorMessage: payload
    }),
  },
  defaultState
);

export default reducer
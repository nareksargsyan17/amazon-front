import {handleActions} from "redux-actions";
import {
  getSizesFailure,
  getSizesSuccess,
  getSizesRequest,
  postSizesRequest,
  postSizesSuccess,
  postSizesFailure,
  updateSizesRequest,
  updateSizesSuccess,
  updateSizesFailure, changeSize, deleteSizesRequest, deleteSizesSuccess, deleteSizesFailure
} from './actions'

const defaultState = {
  isGetSizesRequest: false,
  isGetSizesSuccess: false,
  isGetSizesFailure: false,
  isPostSizesRequest: false,
  isPostSizesSuccess: false,
  isPostSizesFailure: false,
  isUpdateSizesRequest: false,
  isUpdateSizesSuccess: false,
  isUpdateSizesFailure: false,
  isDeleteSizesRequest: false,
  isDeleteSizesSuccess: false,
  isDeleteSizesFailure: false,
  sizes: [],
  updatedSize: {},
  createdSize: {},
  deletedSizeId: 0,
  errorMessage: '',
}

const reducer = handleActions(
  {
    [changeSize]: (
      state,
      { payload }
    ) => ({
      ...state,
      sizes: payload
    }),
    [getSizesRequest]: (
      state
    ) => ({
      ...state,
      isGetSizesRequest: true,
      isGetSizesSuccess: false,
      isGetSizesFailure: false,
    }),
    [getSizesSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isGetSizesRequest: false,
      isGetSizesSuccess: true,
      isGetSizesFailure: false,
      sizes: payload,
    }),
    [getSizesFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetSizesRequest: false,
      isGetSizesSuccess: false,
      isGetSizesFailure: true,
      errorMessage: payload
    }),
    [postSizesRequest]: (
      state
    ) => ({
      ...state,
      isPostSizesRequest: true,
      isPostSizesSuccess: false,
      isPostSizesFailure: false,
    }),
    [postSizesSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isPostSizesRequest: false,
      isPostSizesSuccess: true,
      isPostSizesFailure: false,
      createdSize: payload,
    }),
    [postSizesFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isPostSizesRequest: false,
      isPostSizesSuccess: false,
      isPostSizesFailure: true,
      errorMessage: payload
    }),
    [updateSizesRequest]: (
      state
    ) => ({
      ...state,
      isUpdateSizesRequest: true,
      isUpdateSizesSuccess: false,
      isUpdateSizesFailure: false,
    }),
    [updateSizesSuccess]: (
      state,
      { payload }
    ) => ({
      ...state,
      isUpdateSizesRequest: false,
      isUpdateSizesSuccess: true,
      isUpdateSizesFailure: false,
      updatedSize: payload,
    }),
    [updateSizesFailure]: (
      state,
      { payload },
    ) => ({
      ...state,
      isUpdateSizesRequest: false,
      isUpdateSizesSuccess: false,
      isUpdateSizesFailure: true,
      errorMessage: payload
    }),
    [deleteSizesRequest]: (
      state
    ) => ({
      ...state,
      isDeleteSizesRequest: true,
      isDeleteSizesSuccess: false,
      isDeleteSizesFailure: false,
    }),
    [deleteSizesSuccess]: (
      state,
      { payload }
    ) => ({
      ...state,
      isDeleteSizesRequest: false,
      isDeleteSizesSuccess: true,
      isDeleteSizesFailure: false,
      deletedSizeId: parseInt(payload),
    }),
    [deleteSizesFailure]: (
      state,
      { payload },
    ) => ({
      ...state,
      isDeleteSizesRequest: false,
      isDeleteSizesSuccess: false,
      isDeleteSizesFailure: true,
      errorMessage: payload
    }),

  },
  defaultState
);

export default reducer
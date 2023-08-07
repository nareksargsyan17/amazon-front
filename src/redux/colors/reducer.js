import {handleActions} from "redux-actions";
import {
  getColorsSuccess,
  getColorsFailure,
  getColorsRequest,
  postColorsRequest,
  postColorsSuccess,
  postColorsFailure,
  updateColorsRequest,
  updateColorsFailure,
  updateColorsSuccess, changeColor, deleteColorsRequest, deleteColorsSuccess, deleteColorsFailure
} from './actions'

const defaultState = {
  isGetColorsRequest: false,
  isGetColorsSuccess: false,
  isGetColorsFailure: false,
  isPostColorsRequest: false,
  isPostColorsSuccess: false,
  isPostColorsFailure: false,
  isUpdateColorsRequest: false,
  isUpdateColorsSuccess: false,
  isUpdateColorsFailure: false,
  isDeleteColorsRequest: false,
  isDeleteColorsSuccess: false,
  isDeleteColorsFailure: false,
  colors: [],
  errorMessage: '',
  changedColor: {},
  deletedColorId: {}
}

const reducer = handleActions(
  {
    [changeColor]: (
      state,
      { payload }
    ) => ({
      ...state,
      changeColor: payload
    }),
    [getColorsRequest]: (
      state
    ) => ({
      ...state,
      isGetColorsRequest: true,
      isGetColorsSuccess: false,
      isGetColorsFailure: false,
    }),
    [getColorsSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isGetColorsRequest: false,
      isGetColorsSuccess: true,
      isGetColorsFailure: false,
      colors: payload,
    }),
    [getColorsFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetColorsRequest: false,
      isGetColorsSuccess: false,
      isGetColorsFailure: true,
      errorMessage: payload
    }),
    [postColorsRequest]: (
      state
    ) => ({
      ...state,
      isPostColorsRequest: true,
      isPostColorsSuccess: false,
      isPostColorsFailure: false,
    }),
    [postColorsSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isPostColorsRequest: false,
      isPostColorsSuccess: true,
      isPostColorsFailure: false,
      colors: [...state.colors, payload],
    }),
    [postColorsFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isPostColorsRequest: false,
      isPostColorsSuccess: false,
      isPostColorsFailure: true,
      errorMessage: payload
    }),
    [updateColorsRequest]: (
      state
    ) => ({
      ...state,
      isUpdateColorsRequest: true,
      isUpdateColorsSuccess: false,
      isUpdateColorsFailure: false,
    }),
    [updateColorsSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isUpdateColorsRequest: false,
      isUpdateColorsSuccess: true,
      isUpdateColorsFailure: false,
      changedColor: payload,
    }),
    [updateColorsFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isUpdateColorsRequest: false,
      isUpdateColorsSuccess: false,
      isUpdateColorsFailure: true,
      errorMessage: payload
    }),
    [deleteColorsRequest]: (
      state
    ) => ({
      ...state,
      isDeleteColorsRequest: true,
      isDeleteColorsSuccess: false,
      isDeleteColorsFailure: false,
    }),
    [deleteColorsSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isDeleteColorsRequest: false,
      isDeleteColorsSuccess: true,
      isDeleteColorsFailure: false,
      deletedColorId: payload,
    }),
    [deleteColorsFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isDeleteColorsRequest: false,
      isDeleteColorsSuccess: false,
      isDeleteColorsFailure: true,
      errorMessage: payload
    }),
  },
  defaultState
);

export default reducer
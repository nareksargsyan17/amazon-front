import {handleActions} from "redux-actions";
import {
  getColorsSuccess,
  getColorsFailure,
  getColorsRequest
} from './actions'

const defaultState = {
  isGetColorsRequest: false,
  isGetColorsSuccess: false,
  isGetColorsFailure: false,
  colors: [],
  errorMessage: '',
}

const reducer = handleActions(
  {
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
  },
  defaultState
);

export default reducer
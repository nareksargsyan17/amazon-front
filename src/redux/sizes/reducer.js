import {handleActions} from "redux-actions";
import {
  getSizesFailure,
  getSizesSuccess,
  getSizesRequest
} from './actions'

const defaultState = {
  isGetSizesRequest: false,
  isGetSizesSuccess: false,
  isGetSizesFailure: false,
  sizes: [],
  errorMessage: '',
}

const reducer = handleActions(
  {
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
  },
  defaultState
);

export default reducer
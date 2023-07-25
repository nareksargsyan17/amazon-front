import {handleActions} from "redux-actions";
import {
  postRegistrationRequest,
  postRegistrationSuccess,
  postRegistrationFailure,
  getVerificationRequest,
  getVerificationSuccess,
  getVerificationFailure,
  postLoginRequest,
  postLoginSuccess,
  postLoginFailure
} from './actions'

const defaultState = {
  isPostRegistrationRequest: false,
  isPostRegistrationSuccess: false,
  isPostRegistrationFailure: false,
  isGetVerificationRequest: false,
  isGetVerificationSuccess: false,
  isGetVerificationFailure: false,
  isPostLoginRequest: false,
  isPostLoginSuccess: false,
  isPostLoginFailure: false,
  userData: {},
  successMessage: "",
  errorMessage: '',
}

const reducer = handleActions(
  {
    [postRegistrationRequest]: (
      state
    ) => ({
      ...state,
      isPostRegistrationRequest: true,
      isPostRegistrationSuccess: false,
      isPostRegistrationFailure: false,
    }),
    [postRegistrationSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isPostRegistrationRequest: false,
      isPostRegistrationSuccess: true,
      isPostRegistrationFailure: false,
      successMessage: payload,
    }),
    [postRegistrationFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isPostRegistrationRequest: false,
      isPostRegistrationSuccess: false,
      isPostRegistrationFailure: true,
      errorMessage: payload
    }),
    [getVerificationRequest]: (
      state
    ) => ({
      ...state,
      isGetCategoriesRequest: true,
      isGetVerificationSuccess: false,
      isGetVerificationFailure: false,
    }),
    [getVerificationSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isGetCategoriesRequest: false,
      isGetVerificationSuccess: true,
      isGetVerificationFailure: false,
      successMessage: payload,
    }),
    [getVerificationFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetCategoriesRequest: false,
      isGetVerificationSuccess: false,
      isGetVerificationFailure: true,
      errorMessage: payload
    }),
    [postLoginRequest]: (
      state
    ) => ({
      ...state,
      isPostLoginRequest: true,
      isPostLoginSuccess: false,
      isPostLoginFailure: false,
    }),
    [postLoginSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isPostLoginRequest: false,
      isPostLoginSuccess: true,
      isPostLoginFailure: false,
      userData: payload,
    }),
    [postLoginFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isPostLoginRequest: false,
      isPostLoginSuccess: false,
      isPostLoginFailure: true,
      errorMessage: payload
    }),
  },
  defaultState
);

export default reducer
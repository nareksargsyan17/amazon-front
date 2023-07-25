import { createAction } from "redux-actions";

export const postRegistrationRequest = createAction("POST_REGISTRATION_REQUEST")
export const postRegistrationSuccess = createAction("POST_REGISTRATION_SUCCESS")
export const postRegistrationFailure = createAction("POST_REGISTRATION_FAILURE")

export const getVerificationRequest = createAction("GET_VERIFICATION_REQUEST")
export const getVerificationSuccess = createAction("GET_VERIFICATION_SUCCESS")
export const getVerificationFailure = createAction("GET_VERIFICATION_FAILURE")

export const postLoginRequest = createAction("POST_LOGIN_REQUEST")
export const postLoginSuccess = createAction("POST_LOGIN_SUCCESS")
export const postLoginFailure = createAction("POST_LOGIN_FAILURE")
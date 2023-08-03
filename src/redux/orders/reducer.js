import {handleActions} from "redux-actions";
import {
  postSessionRequest,
  postSessionSuccess,
  postSessionFailure, postWebhookRequest, postWebhookSuccess, postWebhookFailure

} from './actions'

const defaultState = {
  isPostSessionRequest : false,
  isPostSessionSuccess : false,
  isPostSessionFailure : false,
  isPostWebhookRequest : false,
  isPostWebhookSuccess : false,
  isPostWebhookFailure : false,
  data: {},
  url: "",
  errorMessage: '',
}

const reducer = handleActions(
  {
    [postSessionRequest]: (
      state,
    ) => ({
      ...state,
      isPostSessionRequest : true,
      isPostSessionSuccess : false,
      isPostSessionFailure : false,
    }),
    [postSessionSuccess]: (
      state,
      { payload }
    ) => ({
      ...state,
      isPostSessionRequest : false,
      isPostSessionSuccess : true,
      isPostSessionFailure : false,
      url: payload.url
    }),
    [postSessionFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isPostSessionRequest : false,
      isPostSessionSuccess : false,
      isPostSessionFailure : true,
      errorMessage: payload
    }),
    [postWebhookRequest]: (
      state,
    ) => ({
      ...state,
      isPostWebhookRequest : true,
      isPostWebhookSuccess : false,
      isPostWebhookFailure : false,
    }),
    [postWebhookSuccess]: (
      state,
      { payload }
    ) => ({
      ...state,
      isPostWebhookRequest : false,
      isPostWebhookSuccess : true,
      isPostWebhookFailure : false,
      data: payload
    }),
    [postWebhookFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isPostWebhookRequest : false,
      isPostWebhookSuccess : false,
      isPostWebhookFailure : true,
      errorMessage: payload
    })
  },
  defaultState
);

export default reducer
import {handleActions} from "redux-actions";
import {
  postSessionRequest,
  postSessionSuccess,
  postSessionFailure,
  getOrdersRequest,
  getOrdersSuccess,
  getOrdersFailure

} from './actions'

const defaultState = {
  isPostSessionRequest : false,
  isPostSessionSuccess : false,
  isPostSessionFailure : false,
  isPostWebhookRequest : false,
  isPostWebhookSuccess : false,
  isPostWebhookFailure : false,
  isGetOrdersRequest : false,
  isGetOrdersSuccess : false,
  isGetOrdersFailure : false,
  orders: [],
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
    [getOrdersRequest]: (
      state,
    ) => ({
      ...state,
      isGetOrdersRequest : true,
      isGetOrdersSuccess : false,
      isGetOrdersFailure : false,
    }),
    [getOrdersSuccess]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetOrdersRequest : false,
      isGetOrdersSuccess : true,
      isGetOrdersFailure : false,
      orders: payload
    }),
    [getOrdersFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetOrdersRequest : false,
      isGetOrdersSuccess : false,
      isGetOrdersFailure : true,
      errorMessage: payload
    })
  },
  defaultState
);

export default reducer
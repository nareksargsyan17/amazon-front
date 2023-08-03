import { createAction } from "redux-actions";

export const postSessionRequest = createAction("POST_SESSION_REQUEST")
export const postSessionSuccess = createAction("POST_SESSION_SUCCESS")
export const postSessionFailure = createAction("POST_SESSION_FAILURE")

export const postWebhookRequest = createAction("POST_WEBHOOK_REQUEST")
export const postWebhookSuccess = createAction("POST_WEBHOOK_SUCCESS")
export const postWebhookFailure = createAction("POST_WEBHOOK_FAILURE")
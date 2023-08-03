import { all } from "redux-saga/effects";
import productsSaga from "./products/saga";
import categoriesSaga from "./categories/saga";
import colorsSaga from "./colors/saga";
import sizesSaga from "./sizes/saga";
import authSaga from "./auth/saga";
import cartSaga from "./cart/saga";
import addressesSaga from "./addresses/saga";
import ordersSaga from "./orders/saga";

export default function* rootSaga() {
  yield all([
    productsSaga(),
    categoriesSaga(),
    colorsSaga(),
    sizesSaga(),
    authSaga(),
    cartSaga(),
    addressesSaga(),
    ordersSaga()
  ])
}
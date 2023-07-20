import { all } from "redux-saga/effects";
import productsSaga from "./products/saga";
import categoriesSaga from "./categories/saga";
import colorsSaga from "./colors/saga";
import sizesSaga from "./sizes/saga";

export default function* rootSaga() {
  yield all([
    productsSaga(),
    categoriesSaga(),
    colorsSaga(),
    sizesSaga()
  ])
}
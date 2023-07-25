import {combineReducers} from "redux";

import products from './products/reducer';
import categories from "./categories/reducer";
import colors from "./colors/reducer";
import sizes from "./sizes/reducer";
import auth from "./auth/reducer";

const rootReducer = combineReducers(
  {
    products,
    categories,
    colors,
    sizes,
    auth
  }
)

export default rootReducer
import {combineReducers} from "redux";

import products from './products/reducer';
import categories from "./categories/reducer";
import colors from "./colors/reducer";
import sizes from "./sizes/reducer";

const rootReducer = combineReducers(
  {
    products,
    categories,
    colors,
    sizes
  }
)

export default rootReducer
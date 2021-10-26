import { combineReducers } from "redux";
import ItemCartReducer from "./addItemToCart";
import testReducer from "./testReducer";

const rootReducer = combineReducers({
  ItemCartReducer,
  testReducer
})

export default rootReducer;
import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import cartReducer from "./cartReducer";

const store = legacy_createStore(cartReducer, applyMiddleware(thunk));

export default store;

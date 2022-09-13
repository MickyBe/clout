import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AllReducer from "../reducers";

// used thunk as middleware
const middleware = [thunk];
const initialState = {};

const store = createStore(
    AllReducer,
    initialState,
    applyMiddleware(...middleware)
);

export default store;
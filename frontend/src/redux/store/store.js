import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import {
  loginstatusReducer,
  usererror,
  userSigninReducer,
} from "../reducers/userReducer";


const initialState = {
  userInfo: null,
  isLoggedIn: false,
  error: ""
};
const reducer = combineReducers({
  userInfo: userSigninReducer,
  error: usererror,
  isLoggedIn: loginstatusReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default Store;
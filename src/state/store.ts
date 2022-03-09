/**
 * Contains the Redux store for the application
 */

import { combineReducers } from "redux";
// import thunkMiddleware from "redux-thunk";

import { configureStore } from "@reduxjs/toolkit";
import nodeReducer from "./slices/nodes";

// @TODO implement Undo stack via middleware

// const middlewareEnhancer = applyMiddleware(thunkMiddleware);

// const store = createStore(combineReducers({

// }), initialState, middlewareEnhancer);

const store = configureStore({
    reducer: combineReducers({
        nodes: nodeReducer
    }),
    // middleware: []
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

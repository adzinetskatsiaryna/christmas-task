import {applyMiddleware, combineReducers, createStore} from "redux";
import ToysReducer from "./toysReducer";
import thunk from "redux-thunk";
//import TreeReducer from "./treeReducer";



const reducer = combineReducers({
    toys: ToysReducer,
    // tree: TreeReducer,
});
export type ReducerAppType = ReturnType<typeof reducer>

export const store = createStore(reducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store


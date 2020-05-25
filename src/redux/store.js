import { createStore, combineReducers, applyMiddleware } from "redux";
import { homePageReducer } from "./homePageReducer";
import thunkMiddleware from "redux-thunk";
import { boardPageReducer } from "./BoardPageReducer";

const reducers = combineReducers({
    homePage: homePageReducer,
    boardPage: boardPageReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;
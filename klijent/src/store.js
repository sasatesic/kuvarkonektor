import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from './reducers'

const inicijalniState = {};

const middleware = [thunk];

const store = createStore(rootReducer, inicijalniState, composeWithDevTools(applyMiddleware(...middleware)));

export default store
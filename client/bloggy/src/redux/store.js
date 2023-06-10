import {
  legacy_createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";

//reducers
import { userReducer } from "./user/user.reducer";
import { chatReducer } from "./chat/chat.reducer";
import { messageReducer } from "./message/message.reducer";
import { blogReducer } from "./blog/blog.reducer";


const rootReducer = combineReducers({
  userReducer,
  chatReducer,
  messageReducer,
  blogReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);

